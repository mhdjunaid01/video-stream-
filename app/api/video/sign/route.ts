import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { videos } from "@/lib/videos";

const SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();

  if (!videoId) return NextResponse.json({ error: "Video ID required" }, { status: 400 });

  const video = videos.find(v => v.id === videoId);
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  const hlsPath = path.join(process.cwd(), "public", "hls", videoId, "output.m3u8");
  if (!fs.existsSync(hlsPath)) {
    return NextResponse.json({ error: "HLS file not found. Please generate it first." }, { status: 400 });
  }

  const token = jwt.sign({ videoId }, SECRET, { expiresIn: "60s" });

  return NextResponse.json({
    url: `/hls/${videoId}/output.m3u8?token=${token}`,
    token,
  });
}
