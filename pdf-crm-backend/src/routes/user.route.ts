import { Router } from "express";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

import {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
updateUserRole,
deleteUser,
uploadProfileImage,
} from "../controllers/user.controller";

import {
  deleteAccount,
} from "../controllers/user.controller";

import { upload }
from "../middleware/upload.middleware";

const router = Router();

router.get(
  "/profile",
  authenticateToken,
  getProfile
);

router.put(
  "/profile",
  authenticateToken,
  updateProfile
);

router.put(
  "/password",
  authenticateToken,
  changePassword
);

router.delete(
  "/profile",
  authenticateToken,
  deleteAccount
);

router.get(
  "/",
  authenticateToken,
  getAllUsers
);

router.put(
  "/:id/role",
  authenticateToken,
  updateUserRole
);

router.delete(
  "/:id",
  authenticateToken,
  deleteUser
);

router.post(
  "/profile-image",
  authenticateToken,
  upload.single("image"),
  uploadProfileImage
);
export default router;