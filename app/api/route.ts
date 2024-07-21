import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Esta funcion crea una tabla en la base de datos cuando se visite la ruta /api/create-userTable
export async function GET(request: Request) {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const result =
      await sql`
        CREATE TABLE IF NOT EXISTS Users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          username VARCHAR(255) NOT NULL,
          password TEXT NOT NULL
        );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}