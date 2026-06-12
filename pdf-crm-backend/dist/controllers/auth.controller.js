"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = async (req, res) => {
    try {
        const { name, username, email, password, } = req.body;
        if (!name ||
            !username ||
            !email ||
            !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const usernameRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                success: false,
                message: "Username must include at least one uppercase letter, a special character, and end in a 4-digit number.",
            });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                passwordHash,
                role: "user",
            },
        });
        const { passwordHash: _, ...safeUser } = user;
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: safeUser,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { username, password, } = req.body;
        if (!username ||
            !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        const { passwordHash: _, ...safeUser } = user;
        return res.status(200).json({
            success: true,
            token,
            user: safeUser,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.loginUser = loginUser;
