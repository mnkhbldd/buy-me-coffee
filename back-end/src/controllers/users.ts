import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const response = await prisma.user.create({
      data: { email, password, username },
    });
    return res.send({ success: true, message: response }).end();
  } catch (error) {
    return res.status(500).send(error).end();
  }
};
