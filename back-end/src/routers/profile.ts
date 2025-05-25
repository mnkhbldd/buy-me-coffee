import { Router } from "express";
import {
  createProfile,
  getSignedProfile,
  UpdateProfile,
} from "../controllers/profile";
import { authenticate } from "../../middleware/auth";

export const profileRouter = Router();

profileRouter
  .post("/", authenticate, createProfile)
  .get("/current-user", authenticate, getSignedProfile)
  .put("/update-profile", authenticate, UpdateProfile);
