import axios from "axios";
import { useEffect, useState } from "react";

export function Balance() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setBalance(res.data.balance));
  });
  return (
    <div className="m-6 mx-8 flex gap-4 items-center">
      <strong className="text-lg">Your Balance</strong>
      <div className="font-semibold text-lg">Rs {balance}</div>
    </div>
  );
}
