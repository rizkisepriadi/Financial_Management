import Mastercard from "../assets/Mastercard.svg";
import Pagination from "./Pagination";
import { useState } from "react";

export default function TotalBalance() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Set this to the total number of pages you have

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-neutral text-[22px]">Total Balance</h1>
      <div className="py-5 px-6 bg-white shadow-md">
        <div className="flex justify-between pb-3">
          <h1 className="text-[22px] font-extrabold">$240,399</h1>
          <p className="text-base font-medium">All Accounts</p>
        </div>
        <div className="bg-primary p-4 mt-3 text-white">
          <div className="flex justify-between">
            <h1 className="text-base font-medium">Account type</h1>
            <img src={Mastercard} alt="" />
          </div>
          <h2 className="text-base font-bold">Credit Card</h2>
          <div className="flex gap-2">
            <h3 className="text-base font-medium">**** **** **** 2598</h3>
            <p className="text-base font-bold w-[92px] text-right">$25000 </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="white" />
              <path
                d="M8.66669 15.3333L15.3334 8.66667"
                stroke="#299D91"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.66669 8.66667H15.3334V15.3333"
                stroke="#299D91"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
