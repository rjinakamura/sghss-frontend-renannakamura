import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  CssBaseline,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom'; // Importa o Outlet
import Sidebar from './Sidebar'; // Importa Sidebar existente

const drawerWidth = 240;

/**
 * Componente de Layout Central.
 * Controla o AppBar (barra superior) e o Sidebar (menu lateral),
 * e renderiza o conteúdo da rota atual.
 */
const Layout: React.FC = () => {
  const theme = useTheme();
  // Verifica se a tela é 'md' (medium) ou maior (desktop)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Estado para controlar o menu mobile (aberto/fechado)
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* 1. AppBar (Barra Superior) - Só aparece em telas pequenas */}
      {!isDesktop && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            ml: { md: `${drawerWidth}px` },
            zIndex: theme.zIndex.drawer + 1, // Garante que fique acima do Sidebar
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={handleDrawerToggle} // Botão sanduíche
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              SGHSS
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* 2. Sidebar (Menu Lateral) */}
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isDesktop={isDesktop}
      />

      {/* 3. Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` }, // Largura total menos o sidebar no desktop
          mt: { xs: '64px', md: 0 } // Adiciona margem no topo (altura do AppBar) no mobile
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;