
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const keyPath = path.join(process.cwd(), "public/hls/sample/enc.key");

    if (!fs.existsSync(keyPath)) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    const key = fs.readFileSync(keyPath);
    return new NextResponse(key, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
         "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
