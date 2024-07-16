/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Mastercard from "../assets/Mastercard.svg";
import Pagination from "./Pagination";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function TotalBalance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isUser, setIsUser] = useState({});
  const { user } = useAuthContext();
  const [balance, setBalance] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = balance[currentPage - 1];

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
          setIsUser(response.data);

          return axios.get(`http://localhost:5000/balances`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        })
        .then((response) => {
          setBalance(response.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  if (!currentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-neutral text-[22px]">Total Balance</h1>
      <div className="py-5 px-6 bg-white shadow-md h-[232px]">
        <div className="flex justify-between">
          <h1 className="text-[22px] font-extrabold">{currentData.balance}</h1>
          <p className="text-base font-medium">All Accounts</p>
        </div>
        <div className="bg-primary p-4 mt-3 text-white">
          <div className="flex justify-between">
            <h1 className="text-base font-medium">Account type</h1>
            <img src={Mastercard} alt="" />
          </div>
          <h2 className="text-base font-bold">{currentData.type}</h2>
          <div className="flex gap-2">
            <h3 className="text-base font-medium">{currentData.acc_number}</h3>
            <p className="text-base font-bold w-[92px] text-right">
              ${new Number(currentData.balance).toLocaleString()}
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="white" />
              <path
                d="M8.66669 15.3333L15.3334 8.66667"
                stroke="#299D91"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.66669 8.66667H15.3334V15.3333"
                stroke="#299D91"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-1">
          <Pagination
            currentPage={currentPage}
            totalPages={balance.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
