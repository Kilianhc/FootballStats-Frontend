import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import authService from "../../services/auth.service";
import { Box, Button, TextField, Typography } from "@mui/material";
import backgroundImage from "../../assets/bg.jpeg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser, isLoggedIn, isLoading } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  // Redirigir si el usuario ya está logueado
 /*  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile"); // Redirigir a ProfilePage si está logueado
    }
  }, [isLoggedIn, navigate]); */

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(undefined); 

    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        // Almacenar el token y autenticar al usuario
        storeToken(response.data.authToken);
        authenticateUser() // Actualiza el estado de autenticación
          .then(() => {
            // Obtener los datos del usuario después de iniciar sesión
            const userData = response.data.user;
            setUser(userData); // Actualiza los datos del usuario en el contexto

            // Redirigir inmediatamente después de un login exitoso
            navigate("/profile");
          })
          .catch((error) => {
            console.error("Error al autenticar al usuario:", error);
            setErrorMessage("Error al iniciar sesión. Inténtalo de nuevo.");
          });
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message);
      });
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes poner una pantalla de carga aquí
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: "2rem",
          borderRadius: "10px",
          width: "350px",
          textAlign: "center",
          color: "white",
          mt: -10,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLoginSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2, background: "white", borderRadius: "5px" }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2, background: "white", borderRadius: "5px" }}
          />
          <Button
            variant="contained"
            color="#2d8384"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#2d8384",
              transition: "transform 0.2s, background-color 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                bgcolor: "#3bb9bb",
              },
            }}
            type="submit"
          >
            Entrar
          </Button>
        </form>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Link to="/signup" style={{ color: "#52eef0" }}>
            Regístrate
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;