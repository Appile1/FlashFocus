"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.js";
import { useRouter } from "next/navigation";
import Flashcard from "../../components/Flashcards/Flashcard.js";
import { Container, Typography, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const SaveFlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const flashcardId = searchParams.get("id");
  const { user } = useUser(); // Get user from context

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) return; // Handle case where user is not logged in

      setLoading(true);
      setError(null);
      try {
        const userCollectionRef = collection(db, user.id); // Use user ID for collection
        const q = query(userCollectionRef);
        const querySnapshot = await getDocs(q);

        const flashcardList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFlashcards(flashcardList);
      } catch (error) {
        setError("Failed to load flashcards.");
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [user]);

  const handleClick = (id) => {
    router.push(`/savedflashcards/${id}`); // Navigate to detailed view of flashcard
  };

  return (
    <Container>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Saved Flashcards
        </Typography>
      </Box>
      {loading ? (
        <Typography variant="body1" textAlign="center">
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="body1" color="error" textAlign="center">
          {error}
        </Typography>
      ) : flashcards.length > 0 ? (
        flashcards.map((card) => (
          <Box
            key={card.id}
            onClick={() => handleClick(card.id)}
            sx={{ cursor: "pointer", mb: 2 }}
          >
            <Typography variant="h6">{card.name}</Typography>{" "}
            {/* Display flashcard name */}
          </Box>
        ))
      ) : (
        <Typography variant="body1" textAlign="center">
          No flashcards available.
        </Typography>
      )}
    </Container>
  );
};

export default SaveFlashCard;
