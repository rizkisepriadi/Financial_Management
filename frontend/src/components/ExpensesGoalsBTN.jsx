import AdjustBTN from "./AdjustBTN";

// eslint-disable-next-line react/prop-types
export default function ExpensesGoalsBTN({ img, text, set }) {
  
  return (
    <div className="py-7 px-6 bg-white w-[352px] flex items-center">
      <div className="flex gap-4 w-full">
        <div className="px-2 py-3 bg-[#D2D2D2] bg-opacity-25 flex rounded-md ">
          <img src={img} className="size-7" />
        </div>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col">
            <h2 className="text-base font-bold capitalize">{text}</h2>
            <h1 className="font-semibold">$160.00</h1>
          </div>
          <div className="flex justify-end items-center">
            <AdjustBTN set={set} text="Adjust" />
          </div>
        </div>
      </div>
    </div>
  );
}
