import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();


authRouter.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({ message: "Invalid email or password!" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).send({ message: "Invalid email or password!" });

    const token = user.generateAuthToken();
    const role = user.isAdmin;
    const id = user._id;

    res
      .status(200)
      .send({ data: token, role: role, id: id, message:`Welcome ${user.name}! ` });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default authRouter;
