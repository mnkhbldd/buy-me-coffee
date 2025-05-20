import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import cookieParser from "cookie-parser";
import { profileRouter } from "./routers/profile";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true, // ← allow cookies
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
