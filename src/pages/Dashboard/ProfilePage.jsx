import React, { useEffect, useState, useContext } from "react";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import teamService from "../../services/team.service";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import EditProfileButton from "./DashboardComponents/EditProfileButton";
import DeleteAccountButton from "./DashboardComponents/DeleteAccountButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { AuthContext } from "../../context/auth.context";
import { useUser } from "../../context/user.context";
import CreateTeamButton from "../Dashboard/DashboardComponents/CreateTeamButton";
import EditProfileDialog from "../Dashboard/DashboardComponents/EditProfileDialog";
import TeamSearchAndRequest from "./DashboardComponents/TeamSearchAndRequest";
import Chatbot from "../../components/Chatbot"
import UserInfo from "../Dashboard/DashboardComponents/UserInfo"

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [teamName, setTeamName] = useState("Cargando...");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setUser(response.data);

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

    const fetchTeams = async () => {
      try {
        const teamsData = await teamService.searchTeams(""); // Llama al servicio
        setTeams(Array.isArray(teamsData) ? teamsData : []); // Verifica que sea un array
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
        setTeams([]); // Asegura que no sea undefined
      }
    };

    fetchProfile();
    fetchTeams();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteUserAccount(user._id);
      logOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const finalData = {...updatedData, team: updatedData.team !== undefined ? updatedData.team : user.team};

      const response = await userService.updateProfile(user._id, finalData);
      setUser((prevUser) => ({ ...prevUser, ...finalData }));
      updateUser((prevUser) => ({ ...prevUser, ...finalData }));

      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCreateTeam = async (teamName) => {
    try {
      const response = await teamService.createTeam({ name: teamName });
      const updatedUser = { ...user, team: response.data._id };
      setUser(updatedUser);
      setTeamName(response.data.name);
      updateUser(updatedUser);
      navigate(`/team/${response.data._id}`);
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    }
  };

  const handleSelectTeam = async (team) => {
    setSelectedTeam(team);
  
    if (!team) {
      alert("Por favor, selecciona un equipo.");
      return;
    }
  
    try {
      // Llamar a la API para actualizar el equipo del usuario
      const response = await userService.updateProfile(user._id, {team: team._id});
  
      if (response && response.data) {
        // Actualizar el estado global (context) del usuario con el nuevo equipo
        setUser((prevUser) => ({...prevUser, team: team._id}));
  
        setTeamName(team.name);
        // Mostrar el mensaje de cambio de equipo, cerrar sesión y redirigir a la página de login
        alert("Has cambiado de equipo. Por favor, reinicia sesión para poder acceder a la información del equipo.");
        logOutUser();
        navigate("/login");
      } else {
        alert("Hubo un error al intentar actualizar el equipo.");
      }
    } catch (error) {
      console.error("Error al unirse al equipo:", error);
      alert("Hubo un error al intentar unirte al equipo.");
    }
  };
  
  const handleSendRequest = async () => {
    if (!selectedTeam) {
      alert("Por favor, selecciona un equipo.");
      return;
    }
  
    try {
      // Llamar a la API para actualizar el equipo del usuario
      const response = await userService.updateProfile(user._id, {team: selectedTeam._id});
  
      if (response && response.data) {
        // Actualizar el estado global (context) del usuario con el nuevo equipo
        setUser((prevUser) => ({...prevUser, team: selectedTeam._id,}));
        
        setTeamName(selectedTeam.name);
      
        const updatedUser = await userService.getProfile(); 
        setUser(updatedUser.data);  // Actualiza el estado con los datos más recientes
  
        alert("¡Te has unido al equipo exitosamente!");
      } 
    } catch (error) {
      console.error("Error al unirse al equipo:", error);
      alert("Hubo un error al intentar unirte al equipo.");
    }
  };
  
  return (
    <>
      <Container maxWidth="md">
        <Box mt={7}>
          <Card sx={{ p: 5, boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)" }}>
            <CardContent sx={{ fontWeight: "bold" }}>
              {user ? (
                <>
                  <UserInfo user={user} teamName={teamName} />
                  {user.role === "Analyst" && !user.team && (
                    <CreateTeamButton onCreateTeam={handleCreateTeam} />
                  )}
                  {user.role === "Coach" && !user.team && (
                    <TeamSearchAndRequest teams={teams} selectedTeam={selectedTeam} onSelectTeam={handleSelectTeam} onSendRequest={handleSendRequest} />
                  )}
                  <Box mt={3} display="flex" sx={{ justifyContent: "center" }}>
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
        <ConfirmationDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={handleDeleteAccount} title="Confirmar Eliminación"
          message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer." />
        <EditProfileDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} onSave={handleUpdateProfile} userData={user} />
        <Container maxWidth="md">
          <Chatbot />
        </Container>
      </Container>
    </>
  ); 
};
export default ProfilePage;