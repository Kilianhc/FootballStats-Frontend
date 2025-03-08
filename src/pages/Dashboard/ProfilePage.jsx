import React, { useEffect, useState, useContext } from "react";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import teamService from "../../services/team.service"; // Importamos la función para obtener equipo
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import EditProfileButton from "./DashboardComponents/EditProfileButton";
import DeleteAccountButton from "./DashboardComponents/DeleteAccountButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { AuthContext } from "../../context/auth.context";

const ProfilePage = ({ onOpenEdit, onOpenDelete }) => {
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState("Cargando..."); // Estado para el nombre del equipo
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo de confirmación
  const { logOutUser } = useContext(AuthContext); // Para cerrar sesión
  const navigate = useNavigate();

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

  // Manejar eliminación de cuenta
  const handleDeleteAccount = async () => {
    try {
      await userService.deleteUserAccount(); // Llamamos a la API para eliminar el usuario
      logOutUser(); // Cerramos sesión
      navigate("/"); // Redirigimos a la página de inicio
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={10}>
        <Card sx={{ p: 5, boxShadow: 10, borderRadius: 5, background: "rgba(255, 255, 255, 0.7)" }}>
          <CardContent sx={{fontWeight: "bold"}}>
            {user ? (
              <>
                <Typography variant="h4" gutterBottom mb={5}>Nombre: {user.name}</Typography>
                <Typography variant="h6" mb={2}>Email: {user.email}</Typography>
                <Typography variant="h6" mb={2}>Rol: {user.role}</Typography>
                <Typography variant="h6" mb={2}>Equipo: {user.team ? teamName : "Sin equipo"}</Typography>
                {/* Botones de editar y eliminar */}
                <Box mt={3} display="flex" sx={{justifyContent: "center"}}>
                  <EditProfileButton onOpenEdit={onOpenEdit} />
                  <DeleteAccountButton onOpenDelete={() => setOpenDialog(true)} />
                </Box>
              </>
            ) : (
              <Typography variant="body1">Cargando perfil...</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      {/* Cuadro de diálogo de confirmación */}
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
      />
    </Container>
  );
};

export default ProfilePage;
