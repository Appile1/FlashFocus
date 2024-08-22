"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.js";
import { useRouter } from "next/navigation";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import "./SavedFlashCards.css";
const SaveFlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);
      try {
        const userCollectionRef = collection(db, user.id);
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
    router.push(`/SavedFlashCards/${id}`);
  };

  const FlashcardCard = ({ card }) => {
    return (
      <div className="card" onClick={() => handleClick(card.id)}>
        <div className="content">
          <h2>{card.name}</h2>
        </div>
      </div>
    );
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
        flashcards.map((card) => <FlashcardCard key={card.id} card={card} />)
      ) : (
        <Typography variant="body1" textAlign="center">
          No flashcards available.
        </Typography>
      )}
    </Container>
  );
};

export default SaveFlashCard;
