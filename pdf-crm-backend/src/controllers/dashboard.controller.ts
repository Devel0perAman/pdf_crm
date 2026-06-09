import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const totalPdfs =
      await prisma.pdfDocument.count({
        where: {
          userId,
        },
      });

    const totalSignatures =
      await prisma.pdfDocument.count({
        where: {
          userId,
          signatureData: {
            not: null,
          },
        },
      });

    res.json({
      totalPdfs,
      totalSignatures,
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