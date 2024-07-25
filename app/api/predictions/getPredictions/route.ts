import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const jwtSecret = process.env.JWT_SECRET;
  const { searchParams } = new URL(request.url);
  const matchweekParam = searchParams.get("matchweek");
  const matchweek = matchweekParam ? parseInt(matchweekParam) : null;

  if (matchweek === null) {
    return new Response("matchweek is null", { status: 400 });
  }

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  if (token === undefined) {
    return NextResponse.redirect("/login");
  }

  // const data = jwt.verify(token.value, jwtSecret) as jwt.JwtPayload;

  try {
    await prisma.$connect(); // Conectar al cliente Prisma
    const preds = await prisma.pronosticos.findMany({
        where: {
            matchweek: matchweek,
        },
        select: {
            prediction: true,
            
            Users: {
                select: {
                    username: true,
                },
            },
        },
    });
    return NextResponse.json({ preds });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
