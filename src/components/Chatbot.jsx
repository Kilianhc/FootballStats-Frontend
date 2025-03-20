import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useTeam } from "../context/team.context"; 
import { Box, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

const Chatbot = () => {
  const [prompt, setPrompt] = useState(""); // Estado para el input del usuario
  const [response, setResponse] = useState(""); // Estado para la respuesta de Gemini
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const { user } = useContext(AuthContext);
  const { team } = useTeam(); // Obtener el equipo actual

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obtener el token JWT del localStorage
      const token = localStorage.getItem("authToken");

      // Hacer la solicitud al backend
      const res = await axios.post(
        `${API_URL}/api/ai/recommendations`,
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extraer la respuesta de Gemini
      const geminiResponse = res.data.candidates[0].content.parts[0].text;
      setResponse(geminiResponse);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      setResponse("Hubo un error al procesar tu solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{mb:4, mt: 4, p: 3, boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)" }}>
      <Typography variant="h5" gutterBottom>
        Chatbot de Análisis Deportivo
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escribe tu pregunta..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </Box>
      </form>

      {response && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Respuesta:</Typography>
          <Card sx={{ mt: 1, p: 2, backgroundColor: "lightblue", borderRadius:5 }}>
            <Typography>{response}</Typography>
          </Card>
        </Box>
      )}
    </Card>
  );
};

export default Chatbot;