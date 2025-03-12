import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useUser } from "../../context/user.context";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Person2Icon from '@mui/icons-material/Person2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from "../../assets/logo.png";

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

  const handleViewTeam = () => {
    if (user?.team) {
      navigate(`/team/${user.team}`);
    } else {
      alert("No perteneces a ningún equipo.");
    }
    handleMenuClose();
  };

  const handleViewStats = () => {
    if (user?.team) {
      navigate(`/stats/${user.team}`);
    } else {
      alert("No perteneces a ningún equipo.");
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: "#52eef0", color: "#135d5e" }}>
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
          <MenuItem onClick={handleViewStats}>
            Estadísticas
          </MenuItem>
        </Menu>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"center", marginLeft:"220px", flexGrow: 1, textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "60px", marginRight: "10px", border: "none",
    filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))", // Efecto de brillo difuso
    opacity: 0.7, }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "900", fontSize: "xx-large" }}>
            FootballStats
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button
                color="inherit"
                onClick={logOutUser}
                component={Link}
                to="/"
                sx={{ fontWeight: "900" }}
                endIcon={<LogoutIcon />}
              >
                Cerrar Sesión
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{ fontWeight: "900" }}
                endIcon={<Person2Icon />}
              >
                Mi Perfil
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ fontWeight: "900" }}
                endIcon={<PersonAddIcon />}
              >
                Crear Usuario
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ fontWeight: "900" }}
                endIcon={<LoginIcon />}
              >
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
