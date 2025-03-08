import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import playerService from "../../services/player.service";
import { Card, CardContent, Typography, Container, Box, Button, TextField, Modal, MenuItem } from "@mui/material";

const TeamPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
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
        setTeam(response.data);

        // Actualiza el estado newPlayer con el nombre del equipo
      setNewPlayer((prevState) => ({
        ...prevState,
        team: response.data.name, // Usa el nombre del equipo
      }));
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [teamId]);

  // Obtener los jugadores del equipo al cargar la página
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await playerService.getPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };

    fetchPlayers();
  }, []);

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

  // Crear un nuevo jugador
  const handleCreatePlayer = async () => {
    try {
      const createdPlayer = await playerService.createPlayer(newPlayer);
      if (createdPlayer) {
        setPlayers([...players, createdPlayer]); // Añadir el nuevo jugador al estado
        setNewPlayer({ name: "", age: "", position: "", team: team.name }); // Resetear el formulario
        handleCloseModal(); // Cerrar el modal
      }
    } catch (error) {
      console.error("Error al crear el jugador:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} mb={5} >
        <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(255, 255, 255, 0.7)"}}>
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
          
       {/* Lista de jugadores del equipo */}
       <Box sx={{ mt: 4 }}> 
        <Typography variant="h4" mb={5} gutterBottom>Jugadores del Equipo</Typography>
        {players.length > 0 ? (
          players.map((player) => (
            <Box key={player._id} display="flex" justifyContent="space-around" sx={{ mb: 2, p: 2, borderTop: 1 }}>
              <Typography variant="h6">
                {player.name}
              </Typography>
              <Typography variant="h6">
                {player.age} años
              </Typography>
              <Typography variant="h6">
                {player.position}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No hay jugadores en este equipo.</Typography>
        )}
       </Box>
        </Card>
        
      </Box>
        
        {/* Modal para añadir jugadores */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4}}>
          <Typography variant="h6" gutterBottom>Añadir Nuevo Jugador</Typography>
          <TextField fullWidth label="Nombre" name="name" value={newPlayer.name} onChange={handleInputChange} sx={{ mb: 2 }}/>
          <TextField fullWidth label="Edad" name="age" type="number" value={newPlayer.age} onChange={handleInputChange} sx={{ mb: 2 }}/>
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
  );
};

export default TeamPage;
