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

export default function Expenses() {
  const [isUser, setisUser] = useState({});
  const [transactionData, setTransactionData] = useState([]); // [1
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
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
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
        <div className="flex flex-col gap-3 mt-4">
          <h1 className="text-neutral text-[22px]">Expenses Breakdown</h1>
          <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-6">
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="housing"
            />
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="food"
            />
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="transportation"
            />
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="entertainment"
            />
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="shopping"
            />
            <ExpensesBreakdownBTN
              img={Housing}
              userId={isUser._id}
              text="others"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
