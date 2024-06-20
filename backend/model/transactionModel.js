import mongoose from "mongoose";

const transactionModel = mongoose.Schema(
  {
    items: {
      type: String,
      required: true,
    },
    shop_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("transaction", transactionModel);
