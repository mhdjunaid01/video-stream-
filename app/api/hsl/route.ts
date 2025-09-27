
import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const { input, videoId } = await req.json();

    if (!input || !fs.existsSync(input)) {
      return NextResponse.json({ ok: false, error: "Input file not found" }, { status: 400 });
    }

    if (!videoId) {
      return NextResponse.json({ ok: false, error: "Video ID required" }, { status: 400 });
    }

    const outputDir = path.join(process.cwd(), "public", "hls", videoId);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, "output.m3u8");

    const cmd = `ffmpeg -i "${input}" -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputDir}/segment%03d.ts" "${outputFile}"`;

    await new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => (err ? reject(stderr) : resolve(stdout)));
    });

    return NextResponse.json({
      ok: true,
      playlist: `/hls/${videoId}/output.m3u8`,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.toString() }, { status: 500 });
  }
}
