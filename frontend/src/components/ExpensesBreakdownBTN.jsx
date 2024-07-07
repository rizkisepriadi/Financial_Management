/* eslint-disable no-unused-vars */
import axios from "axios";
import Up from "../assets/Up.svg";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react/prop-types
export default function ExpensesBreakdownBTN({ img, text, userId }) {
  const [data, setData] = useState({});
  const [isUser, setIsUser] = useState({});
  const { user } = useAuthContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.token) {
        try {
          const decoded = jwtDecode(user.token);
          const userResponse = await axios.get(
            `http://localhost:5000/user/${decoded._id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setIsUser(userResponse.data);

          const transactionResponse = await axios.get(
            `http://localhost:5000/transaction?user_id=${userId}&tag=${text}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const transactions = transactionResponse.data.data;
          setData(transactions);

          // Calculate total amount
          const currentYear = new Date().getFullYear();
          const total = transactions.reduce((sum, transaction) => {
            return sum + transaction.amount;
          }, 0);
          setTotalAmount(total);

          // Calculate percentage compared to a fixed value or previous total
          const previousTotal = 900; // Example previous total
          const percent = (total / previousTotal) * 100;
          setPercentage(percent);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user, text, userId]);

  return (
    <>
      <div className="flex flex-col items-center w-[352px] h[100%]">
        <div className="flex gap-3 items-center bg-opacity-50 bg-[#E8E8E8] py-4 px-6 w-full justify-between">
          <div className="flex gap-2">
            <div className="p-2 h-[46px] w-[40px] bg-[#D2D2D2] bg-opacity-80 flex rounded-md gap-4">
              <img src={img} alt="" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold capitalize">{text}</h2>
              <h1 className="font-semibold">${totalAmount.toFixed(2)}</h1>
            </div>
          </div>

          <div className="flex">
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 justify-end mb-[6px] items-center">
                <p className="text-base font-normal">{percentage.toFixed(2)}%</p>
                <img src={Up} className="size-4" />
              </div>
              <p className="text-xs font-light text-accent">
                Compare to last month
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white py-4 px-6 w-full h-full justify-between drop-shadow-md">
          {data.length > 0 ? (
            data.slice(0, 2).map((item) => (
              <div key={item._id} className="flex w-full justify-between py-2">
                <h1 className="text-base font-semibold">{item.items}</h1>
                <div className="flex flex-col items-end">
                  <h1 className="text-base font-semibold">
                    ${parseFloat(item.amount).toLocaleString()}
                  </h1>
                  <p className="text-xs font-normal">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base font-semibold">No data available</p>
          )}
        </div>
      </div>
    </>
  );
}
