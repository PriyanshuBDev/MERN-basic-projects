import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePosting = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      const data = res.data;
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (e) {
      console.log("Error:", e);
      if (e.response) {
        alert(e.response.data.msg);
      }
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className=" bg-white shadow-md h-max flex flex-col justify-center items-center p-4 w-85 rounded-lg">
        <Heading label={"Sign up"}></Heading>
        <Subheading
          label={"Enter your information to create an account"}
        ></Subheading>
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
          placeholder={"johndoe@gmail.com"}
          label={"Email"}
          type={"email"}
          onChange={(e) => setUsername(e.target.value)}
        ></InputBox>
        <InputBox
          placeholder={"123456"}
          label={"Password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        ></InputBox>
        <Button onClick={handlePosting} placeholder={"Sign up"}></Button>
        <BottomWarning
          warning={"Already have an account?"}
          btnText={"Sign in"}
          to={"/signin"}
        ></BottomWarning>
      </div>
    </div>
  );
}
