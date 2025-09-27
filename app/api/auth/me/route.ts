import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    if (!decoded || !decoded.email)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user =  getUserByEmail(decoded.email);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { password, ...userData } = user;
    return NextResponse.json({ user: userData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
