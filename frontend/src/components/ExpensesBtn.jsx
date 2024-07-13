/* eslint-disable no-unused-vars */
import Up from '../assets/Up.svg';
import Right from '../assets/Right.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react/prop-types
export default function ExpensesBtn({ img, text, userId }) {
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
      <div className="flex items-center py-6">
        <div className="flex gap-3 items-center">
          <div className="p-2 h-[56px] w-[40px] bg-[#D2D2D2] bg-opacity-25 flex">
            <img src={img} alt="" />
          </div>
          <div className="flex gap-1 flex-col">
            <div>
              <h2 className="text-base font-bold capitalize">{text}</h2>
              <h1 className="font-semibold">${totalAmount.toFixed(2)}</h1>
              <div className='flex gap-2'>
                <p className="text-xs font-normal">{percentage.toFixed(2)}%</p>
                <img src={Up} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 px-3">
          <img src={Right} alt="" />
        </div>
      </div>
    </>
  );
}
