import Navbar from "../components/Navbar";
import Date from "../assets/Date.svg";
import Search from "../components/Search";
import Notification from "../components/Notification";
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

export default function Dashboard() {
  const [isUser, setisUser] = useState({});
  const { user, dispatch } = useAuthContext();
  

  useEffect(() => {
    const decoded = jwtDecode(user.token);

    if (user && user.token) {
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
  }, [dispatch, user]);

  return (
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center py-5 ">
          {/* Dashboard User Info */}
          <div className="flex gap-6 items-center">
            <h1 className="font-bold text-2xl">Hello {isUser.name}</h1>
            <div className="flex items-center gap-2">
              <img src={Date} alt="" />
              <p className="text-sm">May 19, 2023</p>
            </div>
          </div>

          {/* Search Bar & Notification */}
          <div className="flex gap-10 items-center">
            <Notification />
            <Search />
          </div>
        </div>

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
