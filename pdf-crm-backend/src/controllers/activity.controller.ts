import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getActivities =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const logs =
        await prisma.activityLog.findMany({
          where:
            req.user?.role === "admin"
              ? {}
              : {
                  userId:
                    req.user!.id,
                },

          include: {
            user: {
              select: {
                name: true,
                username: true,
              },
            },

            pdfDocument: {
              select: {
                title: true,
              },
            },
          },

          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.json(logs);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to load activities",
      });
    }
  };