import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: Function) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).send({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: "Invalid token" });
  }
};
