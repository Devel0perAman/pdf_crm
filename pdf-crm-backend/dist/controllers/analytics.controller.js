"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const totalPdfs = await prisma_1.default.pdfDocument.count({
            where: {
                userId,
            },
        });
        const totalSignatures = await prisma_1.default.signature.count({
            where: {
                userId,
            },
        });
        const totalActivities = await prisma_1.default.activityLog.count({
            where: {
                userId,
            },
        });
        const recentPdfs = await prisma_1.default.pdfDocument.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });
        res.json({
            totalPdfs,
            totalSignatures,
            totalActivities,
            recentPdfs,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load analytics",
        });
    }
};
exports.getAnalytics = getAnalytics;
