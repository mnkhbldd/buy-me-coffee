import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import {
  CreateBankCard,
  getSignedBankcard,
  UpdateCardInfo,
} from "../controllers/bankcard";
import { UpdateProfile } from "../controllers/profile";

export const bankCardRouter = Router();

bankCardRouter
  .post("/", authenticate, CreateBankCard)
  .get("/current-bankcard", authenticate, getSignedBankcard)
  .put("/update-bankcard", authenticate, UpdateCardInfo);
