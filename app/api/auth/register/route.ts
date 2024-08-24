import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()


export async function POST(request: Request) {
  try {
    prisma.$connect()
    let { username, email, password } = await request.json()
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();


    const email_registered = await prisma.users.findUnique({ where: { email } })
    if (email_registered) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 })
    }

    const username_registered = await prisma.users.findUnique({ where: { username } })
    if (username_registered) {
      return new Response(JSON.stringify({ error: 'Username already registered' }), { status: 400 })
    }

    const password_length = password.length
    if (password_length < 8) {
      return new Response(JSON.stringify({ error: 'Password too short' }), { status: 400 })
    }

    const password_hashed = await bcrypt.hash(password, 10)

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: password_hashed,
      },
    })

    return new Response(JSON.stringify("Usuario insertado"), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error}), { status: 400 })
  }
  finally {
    prisma.$disconnect()
  }
}
