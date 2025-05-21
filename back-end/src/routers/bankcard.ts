import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { CreateBankCard } from "../controllers/bankcard";

export const bankCardRouter = Router();

bankCardRouter.post("/", authenticate, CreateBankCard);
