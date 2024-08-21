import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Flashcard from "../../components/Flashcards/Flashcard";
import { Container, Typography, Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const FlashcardDetail = () => {
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchFlashcard = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user && id) {
          // Collection named with user ID
          const userCollectionRef = doc(db, user.id, "flashcards"); // Assuming the flashcards are in a document within this collection
          const docSnap = await getDoc(userCollectionRef);

          if (docSnap.exists()) {
            // Assuming flashcards is an array in the document
            const flashcards = docSnap.data().flashcards || [];
            const selectedFlashcard = flashcards.find((card) => card.id === id);

            if (selectedFlashcard) {
              setFlashcard(selectedFlashcard);
            } else {
              setError("Flashcard not found.");
            }
          } else {
            setError("No flashcards document found.");
          }
        }
      } catch (error) {
        setError("Failed to load flashcard.");
        console.error("Error fetching flashcard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
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
        ) : flashcard ? (
          <Flashcard
            cardFront={flashcard.cardFront}
            cardBack={flashcard.cardBack}
          />
        ) : (
          <Typography variant="body1">No details available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default FlashcardDetail;
