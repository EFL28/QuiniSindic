import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        prisma.$connect()
        const { predictions, username, matchweek } = await request.json()
        const parsedPredictions = JSON.parse(predictions);
        const predictionsArray: string[] = Object.values(parsedPredictions)

        const userId = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        const existingPrediction = await prisma.pronosticos.findFirst({
            where: {
                user_id: userId?.id,
                matchweek: matchweek
            }
        })

        if (existingPrediction) {
            await prisma.pronosticos.update({
                where: {
                    id: existingPrediction.id
                },
                data: {
                    prediction: predictionsArray
                }
            })
        } else {
            await prisma.pronosticos.create({
                data: {
                    prediction: predictionsArray,
                    user_id: userId?.id,
                    matchweek: matchweek
                }
            })
        }

        return new Response(JSON.stringify("Predicciones guardadas"), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: error}), { status: 400 }) 
    }
    finally {
        prisma.$disconnect()
    }
}