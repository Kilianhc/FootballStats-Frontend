import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const EditStatsDialog = ({ open, onClose, player, newStats = {}, setNewStats, onSave }) => {
    return (
      <Dialog open={open} onClose={onClose} scroll="paper" fullWidth maxWidth="sm">
        <DialogTitle>Editar Estadísticas de {player?.name}</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "50vh", overflow: "auto"}}>
          {Object.keys(newStats || {}).map((stat) => (
            <TextField
              key={stat}
              label={stat.replace(/([A-Z])/g, " $1")}
              type="number"
              value={newStats[stat] || 0}
              onChange={(e) => setNewStats({ ...newStats, [stat]: Number(e.target.value) })}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancelar</Button>
          <Button onClick={onSave} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    );
  };  

export default EditStatsDialog;
