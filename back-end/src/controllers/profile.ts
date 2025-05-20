import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

export const createProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    avatarImage,
    name,
    about,
    socialMediaURL,
    backgroundImage,
    successMessage,
  } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" })
        .end();
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        userId: Number(userId),
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
      },
    });

    return res.send({ success: true, profile }).end();
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      })
      .end();
  }
};
