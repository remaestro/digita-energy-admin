import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '../config/supabase.js';
import { prisma } from '../config/database.js';
import { env } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const authController = {
  // Login/Register via Supabase
  async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AppError(error.message, 401);
    }

    if (!data.user) {
      throw new AppError('Authentication failed', 401);
    }

    // Ensure user exists in our database
    let user = await prisma.user.findUnique({
      where: { id: data.user.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
        },
      });
    }

    // Generate our own JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  },

  // Register new user
  async register(req: AuthRequest, res: Response) {
    const { email, password, name } = req.body;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    if (!data.user) {
      throw new AppError('User creation failed', 400);
    }

    // Create user in our database
    const user = await prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email!,
        name,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  },

  // Get current user
  async me(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      status: 'success',
      data: user,
    });
  },
};
