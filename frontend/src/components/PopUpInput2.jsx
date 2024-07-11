/* eslint-disable react/prop-types */
import Input from "./input.jsx";
import { IoClose } from "react-icons/io5";

export default function PopUpInput1({ handle, set }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 ">
      <div
        className="bg-white rounded-lg shadow-lg p-16 relative
      "
      >
        <a onClick={set} className="absolute right-5 top-5 z-50">
          <IoClose className="size-8 text-error" />
        </a>
        <form onSubmit={handle} className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md">Target Amounts</label>
            <Input placeholder="$500000" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md">Present Amounts</label>
            <Input placeholder="$500000" />
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-primary text-white px-6 py-3 w-[144px] rounded-md cursor-pointer hover:bg-primary transition-colors"
          />
        </form>
      </div>
    </div>
  );
}
