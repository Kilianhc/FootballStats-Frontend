import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";

const TeamPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

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
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [teamId]);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Equipo
            </Typography>
            {team ? (
              <>
                <Typography variant="h6"><strong>Nombre:</strong> {team.name}</Typography>
                <Typography variant="h6"><strong>Descripción:</strong> {team.description}</Typography>
              </>
            ) : (
              <Typography variant="body1">Cargando equipo...</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TeamPage;
