import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getAnalytics =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const isAdmin =
        req.user?.role === "admin";

      const totalPdfs =
        await prisma.pdfDocument.count({
          where: isAdmin
            ? {}
            : {
                userId:
                  req.user!.id,
              },
        });

      const totalSignatures =
        await prisma.signature.count({
          where: isAdmin
            ? {}
            : {
                userId:
                  req.user!.id,
              },
        });

      const totalActivities =
        await prisma.activityLog.count({
          where: isAdmin
            ? {}
            : {
                userId:
                  req.user!.id,
              },
        });

      const recentPdfs =
        await prisma.pdfDocument.findMany({
          where: isAdmin
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
          },

          orderBy: {
            createdAt:
              "desc",
          },

          take: 5,
        });

      res.json({
        totalPdfs,
        totalSignatures,
        totalActivities,
        recentPdfs,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to load analytics",
      });
    }
  };