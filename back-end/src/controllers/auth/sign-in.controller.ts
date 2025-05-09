import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../../utils/env";

export const Signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).send("Account does not exist").end();
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Email or Password incorrect").end();
    }

    if (!secret_key) {
      throw new Error("SECRET_KEY environment variable is not set");
    }

    const token = jwt.sign(user, secret_key, { expiresIn: "1d" });

    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 24 * 1000,
        secure: false, // if https true else false
      })
      .send("User signed in")
      .end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Cannot sign in").end();
  }
};
