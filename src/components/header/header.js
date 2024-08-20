"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../authContext.js";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase.js"; // Import Firebase auth

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import AnimeIcon from "@mui/icons-material/EmojiEmotions"; // Example anime icon
import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";

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
        backgroundColor: "#162447",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        padding: "15px 0",
        height: "80px", // Increased height
        animation: "fadeIn 2s ease-in",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h4" // Increased font size
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#e43f5a",
                animation: "bounce 2s infinite",
              }}
            >
              <AnimeIcon
                sx={{
                  mr: 1,
                  fontSize: "3rem",
                  animation: "bounce 2s infinite",
                }}
              />{" "}
              {/* Larger icon */}
              Otaku Sensei
            </Typography>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
