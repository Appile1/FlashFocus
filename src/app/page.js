"use client";
import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Flashcard from "@/components/Flashcards/Flashcard";
import { AuthContext } from "../components/authContext.js";
import "./page.css";

export default function ChatArea() {
  const [inputValue, setInputValue] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const systemPrompt = ` Create 10 flashcards based on the following text, focusing on the most important concepts, definitions, and questions. Each flashcard should be formatted as an object in a JSON array with the following properties:

id: A unique identifier for the card (e.g., card1, card2, etc.).
cardFront: A concise, clear question, term, or concept. This should be something that prompts the learner to recall key information.
cardBack: A detailed explanation, definition, or answer that directly addresses the content on the front of the card. Ensure the explanation is clear, accurate, and provides any necessary context or examples.
Guidelines for creating the best flashcards:

Focus on key concepts and terms that are essential for understanding the topic.
Ensure questions are direct and encourage active recall.
Provide concise yet comprehensive answers or explanations on the back.
Include examples or additional context if it helps clarify the concept.
Avoid overly complex or ambiguous wording; aim for clarity and simplicity.
Please generate the flashcards in the JSON array format with no additional text.`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              { role: "user", content: inputValue },
            ],
          }),
        });

        const data = await response.json();
        const parsedData = JSON.parse(data.message);
        setFlashcards(parsedData);
      } catch (error) {
        console.error("Error:", error);
        // Optionally handle the error state
      }

      setInputValue(""); // Clear input field after submission
    }
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Generate Flashcards
        </Typography>
        <Typography variant="body1" paragraph>
          Enter text to generate flashcards with key concepts and definitions.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} className="input-form">
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Generate Flashcards
        </Button>
      </form>
      <Box mt={4} className="flashcard-container">
        {flashcards.length > 0 ? (
          flashcards.map((card, index) => (
            <Flashcard
              key={index}
              cardFront={card.cardFront}
              cardBack={card.cardBack}
            />
          ))
        ) : (
          <Typography variant="body1" textAlign="center">
            No flashcards available. Please enter some text to generate them.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
