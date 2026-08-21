import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "rsvp.json");

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
    await fs.writeFile(dataFilePath, "[]", "utf8");
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFilePath, "utf8");
    const rsvps = JSON.parse(data);
    
    // Clean data for response - only return submissions with messages to display on the wall,
    // or return everything. Let's return all entries but filter in the UI or show them nicely.
    return NextResponse.json(rsvps);
  } catch (error) {
    console.error("Failed to read RSVP data:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    await ensureDataFile();
    const body = await request.json();
    const { name, attending, guestsCount, message } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "الرجاء إدخال الاسم الكريم" },
        { status: 400 }
      );
    }

    const data = await fs.readFile(dataFilePath, "utf8");
    let rsvps = [];
    try {
      rsvps = JSON.parse(data);
    } catch (parseError) {
      rsvps = [];
    }

    const newRsvp = {
      id: Date.now().toString(),
      name: name.trim(),
      attending: attending === undefined ? true : !!attending,
      guestsCount: attending ? Math.max(1, parseInt(guestsCount, 10) || 1) : 0,
      message: message ? message.trim() : "",
      timestamp: new Date().toISOString(),
    };

    // Store in reverse chronological order
    rsvps.unshift(newRsvp);

    await fs.writeFile(dataFilePath, JSON.stringify(rsvps, null, 2), "utf8");

    return NextResponse.json({ success: true, data: newRsvp });
  } catch (error) {
    console.error("RSVP POST Error:", error);
    return NextResponse.json(
      { error: "عذراً، حدث خطأ أثناء حفظ دعوتك. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
