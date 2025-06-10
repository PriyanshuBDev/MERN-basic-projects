import React, { useEffect, useState } from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import { AdminPanel } from "./components/AdminPanel";
function App() {
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const fetchCards = async () => {
    try {
      const res = await fetch("http://localhost:3000/card/read");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (!data.cards) {
        throw new Error(`Cards not found`);
      }
      setCards(data.cards);
    } catch (e) {
      console.log("Error:", e);
      setCards([]);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <h1>E-Bussiness Card</h1>
      <CardList cards={cards}></CardList>
      <AdminPanel
        token={token}
        setToken={setToken}
        fetchCards={fetchCards}
      ></AdminPanel>
    </div>
  );
}

export default App;
