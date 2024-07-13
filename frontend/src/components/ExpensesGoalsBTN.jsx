/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function ExpensesGoalsBTN({ img, btn, temp }) {
  const [isUser, setisUser] = useState({});
  const [isGoals, setGoals] = useState({ target_amount: 0 });
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
          axios
            .get(
              `http://localhost:5000/goals/expensesgoals?category=${temp}&user_id=${decoded._id}`,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            )
            .then((response) => {
              setGoals(response.data.data[0]);
            })
            .catch((err) => {
              console.error("Goals fetch error:", err);
            });
        })
        .catch((err) => {
          console.error("User fetch error:", err);
        });
    }
  }, [user, temp]);

  return (
    <div className="py-7 px-6 bg-white w-[352px] flex items-center">
      <div className="flex gap-4 w-full">
        <div className="px-2 py-3 bg-[#D2D2D2] bg-opacity-25 flex rounded-md ">
          <img src={img} className="size-7" />
        </div>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col">
            <h2 className="text-base font-bold capitalize">
              {isGoals.category}
            </h2>
            <h1 className="font-semibold">${isGoals.target_amount}</h1>
          </div>
          <div className="flex justify-end items-center">{btn}</div>
        </div>
      </div>
    </div>
  );
}
