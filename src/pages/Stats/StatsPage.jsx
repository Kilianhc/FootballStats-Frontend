import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playerService from "../../services/player.service";
import { Typography, Box, CircularProgress, Container, Card, CardContent, Button, Grid } from "@mui/material";

const StatsPage = () => {
  const { teamId } = useParams(); // Obtén el teamId desde la URL
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayersStats = async () => {
      try {
        const response = await playerService.getPlayers(teamId); // Obtén los jugadores del equipo
        setPlayers(response); // Asigna los jugadores con estadísticas
      } catch (error) {
        console.error("Error al obtener los jugadores y sus estadísticas:", error);
      } finally {
        setLoading(false); // Detén el loading una vez se obtengan los datos
      }
    };

    fetchPlayersStats();
  }, [teamId]);

  // Si hay jugadores pero no tienen estadísticas, mostrar un mensaje de "sin estadísticas"
  const renderPlayerStats = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (players.length === 0) {
      return <Typography variant="h5" align="center">No hay jugadores con estadísticas aún.</Typography>;
    }

    return (
      <Grid container spacing={3}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={3} key={player._id}>
            <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 2 }}>
              <CardContent>
                <Typography variant="h6" mb={1}>{player.name}</Typography>
                <Typography variant="body1" mb={1}>{player.position}</Typography>
                <Typography variant="body2" mb={1}>Goles: {player.stats?.goals || 0}</Typography>
                <Typography variant="body2" mb={1}>Asistencias: {player.stats?.assists || 0}</Typography>
                <Typography variant="body2" mb={1}>Partidos: {player.stats?.matchesPlayed || 0}</Typography>
                {/* Agregar más estadísticas según lo que tengas */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Estadísticas de Jugadores
        </Typography>
        {renderPlayerStats()}
      </Box>
    </Container>
  );
};

export default StatsPage;
