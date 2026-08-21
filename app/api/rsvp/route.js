import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

const DB_NAME = "wedding";
const COLLECTION = "rsvps";

async function getCollection() {
  await client.connect();
  return client.db(DB_NAME).collection(COLLECTION);
}

export async function GET() {
  try {
    const collection = await getCollection();
    const rsvps = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Convert MongoDB _id (ObjectId) to string so it's JSON-serialisable
    const serialised = rsvps.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(serialised);
  } catch (error) {
    console.error("GET /api/rsvp error:", error);
    return NextResponse.json(
      { error: "عذراً، تعذر تحميل البيانات. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
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
      name: name.trim(),
      attending: attending === undefined ? true : !!attending,
      guestsCount: attending ? Math.max(1, parseInt(guestsCount, 10) || 1) : 0,
      message: message ? message.trim() : "",
      timestamp: new Date().toISOString(),
    };

    const collection = await getCollection();
    const result = await collection.insertOne(newRsvp);

    return NextResponse.json({
      success: true,
      data: { id: result.insertedId.toString(), ...newRsvp },
    });
  } catch (error) {
    console.error("POST /api/rsvp error:", error);
    return NextResponse.json(
      { error: "عذراً، حدث خطأ أثناء حفظ دعوتك. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
