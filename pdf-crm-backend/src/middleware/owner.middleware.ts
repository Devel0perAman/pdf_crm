import { Response, NextFunction } from "express";

import { AuthRequest } from "./auth.middleware";

export const ownerOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.user ||
    req.user.role !== "OWNER"
  ) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};