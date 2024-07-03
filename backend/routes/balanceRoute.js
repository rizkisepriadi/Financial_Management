import express from "express";
import { Balance } from "../model/balancesModel.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/balances", async (req, res) => {
  try {
    const { bank_name, branch_name, type, acc_number, balance } = req.body;
    const user_id = req.user._id;

    if (
      !bank_name ||
      !user_id ||
      !branch_name ||
      !type ||
      !acc_number ||
      !balance
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: Bank Name, Branch_name, Type, Account Number, Balance",
      });
    }

    const newBalance = new Balance({
      bank_name,
      user_id,
      branch_name,
      type,
      acc_number,
      balance,
    });

    await newBalance.save();
    return res.status(200).send(newBalance);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

// Get all balances
router.get("/balances", async (req, res) => {
  try {
    const userId = req.user._id;
    const balances = await Balance.find({ user_id: userId });

    return res.status(200).send({
      count: balances.length,
      data: balances,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" });
  }
});

// Get balances by id
router.get("/balances/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const balance = await Balance.findById(id);

    if (!balance) {
      return res.status(404).send({ message: "Balance not found" });
    }

    if (balance.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Forbidden" });
    }

    return res.status(200).json(balance);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

// Update by id
router.put("/balances/:id", async (req, res) => {
  try {
    if (!req.body.bank_name || !req.body.branch_name || !req.body.type) {
      return res.status(400).send({
        message:
          "Send all required fields: Bank Name, Branch name, Type",
      });
    }

    const { id } = req.params;

    const balances = await Balance.findById(id);

    if (!balances) {
      return res.status(404).send({ message: "Balance not found" });
    }

    if (balances.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Forbidden" });
    }

    await Balance.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// Delete by id
router.delete("/balances/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const balance = await Balance.findByIdAndDelete(id);

    if (!balance) {
      return res.status(404).json({ message: "Balance not found" });
    }

    if (balance.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Forbidden" });
    }

    return res.status(200).json({ message: "Balance deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
