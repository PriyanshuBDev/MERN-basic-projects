import axios from "axios";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function Update() {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  async function handleUpdating() {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/update",
        {
          password,
          firstName,
          lastName,
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
      alert("Error encountered file updating");
    }
  }
  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen">
      <div className="bg-white shadow-md h-max flex flex-col justify-center items-center p-4 w-85 rounded-lg">
        <Heading label={"Update"}></Heading>
        <Subheading label={"Update your account credentials"}></Subheading>
        <InputBox
          placeholder={"John"}
          label={"First Name"}
          type={"text"}
          onChange={(e) => setFirstName(e.target.value)}
        ></InputBox>
        <InputBox
          placeholder={"Doe"}
          label={"Last Name"}
          type={"text"}
          onChange={(e) => setLastName(e.target.value)}
        ></InputBox>
        <InputBox
          placeholder={"123456"}
          label={"Password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        ></InputBox>
        <Button onClick={handleUpdating} placeholder={"Update"}></Button>
      </div>
    </div>
  );
}
