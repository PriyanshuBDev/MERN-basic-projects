import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  }, [filter]);
  return (
    <div className="mx-8 my-6">
      <InputBox
        placeholder={"Search users..."}
        label={"Users"}
        type={"text"}
        onChange={(e) => setFilter(e.target.value)}
      ></InputBox>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();

  function handleSendPage() {
    navigate(`/send?id=${user._id}&name=${user.firstName}`);
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 text-lg ">
        <div className="w-9 h-9 bg-slate-300 rounded-full flex justify-center items-center text-lg font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        {user.firstName}
      </div>
      <div className="w-35">
        <Button onClick={handleSendPage} placeholder={"Send Money"}></Button>
      </div>
    </div>
  );
}
