import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";

export default function Transactions() {
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
                    {/* row 1 */}
                    <tr>
                      <th>GTR-5</th>
                      <td>Gadget & Gear</td>
                      <td>17 May, 2023</td>
                      <td>Credit Card</td>
                      <th>$160.00</th>
                    </tr>
                    <tr>
                      <th>GTR-5</th>
                      <td>Gadget & Gear</td>
                      <td>17 May, 2023</td>
                      <td>Credit Card</td>
                      <th>$160.00</th>
                    </tr>
                    <tr>
                      <th>GTR-5</th>
                      <td>Gadget & Gear</td>
                      <td>17 May, 2023</td>
                      <td>Credit Card</td>
                      <th>$160.00</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="self-center">
                <button className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                  Load More
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
