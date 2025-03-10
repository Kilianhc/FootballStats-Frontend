import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useUser } from "../../context/user.context";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log("Usuario en Navbar:", user); // Depuración

  const handleViewTeam = () => {
    if (user?.team) {
      navigate(`/team/${user.team}`);
    } else {
      alert("No perteneces a ningún equipo.");
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{bgcolor: "#52eef0", color: "#135d5e"}}>
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

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Perfil
          </MenuItem>
          <MenuItem onClick={handleViewTeam}>
            Equipo
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/stats">
            Estadísticas
          </MenuItem>
        </Menu>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontWeight:"900", fontSize:"xx-large" }}>
          FootballStats
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={logOutUser} component={Link} to="/" sx={{fontWeight:"900"}}>
                Cerrar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/profile" sx={{fontWeight:"900"}}>
                Mi Perfil
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup" sx={{fontWeight:"900"}}>
                Crear Usuario
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{fontWeight:"900"}}>
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
