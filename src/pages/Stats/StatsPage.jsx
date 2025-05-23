import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playerService from "../../services/player.service";
import statsService from "../../services/stats.service";
import { useUser } from "../../context/user.context";
import {Typography, Box, Container, Card, CardContent, Button, MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdvancedStatsPage from "./AdvancedStatsPage"
import Chatbot from "../../components/Chatbot"
import EditStatsDialog from "./components/EditStatsDialog";

const StatsPage = () => {
  const { user } = useUser();
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("Todos los jugadores");
  const [newStats, setNewStats] = useState({
    matchs: 0, minutes: 0, goals: 0, asists: 0, saves: 0, goalsConceded: 0,
    cleanSheet: 0, shootsOnGoalReceived: 0, goalsShoots: 0, outShoots: 0, triedDribblings: 0, succesDribblings: 0,
    triedTackles: 0, succesTackles: 0, triedPass: 0, succesPass: 0, turnoversBall: 0, stealsBall: 0
  });

  useEffect(() => {
    console.log("teamId ha cambiado:", teamId);
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

    if (teamId) {
      fetchPlayersStats();
    }
  }, [teamId]);

  const handleEditStats = (player) => {
    setSelectedPlayer(player);
    setNewStats({
      matchs: 0, minutes: 0, goals: 0, asists: 0, saves: 0, goalsConceded: 0, cleanSheet: 0,
      shootsOnGoalReceived: 0, goalShoots: 0, outShoots: 0, triedDribblings: 0, succesDribblings: 0, triedTackles: 0,
      succesTackles: 0, triedPass: 0, succesPass: 0, turnoversBall: 0, stealsBall: 0
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

  const filteredPlayers = players.filter((player) => {
    if (filter === "Todos los jugadores") return true;
    if (filter === "Avanzada") return true;
    return player.position === filter;
  });

  const statTranslations = {
    matchs: "Partidos", minutes: "Minutos", goals: "Goles", asists: "Asistencias",
    saves: "Paradas", goalsConceded: "Goles Concedidos", cleanSheet: "Portería a Cero", shootsOnGoalReceived: "Tiros Recibidos",
    goalShoots: "Tiros a Portería", outShoots: "Tiros Fuera", triedDribblings: "Regates Intentados", succesDribblings: "Regates Exitosos",
    triedTackles: "Entradas Intentadas", succesTackles: "Entradas Exitosas", triedPass: "Pases Intentados",
    succesPass: "Pases Exitosos", turnoversBall: "Pérdidas de Balón", stealsBall: "Robos de Balón"
  };
  // Configuración del carrusel con react-slick
  const sliderSettings = {
    dots: false, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1,
    arrows: true, responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  };

  return (
    <>
      <Container maxWidth="md">
        <Box mt={7} mb={3}>
          <Card sx={{ padding: 4, boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>Estadísticas de Jugadores</Typography>
              <FormControl fullWidth color="white" sx={{ mt: 2 }}>
                <InputLabel>Filtrar por posición</InputLabel>
                <Select sx={{ borderRadius: "20px", bgcolor: "#52eef0" }} value={filter} onChange={(e) => setFilter(e.target.value)}>
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
        {filter === "Avanzada" ? (
          <AdvancedStatsPage players={players} />
        ) : (
          filteredPlayers.length === 0 ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <Card sx={{ boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 3 }}>
                <CardContent>
                  <Typography variant="h5" textAlign="center">No hay jugadores en esta categoría.</Typography>
                </CardContent>
              </Card>
            </Box>
          ) : (
            <Box mt={5} mb={20}>
              {/* Mostrar carrusel solo si hay más de 4 jugadores */}
              {filteredPlayers.length > 4 ? (
                <Slider {...sliderSettings}>
                  {filteredPlayers.map((player) => (
                    <Box key={player._id} sx={{ padding: 1 }}>
                      <Card sx={{ width: "300px", boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 3.8 }}>
                        <CardContent>
                          <Typography variant="h6" mb={1}>{player.name}</Typography>
                          {Object.entries(player.stats)  // Usamos Object.entries para obtener claves y valores
                            .filter(([key]) => !["_id", "createdBy", "__v"].includes(key))  // Filtrar los campos no deseados
                            .filter(([key, value]) => typeof value === 'number')  // Filtrar los campos con valores numéricos
                            .filter(([key]) =>
                              player.position === "Portero"
                                ? ["matchs", "minutes", "saves", "goalsConceded", "cleanSheet", "shootsOnGoalReceived", "triedPass", "succesPass"].includes(key)
                                : !["saves", "goalsConceded", "cleanSheet", "shootsOnGoalReceived"].includes(key)
                            )
                            .map(([stat, value]) => {
                              const statNameInSpanish = statTranslations[stat] || stat; // Si no hay traducción, se usa el nombre original
                              const statValue = value || 0; // Si el valor no existe, usar 0
                              return (
                                <Typography key={stat} variant="body1" mb={1}>
                                  {statNameInSpanish}: {statValue}
                                </Typography>
                              );
                            })}
                          {user?.role === "Analyst" && (
                            <Button color="primary" variant="contained" sx={{ bgcolor: "#135d5e" }} onClick={() => handleEditStats(player)}>
                              Editar Estadísticas
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Slider>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                  {filteredPlayers.map((player) => (
                    <Card key={player._id} sx={{ width: "300px", boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", padding: 2 }}>
                      <CardContent>
                        <Typography variant="h6" mb={1}>{player.name}</Typography>
                        {Object.entries(player.stats)  
                          .filter(([key]) => !["_id", "createdBy", "__v"].includes(key))  
                          .filter(([key, value]) => typeof value === 'number') 
                          .filter(([key]) =>
                            player.position === "Portero"
                              ? ["matchs", "minutes", "saves", "goalsConceded", "cleanSheet", "shootsOnGoalReceived", "triedPass", "succesPass"].includes(key)
                              : !["saves", "goalsConceded", "cleanSheet", "shootsOnGoalReceived"].includes(key)
                          )
                          .map(([stat, value]) => {
                            const statNameInSpanish = statTranslations[stat] || stat; 
                            const statValue = value || 0; 
                            return (
                              <Typography key={stat} variant="body1" mb={1}>
                                {statNameInSpanish}: {statValue}
                              </Typography>
                            );
                          })}
                        {user?.role === "Analyst" && (
                          <Button color="primary" variant="contained" sx={{ bgcolor: "#135d5e" }} onClick={() => handleEditStats(player)}>
                            Editar Estadísticas
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          )
        )}
      </Container>
      {/* Diálogo de edición */}
      <EditStatsDialog open={open} onClose={() => setOpen(false)} player={selectedPlayer} newStats={newStats} setNewStats={setNewStats} onSave={handleSaveStats} />
      {/* Integrar el Chatbot */}
      <Container maxWidth="md">
        <Chatbot />
      </Container>
    </>
  );
}

export default StatsPage;
