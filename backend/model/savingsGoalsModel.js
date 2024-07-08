import mongoose, { Schema } from "mongoose";

const savings_goals = mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      requierd: true,
    },
    target_amount: {
      type: Number,
      requierd: true,
    },
    achieved_amount: {
      type: Number,
      requierd: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SavingsGoals = mongoose.model("SavingsGoals", savings_goals)