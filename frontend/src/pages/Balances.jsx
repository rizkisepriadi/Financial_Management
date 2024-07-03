import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode"; // Pastikan impor jwtDecode benar
import axios from "axios";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import AddBalanceCard from "../components/AddBalanceCard";

export default function Balances() {
  const [isUser, setIsUser] = useState({});
  const { user } = useAuthContext();
  const [balance, setBalance] = useState([]);
  const [add, setAdd] = useState(false);

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
          setIsUser(response.data);

          return axios.get(`http://localhost:5000/balances`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        })
        .then((response) => {
          setBalance(response.data.data);
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
        {!add && (
          <div className="grid grid-flow-row grid-cols-3 gap-6">
            {balance.map((item) => (
              <BalanceCard key={item._id} item={item} />
            ))}

            <div className="w-[352px] h-[288px] pt-[100px] pb-[88px] px-6 bg-white drop-shadow-md flex flex-col gap-1 rounded-lg">
              <button
                className="btn btn-primary py-3 px-8 rounded text-white"
                onClick={() => setAdd(true)}
              >
                Add Accounts
              </button>
              <button className="btn border-none bg-transparent py-3 px-8 rounded">
                Edit Accounts
              </button>
            </div>
          </div>
        )}
        {add && (
          <AddBalanceCard set={() => setAdd(false)} userId={isUser._id} />
        )}
      </div>
    </div>
  );
}
