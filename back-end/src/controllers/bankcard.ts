import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    username: string;
  };
}

export const CreateBankCard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { country, firstName, lastName, cardNumber, expiryDate, cvc } =
    req.body;

  const user = req.user;

  if (!user || !user.id) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user token" });
  }

  const userId = Number(user.id);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingBankCard = await prisma.bankCard.findUnique({
      where: { userId },
    });

    if (existingBankCard) {
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });
    }

    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        userId,
        cvc,
      },
    });

    return res.status(201).json({ success: true, bankCard }).end;
  } catch (error) {
    console.log(error);
    return res.status(502).json({ success: false, error }).end;
  }
};
