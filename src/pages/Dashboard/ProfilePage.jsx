import React, { useEffect, useState, useContext } from "react";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import teamService from "../../services/team.service"; // Importamos la función para obtener equipo
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import EditProfileButton from "./DashboardComponents/EditProfileButton";
import DeleteAccountButton from "./DashboardComponents/DeleteAccountButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { AuthContext } from "../../context/auth.context";
import CreateTeamButton from "../Dashboard/DashboardComponents/CreateTeamButton"
import EditProfileDialog from "../Dashboard/DashboardComponents/EditProfileDialog"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState("Cargando..."); // Estado para el nombre del equipo
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo de confirmación
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { logOutUser, updateUser } = useContext(AuthContext); // Para cerrar sesión
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
      await userService.deleteUserAccount(user._id); // Llamamos a la API para eliminar el usuario
      logOutUser(); // Cerramos sesión
      navigate("/"); // Redirigimos a la página de inicio
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await userService.updateProfile(user._id, updatedData);
      setUser(response.data);
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Manejar la creación de un equipo
  const handleCreateTeam = async (teamName) => {
    try {
      const response = await teamService.createTeam({ name: teamName });
      console.log("Equipo creado:", response.data);

      // Actualizar el estado del usuario con el nuevo equipo
      const updatedUser = { ...user, team: response.data._id };
      setUser(updatedUser);
      setTeamName(response.data.name);

      // Actualizar el estado del usuario en el AuthContext
      updateUser(updatedUser);
      console.log("Usuario actualizado en AuthContext:", updatedUser); // Depuración

      // Redirigir a la página del equipo
      navigate(`/team/${response.data._id}`);
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={10}>
        <Card sx={{ p: 5, boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)" }}>
          <CardContent sx={{fontWeight: "bold"}}>
            {user ? (
              <>
                <Typography variant="h4" gutterBottom mb={5}>Nombre: {user.name}</Typography>
                <Typography variant="h6" mb={2}>Email: {user.email}</Typography>
                <Typography variant="h6" mb={2}>Rol: {user.role}</Typography>
                <Typography variant="h6" mb={2}>Equipo: {user.team ? teamName : "Sin equipo"}</Typography>

                {/* Mostrar el botón "Crear Equipo" si el usuario no tiene equipo */}
                {user.role === "Analyst" && !user.team && (
                  <CreateTeamButton onCreateTeam={handleCreateTeam} />
                )}

                {/* Botones de editar y eliminar */}
                <Box mt={3} display="flex" sx={{justifyContent: "center"}}>
                  <EditProfileButton onOpenEdit={() => setOpenEditDialog(true)} />
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
      <EditProfileDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSave={handleUpdateProfile}
        userData={user}
      />
    </Container>
  );
};

export default ProfilePage;
