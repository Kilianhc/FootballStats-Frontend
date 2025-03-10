import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
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
        <Typography variant="h2" fontWeight="bold">
          FootballStats
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Analiza el rendimiento de tus jugadores con estadísticas detalladas.
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            bgcolor: "#2d8384",
            transition: "transform 0.2s, background-color 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              bgcolor: "#3bb9bb",
            },
          }}
        >
          Empezar
        </Button>
      </Box>
  );
}

export default HomePage;