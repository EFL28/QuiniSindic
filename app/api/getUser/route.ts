import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("auth");
    
    if (token === undefined) {
        return NextResponse.redirect("/login");
    }

    const data = jwt.verify(token.value, "POWEIUBFVU") as jwt.JwtPayload;
    
    return NextResponse.json({ message: "GET request", user: data.user });
}