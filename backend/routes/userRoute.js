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

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update FormAccount
router.put("/user/:id/formaccount", async (req, res) => {
  try {
    const { name, email, username, telp } = req.body;
    if (!name || !email || !username || !telp) {
      return res.status(400).send({
        message:
          "Send all required fields: name, email, username, telp",
      });
    }

    const { id } = req.params;

    const data = {
      name,
      email,
      username,
      telp,
    };

    const user = await User.findByIdAndUpdate(id, data);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update FormSecurity
router.put("/user/:id/formsecurity", async (req, res) => {
  try {
    const { oldPassword, newPassword, retypePassword } = req.body;
    if (!oldPassword || !newPassword || !retypePassword) {
      return res.status(400).send({
        message: "Send all required fields: oldPassword, newPassword, retypePassword",
      });
    }

    const { id } = req.params;

    const user = await User.updatePassword(id, oldPassword, newPassword, retypePassword);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;
