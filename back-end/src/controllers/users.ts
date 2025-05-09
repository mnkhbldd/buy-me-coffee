import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

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
