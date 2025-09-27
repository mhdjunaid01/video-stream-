import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addUser, existUser } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existingUser = existUser(email);
    console.log(existingUser);
    
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashPassword };
    addUser(newUser);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ message: "User registered", token }, { status: 201 });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
