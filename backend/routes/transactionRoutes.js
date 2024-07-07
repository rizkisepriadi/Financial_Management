import express from "express";
import { Transaction } from "../model/transactionModel.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// Fungsi untuk mengonversi tanggal dari format dd-mm-yyyy menjadi Date
const convertDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

router.post("/transaction", async (req, res) => {
  try {
    const { items, shop_name, date, payment_method, amount, tag } = req.body;
    const user_id = req.user._id;

    if (
      !items ||
      !shop_name ||
      !date ||
      !payment_method ||
      !user_id ||
      !amount
    ) {
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
      user_id,
      payment_method,
      amount,
      tag,
    };

    const transaction = await Transaction.create(newTransaction);

    return res.status(200).send(transaction);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

// Get all transactions or by tag
router.get("/transaction", async function (req, res) {
  const { user_id, tag } = req.query;

  if (!user_id) {
    return res.status(400).send({ message: 'User ID is required' });
  }

  try {
    let query = { user_id: user_id };

    if (tag) {
      query.tag = tag;
    }

    const data = await Transaction.find(query);

    return res.status(200).send({
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
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
    const { items, shop_name, date, payment_method, amount, tag } = req.body;

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
      tag,
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

// Delete transaction
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
