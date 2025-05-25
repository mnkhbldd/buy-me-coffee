import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret_key } from "../src/utils/env";

interface DecodedUser {
  id: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized - No token" });
  }

  if (!secret_key) {
    return res
      .status(500)
      .send({ success: false, message: "JWT secret key not defined" });
  }

  try {
    const decoded = jwt.verify(token, secret_key) as DecodedUser;
    (req as any).user = decoded;
    console.log(decoded, "decoded token");
    next();
  } catch (err) {
    console.log("JWT verify error:", err);
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};
