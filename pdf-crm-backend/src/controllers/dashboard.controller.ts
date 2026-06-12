import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;

    // ADMIN DASHBOARD
    if (role === "admin") {
      const totalUsers =
        await prisma.user.count();

      const totalPdfs =
        await prisma.pdfDocument.count();

      const totalSignatures =
        await prisma.signature.count();

      const totalActivities =
        await prisma.activityLog.count();

      return res.json({
        role: "admin",
        totalUsers,
        totalPdfs,
        totalSignatures,
        totalActivities,
      });
    }

    // USER DASHBOARD
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

    return res.json({
      role: "user",
      totalPdfs,
      totalSignatures,
      totalActivities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load dashboard stats",
    });
  }
};

export const getRecentPdfs = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const role = req.user!.role;

    // ADMIN
    if (role === "admin") {
      const pdfs =
        await prisma.pdfDocument.findMany({
          include: {
            user: {
              select: {
                name: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });

      return res.json(pdfs);
    }

    // USER
    const pdfs =
      await prisma.pdfDocument.findMany({
        where: {
          userId: req.user!.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    res.json(pdfs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load recent PDFs",
    });
  }
};