import express from "express";
import { User } from "../model/userModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.create(newUser);

    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err.message });
  }
});

export default router;