"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharePdf = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const sharePdf = async (req, res) => {
    try {
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const pdf = await prisma_1.default.pdfDocument.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (!pdf) {
            return res.status(404).json({
                message: "PDF not found",
            });
        }
        const shareLink = `${process.env.FRONTEND_URL}/shared/${pdf.id}`;
        const updated = await prisma_1.default.pdfDocument.update({
            where: {
                id: pdf.id,
            },
            data: {
                shareLink,
            },
        });
        await prisma_1.default.notification.create({
            data: {
                userId: req.user.id,
                title: "PDF Shared",
                message: `Document "${pdf.title}" was shared successfully.`,
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to share PDF",
        });
    }
};
exports.sharePdf = sharePdf;
