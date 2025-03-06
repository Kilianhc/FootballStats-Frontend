import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Box, Button, TextField, Typography } from "@mui/material";
import backgroundImage from "../../assets/fondo.jpg";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  /* const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value); */

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => setErrorMessage(error.response.data.message));
  };

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
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
            Entrar
          </Button>
        </form>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta? <Link to="/signup" style={{ color: "#90caf9" }}>Regístrate</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;