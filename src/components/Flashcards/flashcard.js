"use client";
import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import "./Flashcard.css";
const flip = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const flipBack = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0);
  }
`;

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
      <Paper elevation={3} className="flashcard-inner">
        <div className="flashcard-front">
          <Typography variant="h6">{cardFront}</Typography>
        </div>
        <div className="flashcard-back">
          <Typography variant="h6">{cardBack}</Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Flashcard;
