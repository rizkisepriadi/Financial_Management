/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useSnackbar } from "notistack";

export default function Balances() {
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();
  const { id } = useParams();
  const [balance, setBalance] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();

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
              console.log(response.data);
              setBalance(response.data);
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

  const handleRemove = () => {
    axios.delete(`http://localhost:5000/balances/${balance._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then (() => {
      Navigate("/balances");
      enqueueSnackbar("Balance removed successfully", { variant: "success" });
    }).catch((error) => {
      console.error("Error response:", error.response);
      enqueueSnackbar(error.response?.data?.message || "Error occurred", {
        variant: "error",
      });
    });
  }

  return (
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <Header className="hidden" />
        <div className="flex flex-col gap-3">
          <h1 className="text-neutral text-[22px]">Account Details</h1>
          <div className="flex flex-col bg-white p-8 rounded-md">
            <div className="grid grid-rows-2 grid-cols-3 gap-8">
              <div className="flex flex-col">
                <p className="text-neutral text-base">Bank Name</p>
                <h1 className="text-accent text-xl font-bold">{balance.bank_name}</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral text-base">Account Type</p>
                <h1 className="text-accent text-xl font-bold">{balance.type}</h1>
              </div>
              <div>
                <p className="text-neutral text-base">Balance</p>
                <h1 className="text-accent text-xl font-bold">${parseFloat(balance.balance).toLocaleString()}</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral text-base">Branch Name</p>
                <h1 className="text-accent text-xl font-bold">
                {balance.branch_name}
                </h1>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral text-base">Account Number</p>
                <h1 className="text-accent text-xl font-bold">{balance.acc_number}</h1>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                Edit Details
              </button>
              <button onClick={handleRemove} className="text-neutral font-bold px-4 py-2 rounded-md mt-4">
                Remove
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-5 mb-2 gap-3">
            <h1 className="text-neutral text-[22px]">Transactions History</h1>
            <div className="flex flex-col bg-white p-5">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Transaction Type</th>
                      <th>Receipt</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>17 Apr, 2023</td>
                      <td>Complate</td>
                      <td>Credit</td>
                      <td>8C422Y3823</td>
                      <td>$160.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="self-center">
                <button className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                  Load More
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
