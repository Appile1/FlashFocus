"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import "./page.css"; // Import the CSS file

// Typing animation component
const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className="typing-animation">{displayedText}</p>;
};

const Page = () => {
  const router = useRouter(); // Initialize useRouter
  const handleGetStarted = () => {
    router.push("/generate"); // Redirect to /generate page
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>FlashFocus</h1>
        <TypingAnimation
          text="AI-generated flashcards based on your text. Authentication with Clerk. Powered by Llama 3.1."
          speed={50}
        />
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="cards1">
        <div className="card1 free">
          <h2>Free Version</h2>
          <ul>
            <li>Generate basic flashcards from your text</li>
            <li>Access to fundamental AI features</li>
            <li>Simple user authentication with Clerk</li>
          </ul>
          <button className="price-button free">Free</button>
        </div>
        <div className="card1 pro">
          <h2>Pro Version</h2>
          <ul>
            <li>Generate unlimited flashcards with advanced AI</li>
            <li>Enhanced AI capabilities for more accurate flashcards</li>
            <li>Priority support and faster updates</li>
            <li>Customizable flashcard templates and features</li>
          </ul>
          <button className="price-button pro">$5</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
