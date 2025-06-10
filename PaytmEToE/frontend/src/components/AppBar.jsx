import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function AppBar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/username", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
      })
      .catch((e) => {
        console.log("Error:", e);
        localStorage.removeItem("token");
        navigate("/signin");
        alert("Invalid token");
      });
  }, [navigate]);
  function handleLogOut() {
    try {
      navigate("/signin");
      localStorage.removeItem("token");
    } catch (e) {
      console.log("Error:", e);
      alert("Error encountered while logging out");
    }
  }

  function handleUpdateNav() {
    navigate("/update");
  }
  return (
    <div className="shadow-md rounded-md w-screen flex justify-between px-4 py-1 items-center">
      <div className="py-2 font-semibold">PayTM App</div>
      <div className="flex items-center gap-2">
        <div className="font-semibold">Hello</div>
        <div
          onClick={() => setActive(!active)}
          className="relative w-9 h-9 bg-slate-300 rounded-full flex justify-center items-center text-lg font-semibold cursor-pointer focus:ring-slate-400 focus:ring-4"
          data-dropdown-toggle="dropdown-user"
        >
          {firstName?.charAt(0).toUpperCase() || "?"}
          <div
            className={`absolute w-60 h-55 -bottom-56.5 -right-3.5 rounded-md bg-gray-200 flex flex-col ${
              active ? "block" : "hidden"
            }`}
          >
            <div className="w-full pb-3 mt-2 pl-4 border-b-2 border-gray-300 text-md flex flex-col cursor-text ">
              <div className="flex gap-1 text-md">
                <div>{firstName}</div>
                <div>{lastName}</div>
              </div>
              <div className="flex justify-start text-sm">{username}</div>
            </div>
            <button
              onClick={handleUpdateNav}
              className="flex justify-start px-4 py-2 mt-1 hover:bg-gray-300 text-[15px] cursor-pointer"
            >
              Update Profile
            </button>
            <button className="flex justify-start px-4 py-2  hover:bg-gray-300 text-[15px] cursor-pointer">
              Settings
            </button>
            <div className="w-[90%] ml-3.5 ">
              <Button onClick={handleLogOut} placeholder={"Log out"}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
