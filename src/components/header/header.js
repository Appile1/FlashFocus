"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../authContext.js";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase.js"; // Import Firebase auth

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import FlashFocusIcon from "@mui/icons-material/Star"; // Example icon for the app

import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

export default function Header() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleAuthAction = async () => {
    if (user) {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.error("Sign Out Error:", error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1a1a2e", // Dark background for contrast
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow
        padding: "0 20px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderBottom: "2px solid #e43f5a", // Highlight color
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#e43f5a", // Highlight color
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "2.5rem",
              transition: "color 0.3s, transform 0.3s",
              "&:hover": {
                color: "#f7a6b4", // Light color on hover
                transform: "scale(1.05)",
              },
            }}
          >
            <FlashFocusIcon
              sx={{
                mr: 1,
                fontSize: "3rem",
              }}
            />
            Flash Focus
          </Typography>
        </Link>

        <Button
          sx={{
            backgroundColor: "#e43f5a",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#d32f2f",
              transform: "scale(1.05)",
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
          onClick={() => router.push("/SavedFlashCards")}
        >
          Saved Flash Cards
        </Button>

        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <SignedIn>
            <UserButton
              sx={{
                backgroundColor: "#1a1a2e", // Match header background
                color: "#e43f5a", // Highlight color
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "#162447", // Darker on hover
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <Button
              sx={{
                backgroundColor: "#e43f5a",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                  transform: "scale(1.05)",
                },
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </SignedOut>
        </div>
      </Container>
    </AppBar>
  );
}
