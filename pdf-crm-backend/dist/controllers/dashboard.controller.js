"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentPdfs = exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        // ADMIN DASHBOARD
        if (role === "admin") {
            const totalUsers = await prisma_1.default.user.count();
            const totalPdfs = await prisma_1.default.pdfDocument.count();
            const totalSignatures = await prisma_1.default.signature.count();
            const totalActivities = await prisma_1.default.activityLog.count();
            return res.json({
                role: "admin",
                totalUsers,
                totalPdfs,
                totalSignatures,
                totalActivities,
            });
        }
        // USER DASHBOARD
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
        return res.json({
            role: "user",
            totalPdfs,
            totalSignatures,
            totalActivities,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load dashboard stats",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
const getRecentPdfs = async (req, res) => {
    try {
        const role = req.user.role;
        // ADMIN
        if (role === "admin") {
            const pdfs = await prisma_1.default.pdfDocument.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            username: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 10,
            });
            return res.json(pdfs);
        }
        // USER
        const pdfs = await prisma_1.default.pdfDocument.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });
        res.json(pdfs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load recent PDFs",
        });
    }
};
exports.getRecentPdfs = getRecentPdfs;
