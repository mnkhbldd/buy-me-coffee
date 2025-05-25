import Router from "express";
import { createUser, updatePassword } from "../controllers/users";

export const userRouter = Router();

userRouter.post("/", createUser).put("/update-password", updatePassword);
