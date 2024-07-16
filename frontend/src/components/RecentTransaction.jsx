import Game from "../assets/Game.svg";
import RecentTransBtn from "./RecentTransBtn";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function RecentTransaction() {
  // eslint-disable-next-line no-unused-vars
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();
  const [isTransaction, setIsTransaction] = useState([]);

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
            .get(`http://localhost:5000/transaction?user_id=${decoded._id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((response) => {
              setIsTransaction(response.data.data);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col w-[365px] pt-6">
      <h1 className="text-neutral text-[22px]">Recent Transaction</h1>
      <div className="py-4 px-6 bg-white shadow-md">
        <div className="flex gap-5 text-base">
          <h1>All</h1>
          <h2>Revenue</h2>
          <h3>Expenses</h3>
        </div>
        <div>
          {isTransaction.slice(0, 5).map((transaction) => (
            <RecentTransBtn
              key={transaction._id}
              img={Game}
              items={transaction.items}
              tag={transaction.tag}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
