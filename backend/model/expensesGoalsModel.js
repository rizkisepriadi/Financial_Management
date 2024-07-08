import mongoose, { Schema } from "mongoose";

const expenses_goals = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    target_amount: {
      type: Number,
      required: true,
    },
    achieved_amount: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const ExpensesGoals = mongoose.model("ExpensesGoals", expenses_goals);
