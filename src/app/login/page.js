"use client";
import "./login.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoggleProvider, db, auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const defaultTheme = createTheme();

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    // name: "", // Commented out name field for sign up
  });
  // const [profilePic, setProfilePic] = useState(null); // Commented out profile picture handling
  const router = useRouter(); // Use useRouter from next/navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setProfilePic(e.target.files[0]);
  // };

  const SigninWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      console.log(loginData);
      router.push("/"); // Redirect to home on successful login
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const SignGoogle = async () => {
    try {
      await signInWithPopup(auth, GoggleProvider);
      router.push("/"); // Redirect to home on successful login
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      router.push("/");

      // Commented out profile picture upload and update profile
      // if (profilePic) {
      //   const storageRef = ref(storage, `profile_pics/${res.user.uid}`);
      //   const uploadTask = uploadBytesResumable(storageRef, profilePic);

      //   uploadTask.on(
      //     "state_changed",
      //     (error) => {
      //       console.error("Storage Error:", error);
      //     },
      //     async () => {
      //       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      //       await updateProfile(res.user, {
      //         displayName: loginData.name,
      //         photoURL: downloadURL,
      //       });

      //       await setDoc(doc(db, "Users", res.user.uid), {
      //         Name: res.user.displayName,
      //         uid: res.user.uid,
      //         email: res.user.email,
      //         photoURL: res.user.photoURL,
      //       });

      //       await setDoc(doc(db, "userChats", res.user.uid), {});
      //       router.push("/"); // Redirect to home on successful sign-up
      //     }
      //   );
      // } else {
      //   await updateProfile(res.user, {
      //     displayName: loginData.name,
      //   });

      //   await setDoc(doc(db, "Users", res.user.uid), {
      //     Name: res.user.displayName,
      //     uid: res.user.uid,
      //     email: res.user.email,
      //   });

      //   await setDoc(doc(db, "userChats", res.user.uid), {});
      //   router.push("/"); // Redirect to home on successful sign-up
      // }
    } catch (error) {
      console.error("Sign Up Error:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      handleSignUp(event);
    } else {
      SigninWithEmail();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" color="white">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isSignUp && (
              // Commented out name field for sign up
              // <TextField
              //   margin="normal"
              //   required
              //   fullWidth
              //   id="name"
              //   label="Name"
              //   name="name"
              //   autoComplete="name"
              //   autoFocus
              //   value={loginData.name}
              //   onChange={handleInputChange}
              // />
              <></>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={loginData.email}
              onChange={handleInputChange}
              className="email"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white", // Change label color
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white", // Change label color
                },
              }}
            />
            {isSignUp && (
              // Commented out profile picture upload button
              // <Button
              //   fullWidth
              //   variant="contained"
              //   sx={{ mt: 3, mb: 2 }}
              //   component="label"
              // >
              //   Upload Profile Picture
              //   <input
              //     type="file"
              //     hidden
              //     onChange={handleFileChange}
              //   />
              // </Button>
              <></>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={SignGoogle}
            >
              {isSignUp ? "Sign Up with Google" : "Log In with Google"}
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="#"
                  className="link"
                  variant="body2"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
