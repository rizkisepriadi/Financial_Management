/* eslint-disable react/prop-types */
import Input from "./input.jsx";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Pastikan ini diimport dengan benar
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useSnackbar } from "notistack";

export default function PopUpInput1({ set }) {
  const [target, setTarget] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isUser, setIsUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isGoals, setGoals] = useState({ target_amount: 0 });
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      console.log("Decoded Token ID:", decoded._id); // Log decoded ID
      axios
        .get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setIsUser(response.data);
          axios
            .get(
              `http://localhost:5000/goals/savinggoal?user_id=${decoded._id}`,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            )
            .then((response) => {
              console.log("Goals Response:", response.data);
              setGoals(response.data.data[0]);
            })
            .catch((err) => {
              console.error("Goals fetch error:", err);
              enqueueSnackbar("Failed to fetch goals", { variant: "error" });
            });
        })
        .catch((err) => {
          console.error("User fetch error:", err);
          enqueueSnackbar("Failed to fetch user", { variant: "error" });
        });
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user || !user.token) {
      enqueueSnackbar("User not authenticated", { variant: "error" });
      return;
    }

    const data = {
      target_amount: target,
      achieved_amount: isGoals.achieved_amount,
      start_date: "7-8-2024",
      end_date: "7-9-2024",
    };

    console.log("Data to be sent:", data);

    axios
      .put(`http://localhost:5000/goals/savinggoal/${isGoals._id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
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
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-16 relative">
        <a onClick={set} className="absolute right-5 top-5 z-50">
          <IoClose className="size-8 text-error" />
        </a>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md">Target Amounts</label>
            <Input
              placeholder="$500000"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-primary text-white px-6 py-3 w-[144px] rounded-md cursor-pointer hover:bg-primary transition-colors"
          />
        </form>
      </div>
    </div>
  );
}
