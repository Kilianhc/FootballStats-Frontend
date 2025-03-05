import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable

  // Manejar la apertura del menú
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Manejar el cierre del menú
  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <MenuItem onClick={handleMenuClose} component={Link} to="/team">
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
              <Button color="inherit" onClick={logOutUser}>
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
