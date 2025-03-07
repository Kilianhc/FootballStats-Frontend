import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import teamService from "../../services/team.service"; // Importa el servicio de equipos

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
  const navigate = useNavigate(); // Hook para navegar

  // Manejar la apertura del menú
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Manejar el cierre del menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Manejar la navegación a la página del equipo
  const handleViewTeam = () => {
    if (user && user.team) {
      navigate(`/team/${user.team._id}`); // Redirige a la página del equipo
    } else {
      alert("No perteneces a ningún equipo."); // Mensaje si el usuario no tiene equipo
    }
    handleMenuClose(); // Cierra el menú después de la acción
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Botón de hamburguesa (solo visible si está logueado) */}
        {isLoggedIn && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Perfil
          </MenuItem>
          <MenuItem onClick={handleViewTeam}> {/* Usa handleViewTeam en lugar de Link */}
            Equipo
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/stats">
            Estadísticas
          </MenuItem>
        </Menu>

        {/* Logo y nombre de la app (centrado) */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
          FootballStats
        </Typography>

        {/* Botones de la derecha */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={logOutUser} component={Link} to="/">
                Cerrar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Mi Perfil
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Crear Usuario
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;