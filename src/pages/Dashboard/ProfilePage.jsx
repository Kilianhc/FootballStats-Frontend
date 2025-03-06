import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";
import teamService from "../../services/team.service";
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete } from "@mui/material";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfile()
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  useEffect(() => {
    teamService.searchTeams()
      .then(response => setTeams(response.data))
      .catch(error => console.error("Error fetching teams:", error));
  }, []);

  const handleSendRequest = () => {
    if (selectedTeam) {
      teamService.sendJoinRequest(selectedTeam.id)
        .then(() => alert("Solicitud enviada"))
        .catch(error => console.error("Error sending request:", error));
    }
  };

  const handleEditProfile = (updatedData) => {
    userService.updateProfile(updatedData)
      .then(response => {
        setUser(response.data);
        setOpenEdit(false);
      })
      .catch(error => console.error("Error updating profile:", error));
  };

  const handleDeleteAccount = () => {
    userService.deleteAccount()
      .then(() => navigate("/signup"))
      .catch(error => console.error("Error deleting account:", error));
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4">Perfil</Typography>
      {user && (
        <Box>
          <Typography>Nombre: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Rol: {user.role}</Typography>
          <Typography>Equipo: {user.team ? user.team.name : "Sin equipo"}</Typography>
          
          {!user.team && (
            <Box mt={2}>
              <Autocomplete
                options={teams}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setSelectedTeam(value)}
                renderInput={(params) => <TextField {...params} label="Buscar equipo" variant="outlined" />}
              />
              <Button variant="contained" color="primary" onClick={handleSendRequest} sx={{ mt: 2 }}>
                Enviar solicitud
              </Button>
            </Box>
          )}
          
          <Button variant="contained" color="secondary" onClick={() => setOpenEdit(true)} sx={{ mt: 2 }}>
            Editar Perfil
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpenDelete(true)} sx={{ mt: 2, ml: 2 }}>
            Eliminar Cuenta
          </Button>
        </Box>
      )}

      {/* Modal para editar perfil */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Nombre" defaultValue={user?.name} sx={{ my: 2 }} />
          <TextField fullWidth label="Email" defaultValue={user?.email} sx={{ my: 2 }} />
          <TextField fullWidth label="Contraseña" type="password" placeholder="Nueva contraseña" sx={{ my: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={() => handleEditProfile({ name: "Nuevo Nombre", email: "nuevo@email.com" })}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirmación para eliminar cuenta */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>¿Seguro que quieres eliminar tu cuenta?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteAccount}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfilePage;
