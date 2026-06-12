import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      username,
      email,
      password,
    } = req.body;

   if (
  !name ||
  !username ||
  !email ||
  !password
) {
  return res.status(400).json({
    success: false,
    message:
      "All fields are required",
  });
}

const usernameRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;

if (
  !usernameRegex.test(
    username
  )
) {
  return res.status(400).json({
    success: false,
    message:
      "Username must include at least one uppercase letter, a special character, and end in a 4-digit number.",
  });
}

    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email },
          ],
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Username or email already exists",
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          username,
          email,
          passwordHash,
          role: "user",
        },
      });

    const {
      passwordHash: _,
      ...safeUser
    } = user;

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      username,
      password,
    } = req.body;

    if (
      !username ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Username and password are required",
      });
    }

    const user =
      await prisma.user.findUnique({
        where: {
          username,
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const {
      passwordHash: _,
      ...safeUser
    } = user;

    return res.status(200).json({
      success: true,
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};