import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handlePosting() {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      const data = res.data;
      localStorage.setItem("token", data.token);
      alert(data.msg);
      navigate("/dashboard");
    } catch (e) {
      console.log("Error:", e);
      if (e.response) {
        alert(e.response.data.msg);
      }
    }
  }

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen">
      <div className="bg-white shadow-md h-max flex flex-col justify-center items-center p-4 w-85 rounded-lg">
        <Heading label={"Sign in"}></Heading>
        <Subheading
          label={"Enter your credentials to access your account"}
        ></Subheading>
        <InputBox
          placeholder={"johndoe@gamil.com"}
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
        <Button onClick={handlePosting} placeholder={"Sign in"}></Button>
        <BottomWarning
          warning={"Don't have an account?"}
          btnText={"Sign up"}
          to={"/signup"}
        ></BottomWarning>
      </div>
    </div>
  );
}
