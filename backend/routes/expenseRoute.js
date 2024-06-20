import express from "express";
import { Expense } from "../model/expensesModel.js";

const router = express.Router();

const convertDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

router.post("/expense", async function (req, res) {
  try {
    const { name, amount, date, tag } = req.body;

    if (!name || !amount || !date || !tag) {
      return res.status(400).send({
        message: "Send all required fields: name, amount, date, tag",
      });
    }

    const convertedDate = convertDate(date);

    const newExpenses = {
      name,
      amount,
      date: convertedDate,
      tag,
    };

    const expense = await Expense.create(newExpenses);

    return res.status(200).send(expense);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

router.get("/expense", async function (req, res) {
  try {
    const expense = await Expense.find({});

    return res.status(200).send({
      count: expense.length,
      data: expense,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/expense/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    return res.status(200).json(expense);
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      message: err.message,
    });
  }
});

router.put("/expense/:id", async function (req, res) {
  try {
    const { name, amount, date, tag } = req.body;

    if (!name || !amount || !date || !tag) {
      return res.status(400).send({
        message: "Send all required fields: name, amount, date, tag",
      });
    }

    const { id } = req.params;

    const convertedDate = convertDate(date);

    const newExpenses = {
      name,
      amount,
      date: convertedDate,
      tag,
    };

    const result = await Expense.findByIdAndUpdate(id, newExpenses);

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

router.delete("/expense/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const result = await Expense.findByIdAndDelete(id);

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
