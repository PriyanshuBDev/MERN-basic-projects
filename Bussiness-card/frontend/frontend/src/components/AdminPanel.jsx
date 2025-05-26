import React, { useState } from "react";
import { CardForm } from "./CardForm";
import { CardUpdate } from "./CardUpdate";
import { CardDelete } from "./CardDelete";

export function AdminPanel({ token, setToken, fetchCards }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const auth = async () => {
    const route = isSignup ? "signup" : "signin";
    try {
      const res = await fetch(`http://localhost:3000/admin/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const json = await res.json();
      if (isSignup) {
        alert(json.msg);
      } else {
        if (json.token) {
          localStorage.setItem("token", json.token);
          setToken(json.token);
          alert("Signed in!");
        } else {
          alert(json.msg || "Signin failed");
        }
      }
    } catch (e) {
      console.log("Error:", e);
      alert("Login Failed");
    }
  };

  if (!token) {
    return (
      <div>
        <h2>Admin Login</h2>
        <input
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button onClick={auth} disabled={!username || !password}>
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
        <p>
          {isSignup ? "Already have an account" : "New Admin!"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Create Cards</h3>
      <CardForm token={token} fetchCards={fetchCards}></CardForm>
      <h3>Update Cards</h3>
      <CardUpdate token={token} fetchCards={fetchCards}></CardUpdate>
      <h3>Delete Cards</h3>
      <CardDelete token={token} fetchCards={fetchCards}></CardDelete>
      <button
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Log Out
      </button>
    </div>
  );
}
