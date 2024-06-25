import Figma from "../assets/Figma.svg";
import Adobe from "../assets/Adobe.svg";

export default function UpcomingBill() {
  return (
    <div className="flex flex-col w-[352px]">
      <h1 className="text-neutral text-[22px]">Upcoming Bill</h1>
      <div className="py-5 px-6 bg-white shadow-md h-[232px]">
        <div className="flex justify-between items-center pt-2 pb-5">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-[#D2D2D2] bg-opacity-25 flex">
              <div className="flex flex-col">
                <p>May</p>
                <p className="font-extrabold text-2xl">15</p>
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <img src={Figma} className="w-[44.8px] h-[16px]" />
              <div>
                <h2 className="text-base font-bold capitalize">
                  figma - Monthly
                </h2>
                <p className="text-xs font-normal">
                  Last Charge - 14 May, 2022{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="py-2 px-3 border border-[#E8E8E8]">
            <h1>$150</h1>
          </div>
        </div>
        <div className="flex justify-between items-center pb-2 pt-5">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-[#D2D2D2] bg-opacity-25 flex">
              <div className="flex flex-col">
                <p>Jun</p>
                <p className="font-extrabold text-2xl">16</p>
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <img src={Adobe} className="w-[44.8px] h-[16px]" />
              <div>
                <h2 className="text-base font-bold capitalize">
                  Adobe - Yearly{" "}
                </h2>
                <p className="text-xs font-normal">
                  Last Charge - 17 Jun, 2023{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="py-2 px-3 border border-[#E8E8E8]">
            <h1>$559</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
