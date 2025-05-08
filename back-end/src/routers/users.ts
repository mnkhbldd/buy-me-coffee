import Router from "express";
import { createUser } from "../controllers/users";

export const userRouter = Router();

userRouter.post("/", createUser);
