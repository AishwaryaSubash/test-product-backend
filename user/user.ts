import express from "express";
import { signupUser, signinUser } from "./user.service";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = await signupUser(req.body);
  res.status(201).json(user);
});

userRouter.post("/signin", async (req, res) => {
  const user = await signinUser(req.body);
  res.status(201).json(user);
});

export default userRouter;
