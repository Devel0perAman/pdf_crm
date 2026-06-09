import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load profile",
    });
  }
};