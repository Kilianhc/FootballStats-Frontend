import React, { useEffect, useState } from "react";
import userService from "../../services/user.service";
import teamService from "../../services/team.service"; // Importamos la función para obtener equipo
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import EditProfileButton from "./DashboardComponents/EditProfileButton";
import DeleteAccountButton from "./DashboardComponents/DeleteAccountButton";

const ProfilePage = ({ onOpenEdit, onOpenDelete }) => {
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState("Cargando..."); // Estado para el nombre del equipo

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        console.log("Perfil del usuario recibido:", response);
        setUser(response.data);

        // Si el usuario tiene un equipo, obtener los detalles del equipo
        if (response.data.team) {
          const teamResponse = await teamService.getTeamById(response.data.team);
          setTeamName(teamResponse.data.name);
        } else {
          setTeamName("No asignado");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            {user ? (
              <>
                <Typography variant="h4" gutterBottom>{user.name}</Typography>
                <Typography variant="h6">{user.email}</Typography>
                <Typography variant="h6">{user.role}</Typography>
                <Typography variant="h6">{user.team ? teamName : "Sin equipo"}</Typography>
                {/* Botones de editar y eliminar */}
                <Box mt={3} display="flex">
                  <EditProfileButton onOpenEdit={onOpenEdit} />
                  <DeleteAccountButton onOpenDelete={onOpenDelete} />
                </Box>
              </>
            ) : (
              <Typography variant="body1">Cargando perfil...</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfilePage;
