import ExpensesBtn from "./ExpensesBtn";
import Housing from "../assets/Housing.svg";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ExpensesBreakdown() {
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();

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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <h1 className="text-neutral text-[22px]">Expenses Breakdown</h1>
      <div className="px-6 bg-white shadow-md">
        <div className="grid text-base grid-flow-col grid-cols-3 grid-rows-2">
          <ExpensesBtn img={Housing} userId={isUser._id} text="housing" />
          <ExpensesBtn img={Housing} userId={isUser._id} text="food" />
          <ExpensesBtn
            img={Housing}
            userId={isUser._id}
            text="transportation"
          />
          <ExpensesBtn img={Housing} userId={isUser._id} text="entertainment" />
          <ExpensesBtn img={Housing} userId={isUser._id} text="shopping" />
          <ExpensesBtn img={Housing} userId={isUser._id} text="others" />
        </div>
      </div>
    </div>
  );
}
