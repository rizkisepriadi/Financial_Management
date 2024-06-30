import Up from "../assets/Up.svg";

// eslint-disable-next-line react/prop-types
export default function ExpensesBreakdownBTN({ img }) {
  return (
    <>
      <div className="flex flex-col items-center w-[352px]">
        <div className="flex gap-3 items-center bg-opacity-50 bg-[#E8E8E8] py-4 px-6 w-full justify-between">
          <div className="flex gap-2">
            <div className="p-2 h-[46px] w-[40px] bg-[#D2D2D2] bg-opacity-80 flex rounded-md gap-4">
              <img src={img} alt="" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold capitalize">Housing</h2>
              <h1 className="font-semibold">$160.00</h1>
            </div>
          </div>

          <div className="flex">
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 justify-end mb-[6px] items-center">
                <p className="text-base font-normal">15%</p>
                <img src={Up} className="size-4" />
              </div>
              <p className="text-xs font-light text-accent">
                Compare to last month
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white py-4 px-6 w-full justify-between drop-shadow-md">
          <div className="flex w-full justify-between py-2">
            <h1 className="text-base font-semibold">House Rent</h1>
            <div className="flex flex-col items-end">
              <h1 className="text-base font-semibold">$160.00</h1>
              <p className="text-xs font-normal">17 May 2023</p>
            </div>
          </div>
          <div className="flex w-full justify-between py-2">
            <h1 className="text-base font-semibold">Parking</h1>
            <div className="flex flex-col items-end">
              <h1 className="text-base font-semibold">$160.00</h1>
              <p className="text-xs font-normal">17 May 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
