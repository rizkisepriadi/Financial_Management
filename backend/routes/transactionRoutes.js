import express from "express";
import { Transaction } from "../model/transactionModel.js";

const router = express.Router();

// Fungsi untuk mengonversi tanggal dari format dd-mm-yyyy menjadi Date
const convertDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

router.post("/transaction", async (req, res) => {
  try {
      const { items, shop_name, date, payment_method, amount } = req.body;

      if (!items || !shop_name || !date || !payment_method || !amount) {
        return res.status(400).send({
          message:
            "Send all required fields: items, shop_name, date, payment_method, amount",
        });
      }

    const convertedDate = convertDate(date);

    const newTransaction = {
      items,
      shop_name,
      date: convertedDate,
      payment_method,
      amount,
    };

    const transaction = await Transaction.create(newTransaction);

    return res.status(200).send(transaction);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

// Get all transaction
router.get("/transaction", async function (req, res) {
  try {
    const transaction = await Transaction.find({});

    return res.status(200).send({
      count: transaction.length,
      data: transaction,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

// Get transaction by id
router.get("/transaction/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    return res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

// Update transaction
router.put("/transaction/:id", async function (req, res) {
  try {
    const { items, shop_name, date, payment_method, amount } = req.body;

    if (!items || !shop_name || !date || !payment_method || !amount) {
      return res.status(400).send({
        message:
          "Send all required fields: items, shop_name, date, payment_method, amount",
      });
    }

    const convertedDate = convertDate(date);

    const newTransaction = {
      items,
      shop_name,
      date: convertedDate,
      payment_method,
      amount,
    };

    const { id } = req.params;

    const result = await Transaction.findByIdAndUpdate(id, newTransaction);

    if (!result) {
      return res.status(404).send({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .send({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

router.delete("/transaction/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .send({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

export default router;
