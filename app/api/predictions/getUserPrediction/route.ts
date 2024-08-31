import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    // solo recogemos la prediccion del usuario que esta autenticado
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
    const username = data?.user;

    try {
        await prisma.$connect(); // Conectar al cliente Prisma

        // buscamos el usuario que esta autenticado
        const user = await prisma.users.findUnique({
            where: {
                username: username,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // buscamos la prediccion del usuario autenticado
        const pred = await prisma.pronosticos.findFirst({
            where: {
                matchweek: matchweek,
                user_id: user.id,
            },
            select: {
                prediction: true,
            },
        });

        if (!pred) {
            return new Response("Prediction not found", { status: 404 });
        }
            
        return NextResponse.json({ pred });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error }), { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
};