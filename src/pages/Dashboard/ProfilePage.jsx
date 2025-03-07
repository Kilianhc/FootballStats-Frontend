import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";
import teamService from "../../services/team.service";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, List, ListItem, ListItemText, TextField } from "@mui/material";
import CreateTeamButton from "./CreateTeamButton";
import EditProfileButton from "./EditProfileButton";
import DeleteAccountButton from "./DeleteAccountButton";
import TeamSearchAndRequest from "./TeamSearchAndRequest";
import ViewRequestsButton from "./ViewRequestsButton";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  const [editData, setEditData] = useState({ name: "", email: "", password: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfile()
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  useEffect(() => {
    teamService.searchTeams("")
      .then(response => {
        console.log("Equipos recibidos:", response);
        setTeams(response.slice(0, 5));
      })
      .catch(error => {
        console.error("Error fetching teams:", error);
        setTeams([]);
      });
  }, []);

  const handleOpenEdit = () => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
    setOpenEdit(true);
  };

  const handleEditProfile = () => {
    if (user && user._id) {
      const updatedData = { ...editData };

      if (!updatedData.name) delete updatedData.name;
      if (!updatedData.email) delete updatedData.email;
      if (!updatedData.password) delete updatedData.password;
      if (!updatedData.role) delete updatedData.role;

      if (updatedData.email === "") {
        alert("El email no puede estar vacío.");
        return;
      }

      userService.updateProfile(updatedData, user._id)
        .then(response => {
          const updatedUser = { ...user, ...response.data };
          setUser(updatedUser);
          setOpenEdit(false);
          alert("Perfil actualizado correctamente");
        })
        .catch(error => {
          console.error("Error updating profile:", error);
          alert("Error al actualizar el perfil. Inténtalo de nuevo.");
        });
    }
  };

  const handleCreateTeam = () => {
    teamService.createTeam({ name: "Nuevo Equipo" })
      .then(response => {
        alert("Equipo creado correctamente");
        setUser({ ...user, team: response.data });
      })
      .catch(error => {
        console.error("Error creating team:", error);
        alert("Error al crear el equipo.");
      });
  };

  const handleViewRequests = () => {
    teamService.getTeamRequests(user.team._id)
      .then(response => {
        setRequests(response.data);
        setOpenRequests(true);
      })
      .catch(error => {
        console.error("Error fetching requests:", error);
        alert("Error al obtener las solicitudes.");
      });
  };

  const handleSendRequest = () => {
    if (selectedTeam) {
      teamService.requestJoinTeam(selectedTeam._id)
        .then(() => {
          alert("Solicitud enviada correctamente");
        })
        .catch(error => {
          console.error("Error sending request:", error);
          alert("Error al enviar la solicitud.");
        });
    }
  };

  const handleRespondToRequest = (requestId, accept) => {
    teamService.respondToRequest(requestId, accept)
      .then(() => {
        alert(accept ? "Solicitud aceptada" : "Solicitud denegada");
        handleViewRequests(); // Actualizar la lista de solicitudes
      })
      .catch(error => {
        console.error("Error responding to request:", error);
        alert("Error al responder a la solicitud.");
      });
  };

  const handleDeleteAccount = () => {
    if (user && user._id) {
      userService.deleteAccount(user._id)
        .then(() => {
          alert("Cuenta eliminada correctamente");
          navigate("/signup");
        })
        .catch(error => {
          console.error("Error deleting account:", error);
          alert("Error al eliminar la cuenta. Inténtalo de nuevo.");
        });
    } else {
      console.error("No se pudo obtener el ID del usuario.");
      alert("Error: No se pudo obtener el ID del usuario.");
    }
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

          {user.role === "Analyst" && !user.team && (
            <CreateTeamButton onCreateTeam={handleCreateTeam} />
          )}

          {user.role === "Analyst" && user.team && (
            <ViewRequestsButton onViewRequests={handleViewRequests} />
          )}

          {user.role === "Coach" && !user.team && (
            <TeamSearchAndRequest
              teams={teams}
              selectedTeam={selectedTeam}
              onSelectTeam={setSelectedTeam}
              onSendRequest={handleSendRequest}
            />
          )}

          <EditProfileButton onOpenEdit={handleOpenEdit} />
          <DeleteAccountButton onOpenDelete={() => setOpenDelete(true)} />
        </Box>
      )}

      {/* Modal para editar perfil */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            placeholder="Nueva contraseña"
            value={editData.password}
            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
            sx={{ my: 2 }}
          />
          <Select
            fullWidth
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
            sx={{ my: 2 }}
          >
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={handleEditProfile}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para ver solicitudes */}
      <Dialog open={openRequests} onClose={() => setOpenRequests(false)}>
        <DialogTitle>Solicitudes</DialogTitle>
        <DialogContent>
          {requests.length > 0 ? (
            <List>
              {requests.map((request) => (
                <ListItem key={request._id}>
                  <ListItemText primary={`Solicitud de ${request.coach.name}`} />
                  <Button onClick={() => handleRespondToRequest(request._id, true)}>Aceptar</Button>
                  <Button onClick={() => handleRespondToRequest(request._id, false)}>Denegar</Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>En este momento no tienes solicitudes.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRequests(false)}>Cerrar</Button>
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