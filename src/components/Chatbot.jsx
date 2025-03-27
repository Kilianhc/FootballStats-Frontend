import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useTeam } from "../context/team.context";
import { Box, TextField, Button, Typography, Card, CircularProgress, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

const Chatbot = () => {
  const [prompt, setPrompt] = useState(""); // Estado para el input del usuario
  const [response, setResponse] = useState(""); // Estado para la respuesta de Gemini
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del Chatbot
  const { user } = useContext(AuthContext);
  const { team } = useTeam();

  const containsOffensiveLanguage = (text) => {
    const bannedWords = ["cabron", "gilipollas", "maricon", "retrasado", "hijo de puta", "coño", "joder"];
    return bannedWords.some(word => text.toLowerCase().includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (containsOffensiveLanguage(prompt)) {
      alert("Por favor, evita contenido ofensivo.");
      return;
    }
    setIsLoading(true);

    try {
      // Obtener el token JWT del localStorage
      const token = localStorage.getItem("authToken");
      // Hacer la solicitud al backend
      const res = await axios.post(
        `${API_URL}/api/ai/recommendations`,
        { prompt },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      // Extraer la respuesta de Gemini
      const geminiResponse = res.data.candidates[0].content.parts[0].text;
      setResponse(geminiResponse);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response?.status === 429) {
        setResponse("Has superado el límite de peticiones. Inténtalo nuevamente en 30 minutos.");
    } else {
        setResponse(error.response?.data?.error || "Hubo un error al procesar tu solicitud.");
    }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 20, zIndex: 1000, width: "30%" }}>
      {/* Pestaña del Chatbot */}
      <Card sx={{
        backgroundColor: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", borderRadius: "10px 10px 0 0",
        boxShadow: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", p: 1
      }}
        onClick={() => setIsOpen(!isOpen)}>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Chatbot de Análisis Deportivo
        </Typography>
        <IconButton>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Card>
      {/* Contenido desplegable del Chatbot */}
      <Collapse in={isOpen}>
        <Card sx={{
          backgroundColor: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", borderRadius: "0 0 10px 10px", boxShadow: 10,
          p: 2, height: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between"
        }}>
          {/* Área de mensajes */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2, p: 1, backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "5px" }}>
            {response && (
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Respuesta:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line", textAlign: "left" }}>
                  {response.replace(/\\n/g, '\n').replace(/\n\n+/g, '\n\n')}
                </Typography>
              </Box>
            )}
          </Box>
          {/* Campo de entrada y botón de enviar */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField fullWidth variant="outlined" placeholder="Escribe tu pregunta..." value={prompt} onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading} size="small" sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "5px" }} />
              <Button type="submit" variant="contained" color="primary" disabled={isLoading} sx={{ minWidth: "80px" }}>
                {isLoading ? <CircularProgress size={24} /> : "Enviar"}
              </Button>
            </Box>
          </form>
        </Card>
      </Collapse>
    </Box>
  );
};

export default Chatbot;