import React from "react";
import { Typography } from "@mui/material";

const UserInfo = ({ user, teamName }) => {
  if (!user) {
    return <Typography variant="body1">Cargando perfil...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom mb={5}>Nombre: {user.name}</Typography>
      <Typography variant="h6" mb={2}>Email: {user.email}</Typography>
      <Typography variant="h6" mb={2}>Rol: {user.role}</Typography>
      <Typography variant="h6" mb={2}>Equipo: {user.team ? teamName : "Sin equipo"}</Typography>
    </>
  );
};

export default UserInfo;
