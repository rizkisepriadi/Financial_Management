import Navbar from "../components/Navbar";
import Date from "../assets/Date.svg";
import Search from "../components/Search";
import Notification from "../components/Notification";
import TotalBalance from "../components/TotalBalance";
import Goals from "../components/Goals";

export default function Dashboard() {
  return (
    <div className="flex h-full">
      <Navbar />
      <div className="px-8 pb-5 w-full">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center py-5 ">
          {/* Dashboard User Info */}
          <div className="flex gap-6 items-center">
            <h1 className="font-bold text-2xl">Hello Tanzir</h1>
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
        <div className="flex gap-6">
          {/* Total Balance */}
          <TotalBalance />
          {/* Goals */}
          <Goals />
        </div>
      </div>
    </div>
  );
}
