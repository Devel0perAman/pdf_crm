import { Router } from "express";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

import {
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller";

const router = Router();

router.get(
  "/",
  authenticateToken,
  getNotifications
);

router.put(
  "/:id/read",
  authenticateToken,
  markAsRead
);

export default router;