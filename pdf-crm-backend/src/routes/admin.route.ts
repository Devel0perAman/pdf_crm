import { Router } from "express";

import {
  getAdminStats,
} from "../controllers/admin.controller";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/stats",
  authenticateToken,
  getAdminStats
);

export default router;