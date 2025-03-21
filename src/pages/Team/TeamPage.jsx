import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useUser } from "../../context/user.context";
import playerService from "../../services/player.service";
import { Card, CardContent, Typography, Container, Box, Button, TextField, Modal, MenuItem, Grid2 } from "@mui/material";
import { useTeam } from "../../context/team.context";
import Chatbot from "../../components/Chatbot"

const TeamPage = () => {
  const { teamId } = useParams();
  const { user } = useUser();
  const { team, setTeam, players, setPlayers } = useTeam();
  const [openModal, setOpenModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState({name: "", age: "", position: "", team: ""});

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamId) {
        console.error("No se encontró un teamId en la URL");
        return;
      }

      try {
        const response = await teamService.getTeamById(teamId);
        setTeam(response.data); // Actualiza el equipo en el contexto
        setPlayers(response.data.players || []); // Actualiza los jugadores en el contexto
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [teamId, setTeam, setPlayers]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleCreatePlayer = async () => {
    if (!team || !team._id) {
      console.error("Error: El equipo no tiene un ID válido.");
      return;
    }

    const newPlayerData = {
      ...newPlayer, team: team._id};

    try {
      const createdPlayer = await playerService.createPlayer(newPlayerData);
      console.log("Jugador creado con éxito:", createdPlayer);
      // Agrega el nuevo jugador directamente al estado
      setPlayers((prevPlayers) => [...prevPlayers, createdPlayer]);
      // Cierra el modal y limpia el formulario
      setOpenModal(false);
      setNewPlayer({ name: "", age: "", position: "", team: "" });
    } catch (error) {
      console.error("Error al crear el jugador:", error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      await playerService.deletePlayer(playerId);
      const updatedPlayers = players.filter((player) => player._id !== playerId);
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error("Error al eliminar el jugador:", error);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box mt={7} mb={7}>
          <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)" }}>
            <CardContent>
              {team ? (
                <Typography variant="h4" mb={5} gutterBottom>{team.name}</Typography>
              ) : (
                <Typography variant="body1">Cargando equipo...</Typography>
              )}
              {user?.role === "Analyst" && (
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ bgcolor: "#2d8384" }}>
                  Añadir Jugadores
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
            <Typography variant="h6" gutterBottom>Añadir Nuevo Jugador</Typography>
            <TextField fullWidth label="Nombre" name="name" value={newPlayer.name} onChange={handleInputChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Edad" name="age" type="number" value={newPlayer.age} onChange={handleInputChange} sx={{ mb: 2 }} />
            <TextField fullWidth select label="Posición" name="position" value={newPlayer.position} onChange={handleInputChange} sx={{ mb: 2 }}>
              <MenuItem value="Delantero">Delantero</MenuItem>
              <MenuItem value="Centrocampista">Centrocampista</MenuItem>
              <MenuItem value="Defensa">Defensa</MenuItem>
              <MenuItem value="Portero">Portero</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleCreatePlayer}>Guardar</Button>
          </Box>
        </Modal>
      </Container>

      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" sx={{mb:7, mt: 4, width: "100%" }}>
          {players && players.length > 0 ? (
            <Grid2 container spacing={3} justifyContent="center">
              {players.map((player) => (
                <Grid2 item xs={12} sm={6} md={3} key={player._id}>
                  <Card sx={{ padding: 0, textAlign: "center", boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%", width: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "scale(1.05)", boxShadow: 20 } }}>
                    <CardContent>
                      <Typography variant="h6" mb={1}>{player.name}</Typography>
                      <Typography variant="body1" mb={1}>{player.age} años</Typography>
                      <Typography variant="body1">{player.position}</Typography>
                      {user?.role === "Analyst" && (
                        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => handleDeletePlayer(player._id)}>
                        Eliminar
                      </Button>
                      )}    
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Box display="flex" justifyContent="center" mt={3}>
              <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 3 }}>
                <CardContent>
                  <Typography variant="h5" textAlign="center">
                    No hay jugadores en este equipo
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Container>
      {/* Integrar el Chatbot */}
      <Container maxWidth="md">
        <Chatbot />
      </Container>
    </>
  );
};

export default TeamPage;
