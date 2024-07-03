import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSnackbar } from "notistack";

/* eslint-disable react/prop-types */
export default function BalanceCard({ item }) {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemove = () => {
    axios.delete(`http://localhost:5000/balances/${item._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then (() => {
      enqueueSnackbar("Balance removed successfully", { variant: "success" });
      window.location.reload();
    }).catch((error) => {
      console.error("Error response:", error.response);
      enqueueSnackbar(error.response?.data?.message || "Error occurred", {
        variant: "error",
      });
    });
  }

  return (
    <div>
      <div className="w-[352px] h-[288px]  p-6 px-6 bg-white drop-shadow-md flex flex-col gap-1 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <p>{item.type}</p>
          <div className="flex items-center">
            <p>{item.bank_name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="">
            <h1 className="text-accent text-xl font-bold">{item.acc_number}</h1>
            <p className="text-neutral text-base">Account Number</p>
          </div>
          <div>
            <h1 className="text-accent text-xl font-bold">${item.balance}</h1>
            <p className="text-neutral text-base">Total amount</p>
          </div>
          <div className="flex justify-between">
            <button onClick={handleRemove} className="btn bg-transparent text-primary border-none">
              Remove
            </button>
            <a href={`/balances/detail/${item._id}`}  className="btn bg-primary text-white border-none">
              Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
