import NavBtn from "./NavBtn";
import Overview from "../assets/Overview.svg";
import wallet from "../assets/wallet.svg";
import Transaction from "../assets/Transaction.svg";
import Bill from "../assets/Bill.svg";
import Expencces from "../assets/Expencces.svg";
import Goal from "../assets/Goal.svg";
import Settings from "../assets/Settings.svg";
import Logout from "../assets/Logout.svg";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Navbar({ name }) {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-base-200 flex flex-col px-7 py-12">
      <div className="flex flex-col w-[228px]">
        <h1 className="text-white font-extrabold font-['poppins'] text-2xl pb-10 text-center">
          FINE<span className="font-medium">bank</span>.IO
        </h1>
        <nav className="mb-[228px]">
          <ul className="text-white">
            <li>
              <NavBtn link="/" icon={Overview} text="Overview" />
            </li>
            <li>
              <NavBtn link=" " icon={wallet} text="Balances" />
            </li>
            <li>
              <NavBtn link="" icon={Transaction} text="Transactions" />
            </li>
            <li>
              <NavBtn link="" icon={Bill} text="Bills" />
            </li>
            <li>
              <NavBtn link="" icon={Expencces} text="Expenses" />
            </li>
            <li>
              <NavBtn link="" icon={Goal} text="Goals" />
            </li>
            <li>
              <NavBtn link="" icon={Settings} text="Settings" />
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <NavBtn
          onClick={handleLogout}
          icon={Logout}
          text="Logout"
          className="bg-white bg-opacity-[0.075] flex rounded w-full text-white py-3 px-4 items-center mb-11"
        />

        {/* Profile Section */}
        <div className="pt-11 border-t-white border-t">
          <div className="py-8 flex gap-4 items-center">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col text-white">
              <p className="font-semibold text-base">{name}</p>
              <a href="" className="font-normal text-base">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
