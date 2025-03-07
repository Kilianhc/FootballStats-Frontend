import { useEffect } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { Typography, Box } from "@mui/material";
import { useTeam } from "../../context/team.context";

function TeamPage() {
  const { team, setTeam } = useTeam(); // Usa el contexto del equipo
  const { teamId } = useParams(); // Obtener el ID del equipo de la URL

  useEffect(() => {
    console.log("teamId en TeamPage:", teamId); // 👀 Verifica el teamId
    if (teamId) {
      // Obtener los datos del equipo
      teamService.getTeamById(teamId)
        .then(response => {
          console.log("Datos del equipo recibidos:", response.data); // 👀 Verifica los datos  
          setTeam(response.data); // Actualizar el estado con los datos del equipo
        })
        .catch(error => {
          console.error("Error fetching team:", error);
        });
    } else {
      console.error("teamId es undefined");
    }
  }, [teamId, setTeam]);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4">Página del Equipo</Typography>
      {team ? (
        <Typography variant="h5">Equipo: {team.name}</Typography>
      ) : (
        <Typography variant="h5">Cargando...</Typography>
      )}
    </Box>
  );
}

export default TeamPage;