"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import Flashcard from "../../../components/Flashcards/flashcard.js";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import "./dynamic.css";
const FlashcardDetail = ({ params }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const id = params.id;

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user && id) {
          // Reference to the specific flashcard document in user's collection
          const flashcardsDocRef = doc(db, user.id, id);

          const docSnap = await getDoc(flashcardsDocRef);

          if (docSnap.exists()) {
            // Assuming the document contains an array of flashcards
            const flashcards = docSnap.data().flashcards || [];
            setFlashcards(flashcards);
          } else {
            setError("No flashcards document found.");
          }
        }
      } catch (error) {
        setError("Failed to load flashcards.");
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [id, user]);

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Flashcard Details
        </Typography>
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : flashcards.length > 0 ? (
          <Grid container spacing={3} className="gap">
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {/* Add margin bottom for spacing */}
                <Flashcard
                  cardFront={flashcard.cardFront}
                  cardBack={flashcard.cardBack}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No flashcards available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default FlashcardDetail;
