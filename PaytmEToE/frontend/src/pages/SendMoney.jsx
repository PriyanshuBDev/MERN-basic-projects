import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SendMoney() {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();
  async function handleTransfer() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.msg);
      navigate("/dashboard");
    } catch (e) {
      console.log("Error:", e);
      if (e.response) {
        alert(e.response.data.msg);
      }
    }
  }
  return (
    <div className="bg-slate-100 flex justify-center items-center h-screen ">
      <div className="bg-white shadow-md h-max flex flex-col justify-center  p-8 w-85 rounded-lg ">
        <div className="font-semibold text-3xl mt-2 mb-12 flex justify-center items-center">
          Send Money
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full text-white text-xl pb-1 bg-green-500 flex justify-center items-center">
            {name[0].toUpperCase()}
          </div>
          <div className="text-2xl font-semibold">{name}</div>
        </div>
        <div className="text-sm font-semibold ml-0.5 mt-2">Amount (in Rs)</div>
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          className="border-2 border-gray-200 rounded-md px-4 py-1.5 w-full mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={handleTransfer}
          className="w-full bg-green-500 text-white py-1.5 rounded-md mt-3 cursor-pointer hover:opacity-90 "
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
