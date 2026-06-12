"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivities = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getActivities = async (req, res) => {
    try {
        const logs = await prisma_1.default.activityLog.findMany({
            where: req.user?.role === "admin"
                ? {}
                : {
                    userId: req.user.id,
                },
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
                pdfDocument: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(logs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load activities",
        });
    }
};
exports.getActivities = getActivities;
