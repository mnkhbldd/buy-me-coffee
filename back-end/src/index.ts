import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import cookieparser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(json());
app.use(cookieparser());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
