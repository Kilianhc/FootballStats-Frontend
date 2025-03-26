import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useUser } from "../../context/user.context";
import playerService from "../../services/player.service";
import { Card, CardContent, Typography, Container, Box, Button, TextField, Modal, MenuItem, Grid2 } from "@mui/material";
import { useTeam } from "../../context/team.context";
import Chatbot from "../../components/Chatbot"
import AddPlayerModal from "./components/AddPlayerModal";
import PlayerList from "./components/PlayerList";

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
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ bgcolor: "#2d8384" }}>
                  Añadir Jugadores
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" width="100%" sx={{ mb: 12, mt: 4 }}>
          {players.length > 0 ? <PlayerList players={players} user={user} onDelete={handleDeletePlayer} /> : <Typography variant="h5">No hay jugadores en este equipo</Typography>}
        </Box>
      </Container>
      <Container maxWidth="md">
        <Chatbot />
      </Container>
      <AddPlayerModal open={openModal} onClose={() => setOpenModal(false)} newPlayer={newPlayer} onChange={handleInputChange} onSave={handleCreatePlayer} />
    </>
  );
};

export default TeamPage;
