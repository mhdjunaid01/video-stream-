// utils/cookies.ts
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "token";

// Set JWT cookie on response
export const setTokenCookie = (res: NextResponse, token: string) => {
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "strict" as const,
  });
};

// Get JWT cookie from request
export const getTokenCookie = (req: NextRequest): string | undefined => {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return token;
};

// Delete JWT cookie
export const deleteTokenCookie = (res: NextResponse) => {
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
    sameSite: "strict",
  });
};
