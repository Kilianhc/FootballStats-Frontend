import { useState, useEffect } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel,
  FormControl, RadioGroup, FormLabel, FormControlLabel, Radio} from "@mui/material";

function EditProfileDialog({ open, onClose, userData, onSave }) {
  const [formData, setFormData] = useState({name: "", email: "", role: "", password: "", team: null});
  // Estado para manejar la opción del equipo
  const [teamOption, setTeamOption] = useState("Mantenerlo");
  // Se ejecuta cuando userData cambia, asegurando que el estado se inicialice correctamente
  useEffect(() => {
    if (userData) {
      setFormData({ name: userData.name || "", email: userData.email || "", role: userData.role || "",
        password: "", team: userData.team || null});
      // Si el usuario tiene equipo, selecciona "Mantenerlo", de lo contrario, "Quitarlo"
      setTeamOption(userData.team ? "Mantenerlo" : "Quitarlo");
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeamChange = (event) => {
    setTeamOption(event.target.value);
  };

  const handleSave = () => {
    const updatedData = { ...formData };

    if (!updatedData.password) {
        delete updatedData.password;
    }
    // Si el usuario elige "Quitarlo", enviamos team: null, si no, verificamos que el team sea un ObjectId válido
    updatedData.team = teamOption === "Quitarlo" ? null : (userData.team ? userData.team._id : null);

    onSave(updatedData);
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Nombre" name="name" fullWidth value={formData.name} onChange={handleChange}/>
        <TextField margin="dense" label="Email" name="email" fullWidth value={formData.email} onChange={handleChange}/>
        {/* Select para el rol */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Rol</InputLabel>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <MenuItem value="Analyst">Analyst</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
          </Select>
        </FormControl>
        <TextField margin="dense" label="Nueva Contraseña" name="password" type="password" fullWidth
          value={formData.password} onChange={handleChange} helperText="Déjalo en blanco si no quieres cambiar la contraseña"/>
        {/* Opción para mantener o eliminar el equipo */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Equipo</FormLabel>
          <RadioGroup row value={teamOption} onChange={(e) => setTeamOption(e.target.value)}>
            <FormControlLabel value="Mantenerlo" control={<Radio />} label="Mantener equipo" />
            <FormControlLabel value="Quitarlo" control={<Radio />} label="Quitar equipo" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;
