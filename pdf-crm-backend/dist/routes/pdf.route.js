"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdf_controller_1 = require("../controllers/pdf.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const share_controller_1 = require("../controllers/share.controller");
const pdf_controller_2 = require("../controllers/pdf.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticateToken, pdf_controller_1.createPdf);
router.get("/", auth_middleware_1.authenticateToken, pdf_controller_1.getAllPdfs);
/* PUBLIC SHARE ROUTE FIRST */
router.get("/shared/:id", pdf_controller_2.getSharedPdf);
/* SHARE ACTION */
router.post("/:id/share", auth_middleware_1.authenticateToken, share_controller_1.sharePdf);
/* NORMAL PDF ROUTES */
router.get("/:id", auth_middleware_1.authenticateToken, pdf_controller_1.getPdfById);
router.put("/:id", auth_middleware_1.authenticateToken, pdf_controller_1.updatePdf);
router.delete("/:id", auth_middleware_1.authenticateToken, pdf_controller_1.deletePdf);
exports.default = router;
