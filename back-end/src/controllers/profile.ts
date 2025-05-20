import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user || !user.id) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user token" });
  }

  const userId = Number(user.id);
  const {
    avatarImage,
    name,
    about,
    socialMediaURL,
    backgroundImage,
    successMessage,
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        userId,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
      },
    });

    return res.status(201).json({ success: true, profile });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
