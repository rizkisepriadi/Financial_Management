import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import userTransaction from "./routes/transactionRoutes.js";
import expenseRoute from "./routes/expenseRoute.js";
import balanceRoute from "./routes/balanceRoute.js"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hy, it's your financial management");
});

app.use("/", userRoute);
app.use("/", userTransaction);
app.use("/", expenseRoute);
app.use("/", balanceRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.error("Failed to connect to the Database:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log("App is Listening to Port:", PORT);
});
