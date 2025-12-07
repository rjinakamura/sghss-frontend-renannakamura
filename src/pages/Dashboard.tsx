import { Box, Typography, Paper } from '@mui/material';

// Importa os dados mockados
import { MOCK_PATIENTS } from '../data/mockPatients';
import { MOCK_CONSULTAS } from '../data/mockConsultas';

// Importa Ícones para os Cards
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

// Importa componentes do Recharts
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

/**
 * Componente de Card de Estatística
 */
const KpiCard: React.FC<{ title: string; value: string | number; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
  <Box sx={{ 
      width: { xs: '100%', sm: '50%', md: '33.33%' }, 
      p: 1.5 
    }}
  >
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}
    >
      <Box>
        <Typography variant="h6" color="text.secondary">{title}</Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      </Box>
      <Box sx={{ fontSize: 60, color: color }}>
        {icon}
      </Box>
    </Paper>
  </Box>
);

// Dados mockados para o gráfico
const mockChartData = [
  { name: 'Jan', atendimentos: 40 },
  { name: 'Fev', atendimentos: 30 },
  { name: 'Mar', atendimentos: 50 },
  { name: 'Abr', atendimentos: 45 },
  { name: 'Mai', atendimentos: 60 },
  { name: 'Jun', atendimentos: 55 },
];

/**
 * Página do Dashboard (Visão Admin/Médico)
 * Não posso esquecer que esta página agora é RENDERIZADA DENTRO DO <Outlet> DO LAYOUT.
 */
function Dashboard() {
  
  const totalPacientes = MOCK_PATIENTS.length;
  const consultasConfirmadas = MOCK_CONSULTAS.filter(c => c.status === 'Confirmada').length;
  const consultasPendentes = MOCK_CONSULTAS.filter(c => c.status === 'Pendente').length;

  return (
    <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard Principal
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Visão geral do sistema SGHSS e indicadores de hoje.
        </Typography>

        {/* Grid de KPIs */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          
          <KpiCard 
            title="Total de Pacientes" 
            value={totalPacientes} 
            icon={<PeopleIcon fontSize="inherit" />}
            color="primary.main"
          />
          <KpiCard 
            title="Consultas Confirmadas" 
            value={consultasConfirmadas} 
            icon={<EventAvailableIcon fontSize="inherit" />}
            color="success.main"
          />
          <KpiCard 
            title="Consultas Pendentes" 
            value={consultasPendentes} 
            icon={<EventBusyIcon fontSize="inherit" />}
            color="warning.main"
          />

        </Box>
        
        {/* Gráfico de Atendimentos */}
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Atendimentos por Mês (Últimos 6 Meses)
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="atendimentos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
    </Box>
  );
}

export default Dashboard;