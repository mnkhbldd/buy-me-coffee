import { Request, Response } from "express";

import bcypt from "bcrypt";
import { prisma } from "../../utils/prisma";

export const checkUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      return res.status(409).send("User already taken").end();
    }
    return res.status(200).send("User available").end();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Cannot check user" })
      .end();
  }
};

export const Signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const hashedPassword = bcypt.hashSync(password, 10);
  try {
    const response = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    return res.status(200).send("User created").end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("User not created").end();
  }
};
