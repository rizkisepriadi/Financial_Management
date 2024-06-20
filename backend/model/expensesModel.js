import mongoose from "mongoose";

const expensesModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
});

export const Expense = mongoose.model('Expenses', expensesModel);