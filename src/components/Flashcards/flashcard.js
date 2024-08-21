"use client";
import React, { useState } from "react";
import "./flashcard.css";

const Flashcard = ({ cardFront, cardBack }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p className="card-text">{cardFront}</p>
        </div>
        <div className="flashcard-back">
          <p className="card-text">{cardBack}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
