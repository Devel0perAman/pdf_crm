"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.deleteAccount = exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
// @ts-ignore: bcryptjs may not have type declarations in this project
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const getProfile = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: req.user?.id,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profileImage: true,
                role: true,
                createdAt: true,
            }
        });
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to load profile",
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { name, username, email, } = req.body;
        const user = await prisma_1.default.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                name,
                username,
                email,
            },
        });
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to update profile",
        });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const valid = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
        if (!valid) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordHash: hashedPassword,
            },
        });
        return res.json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to change password",
        });
    }
};
exports.changePassword = changePassword;
const deleteAccount = async (req, res) => {
    try {
        await prisma_1.default.user.delete({
            where: {
                id: req.user.id,
            },
        });
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete account",
        });
    }
};
exports.deleteAccount = deleteAccount;
const getAllUsers = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        pdfDocuments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load users",
        });
    }
};
exports.getAllUsers = getAllUsers;
const updateUserRole = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        const user = await prisma_1.default.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                role: req.body.role,
            },
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update role",
        });
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        const userId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!userId) {
            return res.status(400).json({
                message: "Invalid user id",
            });
        }
        await prisma_1.default.user.delete({
            where: {
                id: userId,
            },
        });
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image required",
            });
        }
        const imageUrl = `/uploads/profiles/${req.file.filename}`;
        const user = await prisma_1.default.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                profileImage: imageUrl,
            },
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Upload failed",
        });
    }
};
exports.uploadProfileImage = uploadProfileImage;
