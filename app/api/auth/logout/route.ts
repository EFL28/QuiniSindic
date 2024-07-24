import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  if (token === undefined) {
    return NextResponse.redirect("/login");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  try {
    const user = jwt.verify(token.value, jwtSecret);

    const cookie = serialize("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });

    return new Response("", {
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "POST request", user });
  } catch (error) {}
}
