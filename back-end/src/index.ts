import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routers/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
