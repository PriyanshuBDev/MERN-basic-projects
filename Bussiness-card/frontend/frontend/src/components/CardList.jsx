import { Card } from "./Card";
import React from "react";

export function CardList({ cards }) {
  return (
    <div>
      {cards.map((card) => {
        return <Card key={card._id} card={card}></Card>;
      })}
    </div>
  );
}
