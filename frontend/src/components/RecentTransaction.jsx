import Game from "../assets/Game.svg";
import RecentTransBtn from "./RecentTransBtn";

export default function RecentTransaction() {
  return (
    <div className="flex flex-col w-[365px] pt-6">
      <h1 className="text-neutral text-[22px]">Recent Transaction</h1>
      <div className="py-4 px-6 bg-white shadow-md">
        <div className="flex gap-5 text-base">
          <h1>All</h1>
          <h2>Revenue</h2>
          <h3>Expenses</h3>
        </div>
        <div>
          <RecentTransBtn img={Game} />
          <RecentTransBtn img={Game} />
          <RecentTransBtn img={Game} />
          <RecentTransBtn img={Game} />
          <RecentTransBtn img={Game} />
        </div> 
      </div>
    </div>
  );
}
