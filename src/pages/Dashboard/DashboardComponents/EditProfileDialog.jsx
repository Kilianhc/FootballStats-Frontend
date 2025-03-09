import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function EditProfileDialog({ open, onClose, userData, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  // Se ejecuta cuando userData cambia, asegurando que el estado se inicialice correctamente
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = { ...formData };
    if (!updatedData.password) {
      delete updatedData.password;
    }
    onSave(updatedData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        
        {/* Select para el rol */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Rol</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Nueva Contraseña"
          name="password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          helperText="Déjalo en blanco si no quieres cambiar la contraseña"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;
