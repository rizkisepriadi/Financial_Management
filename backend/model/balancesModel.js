import mongoose, { Schema } from "mongoose";

const balancesModel = mongoose.Schema({
  bank_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branch_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  acc_number: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Balance = mongoose.model("Balances", balancesModel);
