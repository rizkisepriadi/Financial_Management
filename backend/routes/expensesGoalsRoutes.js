import express from "express";
import { ExpensesGoals } from "../model/ExpensesGoalsModel.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

const convertDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

// Add new goal
router.post("/goals/expensesgoals", async function (req, res) {
  try {
    const { category, target_amount, achieved_amount, start_date, end_date } =
      req.body;
    const user_id = req.user._id;

    if (
      !category ||
      !target_amount ||
      !achieved_amount ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: category, target_amount, achieved_amount, start_date, end_date",
      });
    }

    const convertedStartDate = convertDate(start_date);
    const convertedEndDate = convertDate(end_date);

    const newGoal = {
      category,
      target_amount,
      achieved_amount,
      start_date: convertedStartDate,
      end_date: convertedEndDate,
      user_id,
    };

    const data = await ExpensesGoals.create(newGoal);

    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

// Get all goals by category and User_id
router.get("/goals/expensesgoals", async function (req, res) {
  const { user_id, category } = req.query;

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required" });
  }

  try {
    let query = { user_id: user_id };

    if (category) {
      query.category = category;
    }

    const data = await ExpensesGoals.find(query);

    return res.status(200).send({
      count: data.length,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
});

// Get goals by id
router.get("/goals/expensesgoals/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const data = await ExpensesGoals.findById(id);

    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.put("/goals/expensesgoals/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { category, target_amount, achieved_amount, start_date, end_date } =
    req.body;
    
    if (
      !category ||
      !target_amount ||
      !achieved_amount ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: category, target_amount, achieved_amount, start_date, end_date",
      });
    }

    const convertedStartDate = convertDate(start_date);
    const convertedEndDate = convertDate(end_date);

    const newGoal = {
      category,
      target_amount,
      achieved_amount,
      start_date: convertedStartDate,
      end_date: convertedEndDate,
    };

    const data = await ExpensesGoals.findByIdAndUpdate(id, newGoal)

    return res.status(200).send({
      message: "Goals has been updated"
    })
  } catch(err) {
    console.log(err)
    return res.status(400).send({
      message: err.message
    })
  }
})

export default router;
