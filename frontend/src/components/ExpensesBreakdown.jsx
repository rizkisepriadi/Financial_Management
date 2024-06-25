import ExpensesBtn from "./ExpensesBtn";
import Housing from "../assets/Housing.svg";

export default function ExpensesBreakdown() {
  return (
    <div className="flex flex-col">
      <h1 className="text-neutral text-[22px]">Expenses Breakdown</h1>
      <div className="px-6 bg-white shadow-md">
        <div className="grid text-base grid-flow-col grid-cols-3 grid-rows-2">
          <ExpensesBtn img={Housing} />
          <ExpensesBtn img={Housing} />
          <ExpensesBtn img={Housing} />
          <ExpensesBtn img={Housing} />
          <ExpensesBtn img={Housing} />
          <ExpensesBtn img={Housing} />
        </div>
      </div>
    </div>
  );
}
