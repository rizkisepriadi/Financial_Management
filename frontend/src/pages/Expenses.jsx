import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";
import Housing from "../assets/Housing.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ExpensesBreakdownBTN from "../components/ExpensesBreakdownBTN";


export default function Balances() {
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

  const data = [
    { day: "Jan", thisMonth: 250000, lastMonth: 50000 },
    { day: "Feb", thisMonth: 50000, lastMonth: 50000 },
    { day: "Mar", thisMonth: 10000, lastMonth: 25000 },
    { day: "Apr", thisMonth: 20000, lastMonth: 20000 },
    { day: "May", thisMonth: 10000, lastMonth: 30000 },
    { day: "Jun", thisMonth: 250000, lastMonth: 50000 },
    { day: "Aug", thisMonth: 50000, lastMonth: 50000 },
    { day: "Sep", thisMonth: 50000, lastMonth: 50000 },
    { day: "Oct", thisMonth: 50000, lastMonth: 50000 },
    { day: "Nov", thisMonth: 50000, lastMonth: 50000 },
    { day: "Dec", thisMonth: 50000, lastMonth: 50000 },
  ];

  return (
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <Header className="hidden" />
        <div className="flex flex-col gap-3 ">
          <h1 className="text-neutral text-[22px]">Expenses Comparison</h1>
          <div className="flex flex-col bg-white p-2 rounded-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Monthly Comparison</h2>
              <div className="flex gap-6 ">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-2 bg-primary"></span>
                  <p className="text-xs">This Month</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-2 bg-[#E8E8E8]"></span>
                  <p className="text-xs">Last Month</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={258}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lastMonth" fill="#E5E5E5" name="Last Month" />
                <Bar dataKey="thisMonth" fill="#00C9A7" name="This Month" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h1 className="text-neutral text-[22px]">Expenses Breakdown</h1>
          <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-6">
            <ExpensesBreakdownBTN img={Housing} text="housing" />
            <ExpensesBreakdownBTN img={Housing} text="food" />
            <ExpensesBreakdownBTN img={Housing} text="transportation" />
            <ExpensesBreakdownBTN img={Housing} text="entertainment" />
            <ExpensesBreakdownBTN img={Housing} text="shopping" />
            <ExpensesBreakdownBTN img={Housing} text="others" />
          </div>
        </div>
      </div>
    </div>
  );
}
