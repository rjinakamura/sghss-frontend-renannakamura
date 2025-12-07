import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Importações do Recharts para os gráficos
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// --- DADOS MOCKADOS PARA GRÁFICOS ---

const financeData = [
  { name: 'Jan', receita: 40000, despesa: 24000 },
  { name: 'Fev', receita: 30000, despesa: 13980 },
  { name: 'Mar', receita: 20000, despesa: 9800 },
  { name: 'Abr', receita: 27800, despesa: 39080 },
  { name: 'Mai', receita: 18900, despesa: 4800 },
  { name: 'Jun', receita: 23900, despesa: 3800 },
];

const specialtyData = [
  { name: 'Cardiologia', value: 400 },
  { name: 'Clínica Geral', value: 300 },
  { name: 'Dermatologia', value: 300 },
  { name: 'Ortopedia', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- COMPONENTES AUXILIARES ---

// Card de Estatística Simples
const StatCard: React.FC<{ title: string; value: string; subtitle: string; color: string; icon: React.ReactElement }> = ({ title, value, subtitle, color, icon }) => (
  <Box sx={{ width: { xs: '100%', md: '33%' }, p: 1 }}>
    <Paper elevation={2} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>{value}</Typography>
        <Typography variant="caption" color={color} fontWeight="medium">{subtitle}</Typography>
      </Box>
      <Box sx={{ bgcolor: `${color}20`, p: 1.5, borderRadius: '50%', color: color }}>
        {icon}
      </Box>
    </Paper>
  </Box>
);

/**
 * Página para Visualização de Relatórios e Métricas Administrativas.
 */
function Relatorios() {
    
  return (
    <Box>
        
        {/* Cabeçalho */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Relatórios Administrativos
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Visão geral financeira e operacional da clínica.
            </Typography>
        </Box>

        {/* Cards de KPIs (Indicadores) */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1, mb: 3 }}>
            <StatCard 
                title="Receita Total (Mês)" 
                value="R$ 128.400" 
                subtitle="+12% em relação ao mês anterior"
                color="#2e7d32" // Verde
                icon={<AttachMoneyIcon fontSize="large" />}
            />
            <StatCard 
                title="Taxa de Ocupação" 
                value="87%" 
                subtitle="Leitos e salas de exame"
                color="#1976d2" // Azul
                icon={<LocalHospitalIcon fontSize="large" />}
            />
            <StatCard 
                title="Novos Pacientes" 
                value="342" 
                subtitle="Cadastrados nos últimos 30 dias"
                color="#ed6c02" // Laranja
                icon={<TrendingUpIcon fontSize="large" />}
            />
        </Box>

        {/* Seção de Gráficos */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1, mb: 3 }}>
            
            {/* Gráfico de Linha: Financeiro */}
            <Box sx={{ width: { xs: '100%', lg: '66%' }, p: 1 }}>
                <Paper elevation={3} sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>Fluxo de Caixa (Semestral)</Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financeData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36}/>
                            <Line type="monotone" dataKey="receita" stroke="#2e7d32" activeDot={{ r: 8 }} name="Receita" />
                            <Line type="monotone" dataKey="despesa" stroke="#d32f2f" name="Despesas" />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>

            {/* Gráfico de Pizza: Especialidades */}
            <Box sx={{ width: { xs: '100%', lg: '34%' }, p: 1 }}>
                <Paper elevation={3} sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>Atendimentos por Especialidade</Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={specialtyData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {specialtyData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
        </Box>

        {/* Alertas do Sistema */}
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Alertas do Sistema e Auditoria</Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                    <ListItemText primary="Estoque de medicamentos baixo" secondary="Dipirona e Paracetamol precisam de reposição imediata." />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Backup do banco de dados concluído" secondary="Realizado hoje às 03:00 AM." />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemIcon><TrendingUpIcon color="info" /></ListItemIcon>
                    <ListItemText primary="Meta mensal atingida" secondary="O departamento de Cardiologia atingiu a meta de consultas." />
                </ListItem>
            </List>
        </Paper>

    </Box>
  );
}

export default Relatorios;