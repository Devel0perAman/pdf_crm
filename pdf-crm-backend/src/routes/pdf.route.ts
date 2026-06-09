import { Router } from "express";

import {
  createPdf,
  getAllPdfs,
  getPdfById,
  updatePdf,
  deletePdf,
} from "../controllers/pdf.controller";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticateToken,
  createPdf
);

router.get(
  "/",
  authenticateToken,
  getAllPdfs
);

router.get(
  "/:id",
  authenticateToken,
  getPdfById
);

router.put(
  "/:id",
  authenticateToken,
  updatePdf
);

router.delete(
  "/:id",
  authenticateToken,
  deletePdf
);

export default router;