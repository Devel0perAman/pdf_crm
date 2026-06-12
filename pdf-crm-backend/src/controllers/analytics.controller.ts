import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getAnalytics =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const userId =
        req.user!.id;

      const totalPdfs =
        await prisma.pdfDocument.count({
          where: {
            userId,
          },
        });

      const totalSignatures =
        await prisma.signature.count({
          where: {
            userId,
          },
        });

      const totalActivities =
        await prisma.activityLog.count({
          where: {
            userId,
          },
        });

      const recentPdfs =
        await prisma.pdfDocument.findMany({
          where: {
            userId,
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