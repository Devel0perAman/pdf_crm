"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getNotifications = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getNotifications = async (req, res) => {
    try {
        const notifications = await prisma_1.default.notification.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(notifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load notifications",
        });
    }
};
exports.getNotifications = getNotifications;
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid notification id",
            });
        }
        const notification = await prisma_1.default.notification.update({
            where: {
                id,
            },
            data: {
                isRead: true,
            },
        });
        res.json(notification);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update notification",
        });
    }
};
exports.markAsRead = markAsRead;
