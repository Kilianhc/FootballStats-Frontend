import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import backgroundImage from "../../assets/bj2.jpeg";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // Estado para el rol
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /* const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value); */

// Manejar el registro del usuario
const handleSignupSubmit = (e) => {
  e.preventDefault();
  const requestBody = { email, password, name, role };

  authService
    .signup(requestBody)
    .then(() => navigate("/login"))
    .catch((error) => {
      setErrorMessage(error.response?.data?.message || "Error en el registro");
    });
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
        Crear Cuenta
      </Typography>
      <form onSubmit={handleSignupSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2, background: "white", borderRadius: "5px" }}
        />
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

        {/* Select para elegir rol */}
        <FormControl fullWidth sx={{ mt: 2, background: "white", borderRadius: "5px" }}>
          <InputLabel>Rol</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#2d8384", transition: "transform 0.2s, background-color 0.2s", "&:hover": {
      transform: "scale(1.05)", bgcolor: "#3bb9bb"} }} type="submit">
          Registrarse
        </Button>
      </form>

      {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta? <Link to="/login" style={{ color: "#52eef0" }}>Inicia sesión</Link>
      </Typography>
    </Box>
  </Box>
);
}

export default SignupPage;