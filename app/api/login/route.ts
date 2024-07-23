import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from 'next/headers'

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "POWEIUBFVU";

export async function POST(request: Request) {
  try {
    await prisma.$connect(); // Conectar al cliente Prisma
    const { user, password } = await request.json();

    const u = await prisma.users.findFirst({
      where: {
        OR: [{ email: user }, { username: user }],
      },
    });

    if (!u) {
        // throw new Error("User not found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 400,
      });
    }

    const password_match = await bcrypt.compare(password, u.password);

    if (!password_match) {
      // throw new Error("Password incorrect");
      return new Response(JSON.stringify({ error: "Password incorrect" }), {
        status: 400,
      });
    }

    const token = jwt.sign({ user: user, password: password }, JWT_SECRET, { expiresIn: "1w" });
    //console.log("token en route.ts:",token);

    const cookie = serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        sameSite: "strict",
        path: "/",
      });
    //console.log(cookie);

    return new Response(JSON.stringify({ token }), {
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    // throw new Error("Error logging in");
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  } finally {
    await prisma.$disconnect(); // Desconectar del cliente Prisma
  }
}

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "GET request" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}