import { Router } from "express";
import { Signin } from "../controllers/auth/sign-in.controller";
import { checkUser, Signup } from "../controllers/auth/sign-up.controller";

export const authRouter = Router();

authRouter
  .post("/sign-in", Signin)
  .post("/checkUser", checkUser)
  .post("/sign-up", Signup);
