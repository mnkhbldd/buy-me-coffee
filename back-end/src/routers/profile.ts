import { Router } from "express";
import { createProfile } from "../controllers/profile";
import { authenticate } from "../../middleware/auth";

export const profileRouter = Router();

profileRouter.post("/", authenticate, createProfile);
