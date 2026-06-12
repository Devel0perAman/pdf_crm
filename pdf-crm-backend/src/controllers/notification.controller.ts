import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notifications =
      await prisma.notification.findMany({
        where: {
          userId: req.user!.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load notifications",
    });
  }
};

export const markAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid notification id",
      });
    }

    const notification =
      await prisma.notification.update({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      });

    res.json(notification);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to update notification",
    });
  }
};