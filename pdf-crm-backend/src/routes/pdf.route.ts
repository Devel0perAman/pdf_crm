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

import {
  sharePdf,
} from "../controllers/share.controller";

import {
  getSharedPdf,
} from "../controllers/pdf.controller";


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

/* PUBLIC SHARE ROUTE FIRST */

router.get(
  "/shared/:id",
  getSharedPdf
);

/* SHARE ACTION */

router.post(
  "/:id/share",
  authenticateToken,
  sharePdf
);

/* NORMAL PDF ROUTES */

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