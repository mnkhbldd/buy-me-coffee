import { Request, Response } from "express";

import bcypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import jwt from "jsonwebtoken";
import { secret_key } from "../../utils/env";

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
  if (!email || !password || !username) {
    return res.status(400).send("Missing required fields").end();
  }

  const hashedPassword = bcypt.hashSync(password, 10);
  try {
    const response = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    if (!secret_key) {
      throw new Error("JWT secret key is not defined");
    }
    const token = jwt.sign(response, secret_key, { expiresIn: "1d" });

    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 24 * 1000,
        secure: false, // if https true else false
        httpOnly: true,
      })
      .send("User signed in")
      .end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("User not created").end();
  }
};
