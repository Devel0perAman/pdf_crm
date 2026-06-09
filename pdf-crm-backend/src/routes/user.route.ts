import { Router } from "express";

import {
  authenticateToken,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/me",
  authenticateToken,
  async (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

export default router;