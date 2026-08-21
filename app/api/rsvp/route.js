import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "rsvp.json");

// In-memory fallback array for stateless serverless environments like Vercel
let memoryRsvps = [];

// Ensure data folder and file exists helper
async function ensureDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    const dataDir = path.dirname(dataFilePath);
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (mkdirError) {
      // Folder may already exist
    }
    try {
      await fs.writeFile(dataFilePath, "[]", "utf8");
    } catch (writeError) {
      console.warn("Could not create local data file (expected on read-only environments like Vercel):", writeError.message);
    }
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    let rsvps = [];
    try {
      const data = await fs.readFile(dataFilePath, "utf8");
      rsvps = JSON.parse(data);
    } catch (readError) {
      console.warn("Could not read local data file, falling back to memory:", readError.message);
      rsvps = memoryRsvps;
    }
    
    // Combine file RSVPs with memory RSVPs, removing duplicates
    const combined = [...rsvps];
    for (const mem of memoryRsvps) {
      if (!combined.some(x => x.id === mem.id)) {
        combined.unshift(mem);
      }
    }
    
    return NextResponse.json(combined);
  } catch (error) {
    console.error("Failed to read RSVP data:", error);
    return NextResponse.json(memoryRsvps, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, attending, guestsCount, message } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "الرجاء إدخال الاسم الكريم" },
        { status: 400 }
      );
    }

    const newRsvp = {
      id: Date.now().toString(),
      name: name.trim(),
      attending: attending === undefined ? true : !!attending,
      guestsCount: attending ? Math.max(1, parseInt(guestsCount, 10) || 1) : 0,
      message: message ? message.trim() : "",
      timestamp: new Date().toISOString(),
    };

    // 1. Add to in-memory array fallback
    memoryRsvps.unshift(newRsvp);

    // 2. Attempt to write to local file system (works in local dev, fails gracefully on Vercel)
    try {
      await ensureDataFile();
      let fileRsvps = [];
      try {
        const fileData = await fs.readFile(dataFilePath, "utf8");
        fileRsvps = JSON.parse(fileData);
      } catch (e) {
        fileRsvps = [];
      }
      fileRsvps.unshift(newRsvp);
      await fs.writeFile(dataFilePath, JSON.stringify(fileRsvps, null, 2), "utf8");
    } catch (writeError) {
      console.warn("File system write skipped (Vercel serverless environment):", writeError.message);
    }

    return NextResponse.json({ success: true, data: newRsvp });
  } catch (error) {
    console.error("RSVP POST Error:", error);
    return NextResponse.json(
      { error: "عذراً، حدث خطأ أثناء حفظ دعوتك. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
