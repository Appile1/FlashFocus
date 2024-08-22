import React, { useState } from "react";
import "../Flashcards/flashcard.css";
const FlashCards = ({ cardFront, cardBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p>{cardFront}</p>
        </div>
        <div className="flip-card-back">
          <p>{cardBack}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
