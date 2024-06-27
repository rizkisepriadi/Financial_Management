import Navbar from "../components/Navbar";
import TotalBalance from "../components/TotalBalance";
import Goals from "../components/Goals";
import UpcomingBill from "../components/UpcomingBill";
import RecentTransaction from "../components/RecentTransaction";
import WeeklyComparisonChart from "../components/ComparasionChart";
import ExpensesBreakdown from "../components/ExpensesBreakdown";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Header from "../components/Header";

export default function Dashboard() {
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
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <Header name={isUser.name} />

        {/* Dashboard Content */}
        <div className="flex gap-6 ">
          {/* Total Balance */}
          <TotalBalance />
          {/* Goals */}
          <Goals />
          {/* Upcoming Bill */}
          <UpcomingBill />
        </div>
        <div className="flex gap-5">
          <RecentTransaction />
          <div className=" flex flex-col ">
            <WeeklyComparisonChart />
            <ExpensesBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
