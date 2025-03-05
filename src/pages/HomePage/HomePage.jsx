import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/fondo.jpg";

function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 3
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
      >
        Empezar
      </Button>
    </Box>
  );
}

export default HomePage;
