import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Divider,
  useTheme 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People'; 
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; 
import DescriptionIcon from '@mui/icons-material/Description'; 
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BadgeIcon from '@mui/icons-material/Badge'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import VideoCallIcon from '@mui/icons-material/VideoCall'; // Ícone de vídeo
import { useAuth } from '../context/useAuth'; 
import { Link } from 'react-router-dom';

// Props que o Sidebar recebe do Layout.tsx
interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isDesktop: boolean;
}

// Lista de itens de navegação (RBAC Configuradoo)
const allNavItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    href: '/dashboard', 
    roles: ['admin', 'medico'] 
  },
  { 
    text: 'Pacientes', 
    icon: <PeopleIcon />, 
    href: '/patients', 
    roles: ['admin', 'medico'] 
  },
  { 
    text: 'Profissionais', 
    icon: <BadgeIcon />, 
    href: '/professionals', 
    roles: ['admin'] 
  },
  { 
    text: 'Gestão de Agend.', 
    icon: <CalendarTodayIcon />, 
    href: '/agendamentos', 
    roles: ['admin', 'medico'] 
  },
  { 
    text: 'Relatórios', 
    icon: <DescriptionIcon />, 
    href: '/relatorios', 
    roles: ['admin'] 
  },
  { 
    text: 'Agendar Consulta', 
    icon: <PlaylistAddIcon />, 
    href: '/agendar-consulta', 
    roles: ['paciente', 'admin']
  },
  { 
    text: 'Meu Financeiro', 
    icon: <AttachMoneyIcon />, 
    href: '/meu-financeiro', 
    roles: ['paciente', 'admin']
  },
  { 
    text: 'Sala Telemedicina', 
    icon: <VideoCallIcon />, 
    href: '/telemedicina', 
    roles: ['admin', 'medico', 'paciente'] 
  },
];

/**
 * Componente de barra lateral (Sidebar)
 */
function Sidebar({ drawerWidth, mobileOpen, handleDrawerToggle, isDesktop }: SidebarProps) {
  const { user, logout } = useAuth(); 
  const theme = useTheme();
  const userRole = user?.role; 

  // Filtra a lista com base no papel do usuário
  const visibleNavItems = allNavItems.filter(item => 
    userRole && item.roles.includes(userRole)
  );

  // O conteúdo visual do Drawer
  const drawerContent = (
    <Box 
      sx={{ 
        height: '100%', 
        bgcolor: 'primary.main',
        color: 'white', 
        p: 2,
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
      }}
    >
      <Box> {/* Menu Principal */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          SGHSS
        </Typography>
        
        <List>
          {visibleNavItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.href}    
                onClick={!isDesktop ? handleDrawerToggle : undefined} // Fecha o menu no mobile
                sx={{ 
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'primary.dark' } 
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Seção de Logout */}
      <Box sx={{ pb: 1 }}> 
        <Divider sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
        <Typography variant="body2" sx={{ mb: 1, px: 2 }}>
          Usuário: **{user?.email || 'N/A'}**
        </Typography>
        
        <ListItem disablePadding>
          <ListItemButton onClick={logout} sx={{ 
            borderRadius: 1,
            bgcolor: '#E91E63', 
            '&:hover': { bgcolor: '#C2185B' } 
          }}>
            <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Sair" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="Caixa de navegação principal"
    >
      {/* Renderiza o Drawer (Sidebar) */}
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'} 
        open={isDesktop ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: 'none',
            zIndex: isDesktop ? theme.zIndex.appBar -1 : theme.zIndex.drawer,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;