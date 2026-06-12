import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const sharePdf = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const idParam = req.params.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const pdf =
            await prisma.pdfDocument.findFirst({
                where: {
                    id,
                    userId: req.user!.id,
                },
            });

        if (!pdf) {
            return res.status(404).json({
                message: "PDF not found",
            });
        }

        const shareLink =
            `${process.env.FRONTEND_URL}/shared/${pdf.id}`;

        const updated =
            await prisma.pdfDocument.update({
                where: {
                    id: pdf.id,
                },
                data: {
                    shareLink,
                },
            });

            await prisma.notification.create({
  data: {
    userId: req.user!.id,
    title: "PDF Shared",
    message:
      `Document "${pdf.title}" was shared successfully.`,
  },
});

        res.json(updated);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to share PDF",
        });
    }
};