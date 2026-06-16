import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAdminStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalUsers =
      await prisma.user.count();

    const totalPdfs =
      await prisma.pdfDocument.count();

    const totalSignatures =
      await prisma.signature.count();

    const totalActivities =
      await prisma.activityLog.count();

    res.json({
      totalUsers,
      totalPdfs,
      totalSignatures,
      totalActivities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load admin stats",
    });
  }
};