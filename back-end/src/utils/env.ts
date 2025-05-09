import { config } from "dotenv";

config();

export const secret_key = process.env.SECRET_KEY;
export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;
