import Notification from "../components/Notification";
import Search from "../components/Search";
import Date from "../assets/Date.svg";

// eslint-disable-next-line react/prop-types
export default function Header({ name, ...props }) {

  return (
    <>
      <div className="px-1  pb-5">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center py-5 ">
          {/* Dashboard User Info */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl"{...props}>Hello {name}</h1>
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
      </div>
    </>
  );
}
