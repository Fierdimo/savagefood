import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
} from "@mui/material";
import logout from "./logout";


export default function Navbar({ navigate, userData, setUserData, addToChart }) {

  const settings = [
    {
      label: 'Ingresar',
      permission: ['0', '1', '2', '3',]
    },
    {
      label: 'Cerrar sesión',
      permission: ['0', '1', '2', '3',]
    },
    {
      label: 'Panel administrador',
      permission: ['1']
    },
    {
      label: 'Panel Cajero',
      permission: ['2']
    },
    {
      label: 'Panel Entregas',
      permission: ['3']
    },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseUserMenu(setting) {
    switch (setting.label) {
      case 'Panel administrador':
        navigate('/admin', { replace: true });
        break;
      case 'Ingresar':
        navigate('/auth', { replace: true });
        break;
      case 'Cerrar sesión':
        logout(navigate, setUserData, addToChart)
        break;
      case 'Panel Cajero':
        navigate('/checker', { replace: true });
        break;
      case 'Panel Entregas':
        navigate('/deliver', { replace: true });
        break;
      default:
    }
    setAnchorElUser(null);
  };

  function MenuItems() {
    let grupo = userData ? userData.group : '0'
    return (settings.map(setting => {
      if (setting.permission.includes(grupo)) {
        return <MenuItem key={setting.label} onClick={() => handleCloseUserMenu(setting)}>
          {setting.label}
        </MenuItem>
      }
    }))

  }




  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar
        position="relative"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar >
          <Box sx={{ flexGrow: 0, m: 1 }} onClick={() => navigate('/', { replace: true })}>
            <img alt="Savage Food" src={'./images/label.png'} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={() => navigate('/menu', { replace: true })}>Menu</Button>
            <Button onClick={() => { navigate('/', { replace: true }); }}>Localización</Button>
            <Button onClick={() => { navigate('/nosotros', { replace: true }); }}>Nosotros</Button>
            <Button onClick={() => { navigate('/order', { replace: true }); }}>Pedidos</Button>
          </Box>
          <Box sx={{ mr: 5 }}>
            <Typography color={'#fafafa'}>Bienvenido {localStorage.getItem('username') ? localStorage.getItem('username') : 'Anónimo'}</Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de usuario">
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleOpenUserMenu}
                sx={{ mr: 2, flexGrow: 0 }}
              >
                <Avatar alt="SF" src={'/images/fast-food-logo-tmb.png'} sx={{ width: 56, height: 56 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItems />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
