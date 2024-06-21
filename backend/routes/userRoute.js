import express from "express";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    // Kirimkan respon sukses
    return res.status(201).json({ email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Panggil metode signUp dengan name, email, dan password
    const user = await User.signUp(name, email, password);

    // Create a token
    const token = createToken(user._id);

    // Kirimkan respon sukses
    return res.status(201).json({ email: user.email, token });
  } catch (err) {
    console.error(err);
    // Kirimkan respon kesalahan
    res.status(400).send({ message: err.message });
  }
});

export default router;
