import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getActivities =
  async (
    req: Request,
    res: Response
  ) => {
    const logs =
      await prisma.activityLog.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(logs);
  };