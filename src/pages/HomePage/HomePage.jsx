import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

function HomePage() {
  return (
    <>
    <Box
      sx={{
        position: "relative", // Contenido en posición relativa
        zIndex: 2, // Asegura que el contenido esté por encima del fondo
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 3,
      }}
    >
      <Box
      mt={-20}
  component="img"
  src={logo}
  alt="FootballStats Logo"
  sx={{
    width: 450, 
    height: "auto",
    mb: 2,
    border: "none",
    filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))", // Efecto de brillo difuso
    opacity: 0.3, // Hace que el logo se mezcle un poco con el fondo
  }}
/>
      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          padding: 2,
          bgcolor: "#2d8384",
          transition: "transform 0.2s, background-color 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            bgcolor: "#3bb9bb",
          },
        }}
      >
        Mejora el rendimiento de tu Equipo
      </Button>
    </Box></>
  );
}

export default HomePage;