import express from "express";
import { SavingsGoals } from "../model/savingsGoalsModel.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

const convertDate = (dateSTR) => {
  const [day, month, year] = dateSTR.split("-");
  return new Date(`${year}-${month}-${day}`);
};

// Add new saving goal
router.post("/goals/savinggoal", async function (req, res) {
  try {
    const { start_date, end_date, target_amount, achieved_amount } = req.body;
    const user_id = req.user._id;

    if (!start_date || !end_date || !target_amount || !achieved_amount) {
      return res.status(400).send({
        message:
          "Send all required fields: category, target_amount, achieved_amount, start_date, end_date",
      });
    }

    const newStart_date = convertDate(start_date);
    const newEnd_date = convertDate(end_date);

    const newData = {
      start_date: newStart_date,
      end_date: newEnd_date,
      target_amount,
      achieved_amount,
      user_id,
    };

    const data = await SavingsGoals.create(newData);

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

// Get all saving data by user_id
router.get("/goals/savinggoal", async function (req, res) {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required" });
  }

  try {
    let query = { user_id: user_id };

    const data = await SavingsGoals.find(query);

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
router.get("/goals/savinggoal/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const data = await SavingsGoals.findById(id);

    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.put("/goals/savinggoal/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { target_amount, achieved_amount, start_date, end_date } =
    req.body;
    
    if (
      !target_amount ||
      !achieved_amount ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: target_amount, achieved_amount, start_date, end_date",
      });
    }

    const convertedStartDate = convertDate(start_date);
    const convertedEndDate = convertDate(end_date);

    const newGoal = {
      target_amount,
      achieved_amount,
      start_date: convertedStartDate,
      end_date: convertedEndDate,
    };

    const data = await SavingsGoals.findByIdAndUpdate(id, newGoal)

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
