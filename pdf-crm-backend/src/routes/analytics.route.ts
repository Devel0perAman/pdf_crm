import { Router } from "express";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

import {
  getAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/",
  authenticateToken,
  getAnalytics
);

export default router;