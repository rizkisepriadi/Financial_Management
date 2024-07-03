/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";

const PAGE_SIZE = 1;

export default function Transactions() {
  const [isUser, setIsUser] = useState({});
  const { user } = useAuthContext();
  const [isTransaction, setIsTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadTransactions = async (page) => {
    setIsLoading(true);
    try {
      if (user && user.token) {
        const decoded = jwtDecode(user.token);
        const userResponse = await axios.get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setIsUser(userResponse.data);

        const transactionResponse = await axios.get(`http://localhost:5000/transaction`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: { page, pageSize: PAGE_SIZE },
        });

        console.log("Transaction Response:", transactionResponse.data);

        const data = transactionResponse.data;

        if (data.data && Array.isArray(data.data)) {
          // Pastikan untuk hanya menambahkan transaksi baru tanpa duplikasi
          setIsTransaction((prevTransactions) => [
            ...prevTransactions,
            ...data.data.filter(transaction => 
              !prevTransactions.some(prevTransaction => prevTransaction._id === transaction._id)
            )
          ]);
          setHasMore(data.data.length > 0);
        } else {
          throw new Error("Invalid transaction data format");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <Header className="hidden" />
        <div className="flex flex-col gap-3">
          <h1 className="text-neutral text-[22px]">Recent Transaction</h1>{" "}
          <div className="flex flex-col">
            <div className="flex gap-4 mb-3">
              <h1>All</h1>
              <h2>Revenue</h2>
              <h3>Expenses</h3>
            </div>
            <div className="flex flex-col bg-white p-5 drop-shadow-md">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Shop Name</th>
                      <th>Date</th>
                      <th>Payment Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isTransaction.map((transaction) => (
                      <tr key={transaction._id}>
                        <th>{transaction.items}</th>
                        <td>{transaction.shop_name}</td>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>{transaction.payment_method}</td>
                        <th>${transaction.amount}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="self-center">
                {hasMore && !isLoading && (
                  <button onClick={handleLoadMore} className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                    Show
                  </button>
                )}
                {isLoading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
