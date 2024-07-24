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

  const data = jwt.verify(token.value, jwtSecret) as jwt.JwtPayload;

  try {
    await prisma.$connect(); // Conectar al cliente Prisma
    // bucamos con el user el id del user
    /*const u = await prisma.users.findFirst({
      where: {
        username: data.user,
      },
    });

    if (u === null) {
      throw new Error("User not found");
    }

    // console.log(u);
    // con el id del user buscamos la prediccion de la jornada actual
    const pred = await prisma.pronosticos.findFirst({
      where: {
        user_id: u.id,
        matchweek: matchweek,
      },
    });
    
    const prediction = pred?.prediction
 

    return NextResponse.json({ prediction });*/

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

    // console.log(preds);

    return NextResponse.json({ preds });


    // v2 la respuesta envia todos los pronosticos y el username de cada prediccion

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
