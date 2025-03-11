import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playerService from "../../services/player.service";
import statsService from "../../services/stats.service";
import {
  Typography, Box, CircularProgress, Container, Card, CardContent, Button, Grid2, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

const StatsPage = () => {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("Todos los jugadores"); // Estado para el filtro

  // Estado para las estadísticas
  const [newStats, setNewStats] = useState({
    matchs: 0, minutes: 0, goals: 0, asists: 0, saves: 0,
    goalsConceded: 0, cleanSheet: 0, shootsOnGoalReceived: 0, goalsShoots: 0,
    outShoots: 0, triedDribblings: 0, succesDribblings: 0, triedTackles: 0,
    succesTackles: 0, triedPass: 0, succesPass: 0, turnoversBall: 0, stealsBall: 0,
  });

  useEffect(() => {
    const fetchPlayersStats = async () => {
      try {
        const response = await playerService.getPlayersWithStats(teamId);
        setPlayers(response);
      } catch (error) {
        console.error("Error al obtener los jugadores y sus estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayersStats();
  }, [teamId]);

  const handleEditStats = (player) => {
    setSelectedPlayer(player);
    setNewStats({
      matchs: player.stats?.matchs || 0, minutes: player.stats?.minutes || 0,
      goals: player.stats?.goals || 0, asists: player.stats?.asists || 0,
      saves: player.stats?.saves || 0, goalsConceded: player.stats?.goalsConceded || 0,
      cleanSheet: player.stats?.cleanSheet || 0, shootsOnGoalReceived: player.stats?.shootsOnGoalReceived || 0,
      goalsShoots: player.stats?.goalsShoots || 0, outShoots: player.stats?.outShoots || 0,
      triedDribblings: player.stats?.triedDribblings || 0, succesDribblings: player.stats?.succesDribblings || 0,
      triedTackles: player.stats?.triedTackles || 0, succesTackles: player.stats?.succesTackles || 0,
      triedPass: player.stats?.triedPass || 0, succesPass: player.stats?.succesPass || 0,
      turnoversBall: player.stats?.turnoversBall || 0, stealsBall: player.stats?.stealsBall || 0,
    });
    setOpen(true);
  };

  const handleSaveStats = async () => {
    try {
      await statsService.updateStat(selectedPlayer._id, newStats);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar las estadísticas:", error);
    }
  };

  // Función para filtrar jugadores según la posición seleccionada
  const filteredPlayers = players.filter((player) => {
    if (filter === "Todos los jugadores") return true;
    if (filter === "Avanzada") return true; // Placeholder para futuras modificaciones
    return player.position === filter;
  });

  return (
    <>
      <Container maxWidth="md">
        <Box mt={7} mb={3}>
          <Card sx={{ padding: 4, boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>Estadísticas de Jugadores</Typography>
              {/* Select para filtrar jugadores */}
              <FormControl fullWidth color="white" sx={{ mt: 2}} >
                <InputLabel>Filtrar por posición</InputLabel>
                <Select sx={{borderRadius:"20px", bgcolor:"#52eef0"}} value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <MenuItem value="Todos los jugadores">Todos los jugadores</MenuItem>
                  <MenuItem value="Portero">Porteros</MenuItem>
                  <MenuItem value="Defensa">Defensas</MenuItem>
                  <MenuItem value="Centrocampista">Centrocampistas</MenuItem>
                  <MenuItem value="Delantero">Delanteros</MenuItem>
                  <MenuItem value="Avanzada">Avanzada</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Container maxWidth="xl">
        {filteredPlayers.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 3 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">No hay jugadores en esta categoría.</Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box mt={5} mb={5} textAlign="center">
            <Grid2 container spacing={3} justifyContent="center">
              {filteredPlayers.map((player) => (
                <Grid2 item xs={12} sm={6} md={2.4} key={player._id}>
                  <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 2 }}>
                    <CardContent>
                      <Typography variant="h6" mb={1}>{player.name}</Typography>
                      {Object.keys(newStats).map((stat) => (
                        <Typography key={stat} variant="body1" mb={1}>
                          {stat.replace(/([A-Z])/g, " $1")}: {player.stats?.[stat] || 0}
                        </Typography>
                      ))}
                      <Button color="primary" variant="contained" sx={{ bgcolor:"#135d5e"}} onClick={() => handleEditStats(player)}>Editar Estadísticas</Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        )}

        {/* Modal para editar estadísticas */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Editar Estadísticas de {selectedPlayer?.name}</DialogTitle>
          <DialogContent>
            {Object.keys(newStats).map((stat) => (
              <TextField
                key={stat}
                label={stat.replace(/([A-Z])/g, " $1")}
                type="number"
                value={newStats[stat]}
                onChange={(e) => setNewStats({ ...newStats, [stat]: e.target.value })}
                fullWidth
                margin="normal"
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Cancelar</Button>
            <Button onClick={handleSaveStats} color="primary">Guardar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default StatsPage;

