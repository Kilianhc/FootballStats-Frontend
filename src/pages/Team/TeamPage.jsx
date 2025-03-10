import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useUser } from "../../context/user.context";
import playerService from "../../services/player.service";
import { Card, CardContent, Typography, Container, Box, Button, TextField, Modal, MenuItem, Grid2 } from "@mui/material";
import { useTeam } from "../../context/team.context";

const TeamPage = () => {
  const { teamId } = useParams();
  const { user } = useUser();
  const {team, setTeam, players, setPlayers} = useTeam(null);
  const [openModal, setOpenModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    age: "",
    position: "",
    team: "",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamId) {
        console.error("No se encontró un teamId en la URL");
        return;
      }

      try {
        const response = await teamService.getTeamById(teamId);
        console.log("Equipo recibido:", response.data);
        setTeam(response.data); // Asigna el equipo

        // Ya no es necesario manejar los jugadores desde localStorage
        /* setPlayers(response.data.players); */ // Asigna los jugadores del equipo
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [teamId]);
  
  // Obtener los jugadores del equipo al cargar la página
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!teamId) return; // No hacer nada si no tenemos teamId
  
      try {
        // Solicita los jugadores directamente desde la API
        const playersData = await playerService.getPlayers(teamId);
        setPlayers(playersData); // Asigna los jugadores obtenidos de la API
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };
  
    fetchPlayers();
  }, [teamId]); // Dependencia de `teamId`
  
  

  // Abrir el modal para añadir un jugador
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Manejar cambios en los campos del formulario
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
      ...newPlayer,
      team: team._id,
    };
  
    console.log("Datos enviados al backend:", newPlayerData);
  
    try {
      await playerService.createPlayer(newPlayerData);
      console.log("Jugador creado con éxito.");
  
      // Después de crear el jugador, puedes hacer una nueva solicitud a la API para obtener la lista actualizada de jugadores
      const playersData = await playerService.getPlayers(team._id);
      setPlayers(playersData); // Actualiza los jugadores con los datos más recientes
  
      // También puedes optar por agregar el nuevo jugador directamente al estado si prefieres no hacer la llamada de nuevo
      // setPlayers((prevPlayers) => [...prevPlayers, newPlayerData]);
  
    } catch (error) {
      console.error("Error al crear el jugador:", error);
    }
  };
  
  
  
  
  

  // Eliminar un jugador
  const handleDeletePlayer = async (playerId) => {
    try {
      await playerService.deletePlayer(playerId); // Llama al servicio para eliminar el jugador
      const updatedPlayers = players.filter((player) => player._id !== playerId); // Actualiza el estado eliminando el jugador
      setPlayers(updatedPlayers); // Actualiza el estado con los jugadores restantes
    } catch (error) {
      console.error("Error al eliminar el jugador:", error);
    }
  };
  

  return (
    <>
      <Container maxWidth="md">
        <Box mt={5} mb={5} >
          <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)"}}>
            <CardContent>
              {team ? (
                <>
                  <Typography variant="h4" mb={5} gutterBottom>Equipo: {team.name}</Typography>
                </>
              ) : (
                <Typography variant="body1">Cargando equipo...</Typography>
              )}
              {/* Botón para añadir jugadores */}
              <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Añadir Jugadores
              </Button>
            </CardContent>
          </Card>
        </Box>
        {/* Modal para añadir jugadores */}
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
      <Container>
        {/* Lista de jugadores del equipo */}
        <Box sx={{ mt: 4 }}>
          {players && players.length > 0 ? (
            <Grid2 container spacing={3}>
              {players.filter((player) => player !== null && player !== undefined).map((player) => (
                <Grid2 item xs={12} sm={6} md={3} key={player._id}>
                  {/* Card de jugador, con el mismo estilo que la Card del equipo */}
                  <Card sx={{ padding: 0, textAlign: "center", boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)",
                  height: "100%", width: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {transform: "scale(1.05)", boxShadow: 20 }}}>
                    <CardContent>
                      <Typography variant="h6" mb={1}>{player.name}</Typography>
                      <Typography variant="body1" mb={1}>{player.age} años</Typography>
                      <Typography variant="body1">{player.position}</Typography>
                      {/* Botón para eliminar jugador */}
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleDeletePlayer(player._id)} // Llama a la función para eliminar el jugador
                      >
                        Eliminar
                      </Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Typography variant="body1" color="rgba(0, 255, 255)">No hay jugadores en este equipo.</Typography>
          )}
        </Box>
      </Container >
    </>
  );
};

export default TeamPage;
