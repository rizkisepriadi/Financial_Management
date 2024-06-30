import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";
import FormAccount from "../components/FormAccount";
import FormSecurity from "../components/FormSecurity";

export default function Settings() {
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();
  const [active, setActive] = useState("account");

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
        <div className="flex flex-col">
          <div className="flex flex-col bg-white p-8 rounded-md gap-8">
            <div className="flex gap-8">
              <button
                className={`py-4 px-2 text-base ${
                  active === "account" ? "text-primary" : ""
                }`}
                onClick={() => setActive("account")}
              >
                Account
              </button>
              <button
                className={`py-4 px-2 text-base ${
                  active === "security" ? "text-primary" : ""
                }`}
                onClick={() => setActive("security")}
              >
                Security
              </button>
            </div>
            <div>
              {active === "account" && <FormAccount />}
              {active === "security" && <FormSecurity />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
