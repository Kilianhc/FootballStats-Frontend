import { useState } from "react";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

function CreateTeamButton({ onCreateTeam }) {
  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [teamName, setTeamName] = useState(""); // Estado para almacenar el nombre del equipo

  // Abrir el modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setTeamName(""); // Limpiar el campo de texto al cerrar el modal
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (teamName.trim() === "") {
      alert("El nombre del equipo no puede estar vacío.");
      return;
    }

    onCreateTeam(teamName); // Llamar a la función para crear el equipo
    handleClose(); // Cerrar el modal después de crear el equipo
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2, bgcolor:"#2d8384" }}>
        Crear Equipo
      </Button>

      {/* Modal para crear equipo */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Nuevo Equipo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre del equipo"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateTeamButton;