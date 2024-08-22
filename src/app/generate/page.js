"use client";
import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import Flashcards from "@/components/Flashcards/Flashcard.js";

import HamsterWheel from "@/components/Loading/Loading.js"; // Import HamsterWheel
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase";
import "./generate.css";

export default function ChatArea() {
  const [inputValue, setInputValue] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [openModal, setOpenModal] = useState(false);
  const [flashcardName, setFlashcardName] = useState("");
  const [saveError, setSaveError] = useState("");
  const { user } = useUser();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const systemPrompt = `Create 10 flashcards based on the following text, focusing on the most important concepts, definitions, and questions. Each flashcard should be formatted as an object in a JSON array with the following properties:
  
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
      setLoading(true); // Set loading to true when starting request
      setError(null); // Clear any previous errors

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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.message);
        setFlashcards(parsedData);
      } catch (error) {
        setError("Failed to generate flashcards. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading to false once request is complete
      }

      setInputValue(""); // Clear input field after submission
    }
  };

  const handleSaveFlashcards = async () => {
    if (flashcardName.trim() && flashcards.length > 0 && user) {
      try {
        const userCollectionRef = collection(db, user.id);
        const nameQuery = query(
          userCollectionRef,
          where("name", "==", flashcardName)
        );
        const querySnapshot = await getDocs(nameQuery);

        if (!querySnapshot.empty) {
          setSaveError("A flashcard with this name already exists.");
        } else {
          await addDoc(userCollectionRef, {
            name: flashcardName,
            flashcards,
            createdAt: new Date(),
          });
          handleCloseModal(); // Close modal after saving
          setFlashcards([]); // Clear flashcards after saving
          setFlashcardName(""); // Clear flashcard name input
          setSaveError(""); // Clear save error message
        }
      } catch (error) {
        console.error("Error saving flashcards:", error);
      }
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSaveError(""); // Clear save error message on close
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Disable button when loading
        >
          Generate Flashcards
        </Button>
      </form>

      <Box mt={4} className="flashcard-container">
        {loading ? (
          // <Box
          //   display="flex"
          //   justifyContent="center"
          //   alignItems="center"
          //   sx={{ height: "100%", width: "100%", minHeight: "200px" }} // Adjust height if necessary
          // >
          //   <HamsterWheel />
          // </Box>
          <HamsterWheel />
        ) : error ? (
          <Box textAlign="center">
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        ) : flashcards.length > 0 ? (
          <>
            {flashcards.map((card, index) => (
              <Flashcards
                key={index}
                cardFront={card.cardFront}
                cardBack={card.cardBack}
              />
            ))}

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleOpenModal}
              sx={{ mt: 4 }}
            >
              Save Flashcards
            </Button>
          </>
        ) : (
          <Typography variant="body1" textAlign="center">
            No flashcards available. Please enter some text to generate them.
          </Typography>
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="save-flashcards-modal"
        aria-describedby="modal-to-save-flashcards"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="save-flashcards-modal" variant="h6" component="h2">
            Save Flashcards
          </Typography>
          <TextField
            label="Flashcard Name"
            value={flashcardName}
            onChange={(e) => setFlashcardName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {saveError && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {saveError}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveFlashcards}
            fullWidth
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            fullWidth
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
