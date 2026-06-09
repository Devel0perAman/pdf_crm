import { Router } from "express";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

import {
  getDashboardStats,
  getRecentPdfs,
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/stats",
  authenticateToken,
  getDashboardStats
);

router.get(
  "/recent-pdfs",
  authenticateToken,
  getRecentPdfs
);

export default router;