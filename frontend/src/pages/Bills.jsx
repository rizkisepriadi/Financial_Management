import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";
import Figma from "../assets/Figma.svg";

export default function Bills() {
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
          <h1 className="text-neutral text-[22px]">Upcoming Bills</h1>
          <div className="flex flex-col bg-white p-2 rounded-md">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2">Due Date</th>
                  <th className="py-2 border-b-2">Logo</th>
                  <th className="py-2 px-4 border-b-2">Item Description</th>
                  <th className="py-2 px-4 border-b-2">Last Charge</th>
                  <th className="py-2 px-4 border-b-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-4 px-4 border-b">
                    <div className="inline-block px-5 py-3 bg-[#D2D2D2] bg-opacity-25 rounded-lg">
                      <p>May</p>
                      <p className="font-extrabold text-2xl">15</p>
                    </div>
                  </td>
                  <td className="py-12 px-4 border-b flex  justify-center">
                    <img src={Figma} />
                  </td>
                  <td className="py-4 px-4 border-b">Figma - Monthly</td>
                  <td className="py-4 px-4 border-b">14 May, 2022</td>
                  <td className="py-4 px-4 border-b">$150</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
