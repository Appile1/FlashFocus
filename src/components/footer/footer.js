// Footer.js
import { Container, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1b1b2f", // Dark background for anime theme
        padding: 3,
        textAlign: "center",
        color: "#ffffff", // White text color for contrast
        borderTop: "2px solid #e43f5a", // Highlight border color
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container className="footer">
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Otaku Sensei
        </Typography>
        <Typography variant="body2">
          <Link
            href="#"
            color="inherit"
            underline="none"
            sx={{ fontSize: "0.9rem" }}
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            href="#"
            color="inherit"
            underline="none"
            sx={{ fontSize: "0.9rem" }}
          >
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
