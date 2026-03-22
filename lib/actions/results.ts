"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getFacultyResults() {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "FACULTY") {
    return []
  }

  const results = await prisma.result.findMany({
    where: {
      exam: {
        creatorId: session.user.id
      }
    },
    include: {
      exam: {
        select: {
          id: true,
          title: true,
        }
      },
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return results
}
