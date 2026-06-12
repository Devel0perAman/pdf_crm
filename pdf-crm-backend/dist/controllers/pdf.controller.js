"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedPdf = exports.deletePdf = exports.updatePdf = exports.getPdfById = exports.getAllPdfs = exports.createPdf = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const storage_service_1 = require("../services/storage.service");
const email_service_1 = require("../services/email.service");
const createPdf = async (req, res) => {
    try {
        const { title, recipientEmail, descriptionRichtext, descriptionHtml, textContent, signatureType, signatureData, } = req.body;
        if (!recipientEmail?.trim()) {
            return res.status(400).json({
                message: "Recipient email is required",
            });
        }
        if (!title?.trim()) {
            return res.status(400).json({
                message: "Title is required",
            });
        }
        if (!signatureType || !signatureData) {
            return res.status(400).json({
                message: "Signature is required",
            });
        }
        const pdf = await prisma_1.default.pdfDocument.create({
            data: {
                userId: req.user.id,
                title,
                recipientEmail,
                descriptionRichtext,
                descriptionHtml,
                textContent,
                signatureType,
                signatureData,
            },
        });
        await (0, storage_service_1.createRecordStorage)({
            id: pdf.id,
            title: pdf.title,
            descriptionHtml: pdf.descriptionHtml || "",
            textContent: pdf.textContent || "",
        });
        await prisma_1.default.notification.create({
            data: {
                userId: req.user.id,
                title: "PDF Created",
                message: `Document "${pdf.title}" was created successfully.`,
            },
        });
        const shareLink = `${process.env.FRONTEND_URL}/shared/${pdf.id}`;
        await prisma_1.default.pdfDocument.update({
            where: {
                id: pdf.id,
            },
            data: {
                shareLink,
            },
        });
        await (0, email_service_1.sendEmail)(recipientEmail, "PDF Shared With You", `
    <h2>${pdf.title}</h2>

    <p>
      A PDF document has been shared with you.
    </p>

    <p>
      Click below to open it:
    </p>

    <a href="${shareLink}">
      Open PDF
    </a>
  `);
        return res.status(201).json(pdf);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create PDF",
        });
    }
};
exports.createPdf = createPdf;
const getAllPdfs = async (req, res) => {
    const pdfs = await prisma_1.default.pdfDocument.findMany({
        where: {
            userId: req.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json(pdfs);
};
exports.getAllPdfs = getAllPdfs;
const getPdfById = async (req, res) => {
    const pdfId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    if (!pdfId) {
        return res.status(400).json({
            message: "Invalid PDF id",
        });
    }
    const pdf = await prisma_1.default.pdfDocument.findFirst({
        where: {
            id: pdfId,
            userId: req.user.id,
        },
        include: {
            signatures: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                },
            },
        },
    });
    if (!pdf) {
        return res.status(404).json({
            message: "PDF not found",
        });
    }
    res.json(pdf);
};
exports.getPdfById = getPdfById;
const updatePdf = async (req, res) => {
    const pdfId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    if (!pdfId) {
        return res.status(400).json({
            message: "Invalid PDF id",
        });
    }
    if (req.body.title !== undefined &&
        !req.body.title.trim()) {
        return res.status(400).json({
            message: "Title cannot be empty",
        });
    }
    const existingPdf = await prisma_1.default.pdfDocument.findFirst({
        where: {
            id: pdfId,
            userId: req.user.id,
        },
    });
    if (!existingPdf) {
        return res.status(404).json({
            message: "PDF not found",
        });
    }
    const pdf = await prisma_1.default.pdfDocument.update({
        where: {
            id: pdfId,
        },
        data: req.body,
    });
    await prisma_1.default.activityLog.create({
        data: {
            userId: req.user.id,
            documentId: pdf.id,
            action: "PDF_UPDATED",
        },
    });
    await prisma_1.default.notification.create({
        data: {
            userId: req.user.id,
            title: "PDF Updated",
            message: `Document "${pdf.title}" was updated successfully.`,
        },
    });
    res.json(pdf);
};
exports.updatePdf = updatePdf;
const deletePdf = async (req, res) => {
    const pdfId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    if (!pdfId) {
        return res.status(400).json({
            message: "Invalid PDF id",
        });
    }
    const existingPdf = await prisma_1.default.pdfDocument.findFirst({
        where: {
            id: pdfId,
            userId: req.user.id,
        },
    });
    if (!existingPdf) {
        return res.status(404).json({
            message: "PDF not found",
        });
    }
    await prisma_1.default.signature.deleteMany({
        where: {
            pdfId,
        },
    });
    await prisma_1.default.pdfDocument.delete({
        where: {
            id: pdfId,
        },
    });
    await prisma_1.default.activityLog.create({
        data: {
            userId: req.user.id,
            action: "PDF_DELETED",
        },
    });
    await prisma_1.default.notification.create({
        data: {
            userId: req.user.id,
            title: "PDF Deleted",
            message: `Document "${existingPdf.title}" was deleted.`,
        },
    });
    res.json({
        success: true,
    });
};
exports.deletePdf = deletePdf;
const getSharedPdf = async (req, res) => {
    try {
        const pdfId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!pdfId) {
            return res.status(400).json({
                message: "Invalid PDF id",
            });
        }
        const pdf = await prisma_1.default.pdfDocument.findUnique({
            where: {
                id: pdfId,
            },
            select: {
                id: true,
                title: true,
                descriptionHtml: true,
                textContent: true,
                signatureType: true,
                signatureData: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
            },
        });
        if (!pdf) {
            return res.status(404).json({
                message: "PDF not found",
            });
        }
        res.json(pdf);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load shared PDF",
        });
    }
};
exports.getSharedPdf = getSharedPdf;
