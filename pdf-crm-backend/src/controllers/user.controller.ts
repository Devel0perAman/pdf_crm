import { Response } from "express";
// @ts-ignore: bcryptjs may not have type declarations in this project
import bcrypt from "bcryptjs";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user =
      await prisma.user.findUnique({
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to load profile",
    });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
   const {
  name,
  username,
  email,
} = req.body;

    const user =
      await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
  name,
  username,
  email,
},
      });

    return res.json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to update profile",
    });
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user!.id,
        },
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const valid =
      await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

    if (!valid) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash:
          hashedPassword,
      },
    });

    return res.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to change password",
    });
  }
};

export const deleteAccount = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.user!.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete account",
    });
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (
      req.user?.role !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Access denied",
      });
    }

    const users =
      await prisma.user.findMany({
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to load users",
    });
  }
};

export const updateUserRole =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      if (
        req.user?.role !== "admin"
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      const user =
        await prisma.user.update({
          where: {
            id: req.params.id as string,
          },

          data: {
            role:
              req.body.role,
          },
        });

      res.json(user);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update role",
        });
    }
  };

  export const deleteUser =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      if (
        req.user?.role !== "admin"
      ) {
        return res.status(403).json({
          message:
            "Access denied",
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

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to delete user",
        });
    }
  };

  export const uploadProfileImage =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message:
            "Image required",
        });
      }

      const imageUrl =
        `/uploads/profiles/${req.file.filename}`;

      const user =
        await prisma.user.update({
          where: {
            id: req.user!.id,
          },

          data: {
            profileImage:
              imageUrl,
          },
        });

      res.json(user);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Upload failed",
      });
    }
  };