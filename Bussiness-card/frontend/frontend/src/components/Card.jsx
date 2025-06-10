import "./card.css";
import React from "react";

export function Card({ card }) {
  return (
    <div className="card">
      <h1 className="title">{card.name}</h1>
      <h2 className="description">{card.description}</h2>
      <h2 className="int">Interests:</h2>
      <div className="interests">
        {card.interests.map((interest, index) => {
          return (
            <h3 className="interest" key={index}>
              {interest}
            </h3>
          );
        })}
      </div>
      <div className="button-container">
        <a
          href={card.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          LinkedIn
        </a>
        <a
          href={card.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          twitter
        </a>
      </div>
      <p className="id">{card._id}</p>
    </div>
  );
}
