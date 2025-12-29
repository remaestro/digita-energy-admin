import { Response } from 'express'
import { prisma } from '../config/database.js'
import { AuthRequest } from '../middleware/auth.js'

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    res.json({
      success: true,
      data: users,
      count: users.length,
    })
  } catch (error) {
    throw error
  }
}
