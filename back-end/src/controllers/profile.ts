import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    username: string;
  };
}

export const createProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;

  if (!user || !user.id) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user token" });
  }

  const userId = Number(user.id);
  const { avatarImage, name, about, socialMediaURL } = req.body;

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
      },
    });

    return res.status(201).json({ success: true, profile });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getSignedProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: { user: true },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    return res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
