/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { IoClose } from "react-icons/io5";

export default function AddBalanceCard({ set, userId }) {
  const [name, setName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [type, setType] = useState("");
  const [accNum, setAccNum] = useState("");
  const [balance, setBalance] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    if (!user || !user.token) {
      enqueueSnackbar("User not authenticated", { variant: "error" });
      return;
    }

    const data = {
      bank_name: name,
      user_id: userId,
      branch_name: branchName,
      type: type,
      acc_number: accNum,
      balance: balance,
    };

    console.log("Data to be sent:", data);

    axios
      .post(`http://localhost:5000/balances`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        navigate("/balances");
        enqueueSnackbar("Balance added successfully", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error response:", error.response);
        enqueueSnackbar(error.response?.data?.message || "Error occurred", {
          variant: "error",
        });
      });
  };

  return (
    <div className="flex flex-col bg-white p-8 rounded-md relative">
      <h1 className="text-neutral text-xl mb-3">Add Account</h1>
      <a onClick={set} className="absolute right-5 top-5 z-50">
        <IoClose className="size-8 text-error" />
      </a>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows-2 grid-cols-3 gap-8">
          <div className="flex flex-col">
            <label className="text-lg">Bank Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Balance</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Branch Name</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Account Number</label>
            <input
              type="text"
              value={accNum}
              onChange={(e) => setAccNum(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex mt-5 gap-4">
          <input
            type="submit"
            value="Create"
            className="btn bg-primary text-white border-none"
          />
        </div>
      </form>
    </div>
  );
}
