import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

function HomePage() {
  return (
    <>
    <Box sx={{position: "relative", zIndex: 2, height: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", px: 3}}>
      <Box mt={-20} component="img" src={logo} alt="FootballStats Logo" sx={{width: 450, height: "auto", mb: 2,
      border: "none", filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))", opacity: 0.3}}/>
        {/* Texto animado */}
        <Box sx={{animation: "fadeInUp 2s ease-in-out", maxWidth: "600px", mb: 3}}>
          <Typography variant="h4" sx={{fontWeight: "bold", letterSpacing: "2px", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
          lineHeight: 1.5, color: "#ffffff", opacity: 0, animation: "fadeInUp 2s forwards"}}>
            Potencia tu análisis y optimiza a tu equipo
          </Typography>
          <Typography variant="h5" sx={{mt: 2, fontWeight: "500", fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              color: "#ffffff", opacity: 0, animation: "fadeInUp 10s 0.5s forwards"}}>
          </Typography>
        </Box>
        {/* Botón de registro */}
        <Button component={Link} to="/signup" variant="contained" color="primary" size="large"
          sx={{padding: 2, bgcolor: "#2d8384", transition: "transform 0.2s, background-color 0.2s",
            "&:hover": {transform: "scale(1.05)", bgcolor: "#3bb9bb"}, opacity: 0, animation: "fadeInUp 5s 1s forwards"}}>
          Regístrate ahora
        </Button>
      </Box>
      {/* Animaciones clave en el CSS */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default HomePage;