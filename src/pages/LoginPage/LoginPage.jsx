import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import teamService from "../../services/team.service";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function ProfilePage() {
  const { user, authenticateUser, logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(user || {});
  const [teamSearch, setTeamSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfile()
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // Buscar equipo por nombre
  const handleSearchTeam = () => {
    if (!teamSearch) return;
    teamService.searchTeams(teamSearch)
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.error("Error searching team:", err));
  };

  // Enviar solicitud de acceso a un equipo
  const handleRequestAccess = (teamId) => {
    teamService.requestAccess(teamId)
      .then(() => alert("Solicitud enviada al creador del equipo."))
      .catch((err) => console.error("Error requesting access:", err));
  };

  // Actualizar perfil del usuario
  const handleUpdateProfile = () => {
    userService.updateProfile(userData)
      .then(() => {
        authenticateUser(); // Refrescar contexto
        setOpenEdit(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  // Eliminar cuenta
  const handleDeleteAccount = () => {
    if (!window.confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción es irreversible.")) return;
    userService.deleteAccount()
      .then(() => {
        logOutUser();
        navigate("/signup");
      })
      .catch((err) => console.error("Error deleting account:", err));
  };

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4">Perfil</Typography>
      <Typography variant="h6">Nombre: {userData.name}</Typography>
      <Typography variant="h6">Email: {userData.email}</Typography>
      <Typography variant="h6">Rol: {userData.role}</Typography>
      <Typography variant="h6">
        Equipo: {userData.team ? userData.team.name : "Sin equipo"}
      </Typography>

      {/* Buscar equipo */}
      {!userData.team && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Buscar equipo"
            variant="outlined"
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
          />
          <Button onClick={handleSearchTeam} variant="contained" sx={{ ml: 2 }}>
            Buscar
          </Button>
          <Box sx={{ mt: 2 }}>
            {searchResults.map((team) => (
              <Box key={team._id} sx={{ mt: 1 }}>
                <Typography>{team.name}</Typography>
                <Button onClick={() => handleRequestAccess(team._id)} variant="outlined">
                  Solicitar acceso
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Botón Editar Perfil */}
      <Button onClick={() => setOpenEdit(true)} variant="contained" sx={{ mt: 3 }}>
        Editar Perfil
      </Button>

      {/* Botón Eliminar Cuenta */}
      <Button onClick={handleDeleteAccount} variant="contained" color="error" sx={{ mt: 2, ml: 2 }}>
        Eliminar Cuenta
      </Button>

      {/* Modal para editar perfil */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={handleUpdateProfile} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfilePage;