import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    username: string;
  };
}

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const response = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    return res.send({ success: true, message: response }).end();
  } catch (error) {
    return res.status(500).send(error).end();
  }
};
export const updatePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .send({ success: false, message: "Password is required" });
  }

  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Invalid user tokennn",
          user: req.user,
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const response = await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    return res.send({ success: true, message: response }).end();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Cannot update password" })
      .end();
  }
};
