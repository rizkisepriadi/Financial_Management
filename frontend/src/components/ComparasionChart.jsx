/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyComparisonChart = () => {
  const [isUser, setisUser] = useState({});
  const [transactionData, setTransactionData] = useState([]);
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
            .get(`http://localhost:5000/transaction?user_id=${decoded._id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((response) => {
              setTransactionData(response.data.data);
              console.log(response.data.data);
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

  const getMonthlyExpenses = (transactions, month, year) => {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        new Date(transaction.date).getMonth() === month &&
        new Date(transaction.date).getFullYear() === year
    );
    return filteredTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  };

  const generateChartData = (transactions) => {
    const currentYear = new Date().getFullYear();
    const lastMonth = new Date().getMonth() - 1;
    const thisMonth = new Date().getMonth();

    console.log("Generating chart data for:", {
      lastMonth,
      thisMonth,
      currentYear,
    });

    return [
      {
        month: "Jan",
        thisMonth: getMonthlyExpenses(transactions, 0, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 0, currentYear - 1),
      },
      {
        month: "Feb",
        thisMonth: getMonthlyExpenses(transactions, 1, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 1, currentYear - 1),
      },
      {
        month: "Mar",
        thisMonth: getMonthlyExpenses(transactions, 2, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 2, currentYear - 1),
      },
      {
        month: "Apr",
        thisMonth: getMonthlyExpenses(transactions, 3, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 3, currentYear - 1),
      },
      {
        month: "May",
        thisMonth: getMonthlyExpenses(transactions, 4, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 4, currentYear - 1),
      },
      {
        month: "Jun",
        thisMonth: getMonthlyExpenses(transactions, 5, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 5, currentYear - 1),
      },
      {
        month: "Jul",
        thisMonth: getMonthlyExpenses(transactions, 6, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 6, currentYear - 1),
      },
      {
        month: "Aug",
        thisMonth: getMonthlyExpenses(transactions, 7, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 7, currentYear - 1),
      },
      {
        month: "Sep",
        thisMonth: getMonthlyExpenses(transactions, 8, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 8, currentYear - 1),
      },
      {
        month: "Oct",
        thisMonth: getMonthlyExpenses(transactions, 9, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 9, currentYear - 1),
      },
      {
        month: "Nov",
        thisMonth: getMonthlyExpenses(transactions, 10, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 10, currentYear - 1),
      },
      {
        month: "Dec",
        thisMonth: getMonthlyExpenses(transactions, 11, currentYear),
        lastMonth: getMonthlyExpenses(transactions, 11, currentYear - 1),
      },
    ];
  };

  const chartData = generateChartData(transactionData);
  console.log("Chart data generated:", chartData); // Tambahkan console log ini

  return (
    <div className="mt-6">
      <h1 className="text-neutral text-[22px]">Recent Transaction</h1>
      <div className="p-4 bg-white rounded-lg shadow-md w-[728px]">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Weekly Comparison</h2>
          <div className="flex gap-6 ">
            <div className="flex gap-2 ite ms-center">
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
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="lastMonth" fill="#E5E5E5" name="Last Month" />
            <Bar dataKey="thisMonth" fill="#00C9A7" name="This Month" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyComparisonChart;
