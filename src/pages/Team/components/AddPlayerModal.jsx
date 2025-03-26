import { Box, Typography, TextField, MenuItem, Button, Modal } from "@mui/material";

const AddPlayerModal = ({ open, onClose, newPlayer, onChange, onSave }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4}}>
        <Typography variant="h6" gutterBottom>Añadir Nuevo Jugador</Typography>
        <TextField fullWidth label="Nombre" name="name" value={newPlayer.name} onChange={onChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Edad" name="age" type="number" value={newPlayer.age} onChange={onChange} sx={{ mb: 2 }} />
        <TextField fullWidth select label="Posición" name="position" value={newPlayer.position} onChange={onChange} sx={{ mb: 2 }}>
          <MenuItem value="Delantero">Delantero</MenuItem>
          <MenuItem value="Centrocampista">Centrocampista</MenuItem>
          <MenuItem value="Defensa">Defensa</MenuItem>
          <MenuItem value="Portero">Portero</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={onSave}>Guardar</Button>
      </Box>
    </Modal>
  );
};

export default AddPlayerModal;
