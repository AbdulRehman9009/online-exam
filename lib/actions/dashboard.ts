"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getStudentDashboardData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const userId = session.user.id

  const [upcomingExams, results, notifications] = await Promise.all([
    prisma.exam.count({
      where: {
        OR: [
          { startTime: { gt: new Date() } },
          { startTime: null }
        ]
      }
    }),
    prisma.result.findMany({
      where: { studentId: userId },
      include: { exam: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: "desc" }
    })
  ])

  const totalExams = upcomingExams + results.length
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc: number, curr: any) => acc + (curr.score / curr.total * 100), 0) / results.length) 
    : 0

  return {
    upcomingExamsCount: upcomingExams,
    completedExamsCount: results.length,
    avgScore,
    recentResults: results.slice(0, 5),
    notifications: notifications.slice(0, 5)
  }
}

export async function getFacultyDashboardData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const userId = session.user.id

  const [exams, totalStudentsResults] = await Promise.all([
    prisma.exam.findMany({
      where: { creatorId: userId },
      include: {
        results: {
          orderBy: { createdAt: "desc" },
          include: { student: true }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.result.findMany({
      where: {
        exam: { creatorId: userId }
      }
    })
  ])

  // Real calculation for average pass rate (score >= 50%)
  const totalResults = totalStudentsResults.length
  const passedResults = totalStudentsResults.filter(r => (r.score / r.total) >= 0.5).length
  const avgPassRate = totalResults > 0 ? Math.round((passedResults / totalResults) * 100) : 0

  const activeStudents = new Set(totalStudentsResults.map(r => r.studentId)).size

  const recentActivity = exams.flatMap(exam => 
    exam.results.map(result => ({
      examTitle: exam.title,
      studentName: result.student.name,
      score: Math.round(result.score / result.total * 100),
      createdAt: result.createdAt
    }))
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

  return {
    totalExams: exams.length,
    activeStudents,
    recentActivity,
    avgPassRate
  }
}

export async function broadcastNotification(data: { title: string, message: string, target: "ALL" | "STUDENTS" }) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "FACULTY") return { error: "Unauthorized" }

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: { id: true }
  })

  await prisma.notification.createMany({
    data: students.map(student => ({
      userId: student.id,
      title: data.title,
      message: data.message,
    }))
  })

  revalidatePath("/")
  return { success: true }
}

export async function searchEverything(query: string) {
  const session = await auth()
  if (!session?.user?.id) return []

  const [exams, students] = await Promise.all([
    prisma.exam.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 5
    }),
    session.user.role === "FACULTY" ? prisma.user.findMany({
      where: {
        role: "STUDENT",
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 5
    }) : Promise.resolve([])
  ])

  return {
    exams: exams.map(e => ({ id: e.id, title: e.title, type: 'exam' })),
    students: students.map(s => ({ id: s.id, title: s.name || s.email, type: 'student' }))
  }
}

export async function markNotificationAsRead(notificationId: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  })

  revalidatePath("/")
}

export async function getNotifications() {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20
  })
}
