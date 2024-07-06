/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { IoClose } from "react-icons/io5";

export default function EditBalanceCard({ set, userId }) {
  // eslint-disable-next-line no-unused-vars
  const [isUser, setisUser] = useState({});
  const { id } = useParams();
  const [name, setName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [type, setType] = useState("");
  const [accNum, setAccNum] = useState("");
  const [balance, setBalance] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      axios
        .get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setisUser(response.data);
          axios
            .get(`http://localhost:5000/balances/${id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((response) => {
              const balanceData = response.data;
              setName(balanceData.bank_name);
              setBranchName(balanceData.branch_name);
              setType(balanceData.type);
              setAccNum(balanceData.acc_number);
              setBalance(balanceData.balance);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

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
      .put(`http://localhost:5000/balances/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        navigate("/balances");
        enqueueSnackbar("Balance updated successfully", { variant: "success" });
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
      <h1 className="text-neutral text-xl mb-3">Edit Balances</h1>
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
              disabled
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
            value="Save"
            className="btn bg-primary text-white border-none"
          />
        </div>
      </form>
    </div>
  );
}
