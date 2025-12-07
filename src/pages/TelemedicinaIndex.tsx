import { useState } from 'react'; 
import { 
  Box, Typography, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Snackbar, Alert 
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Ícone de relógio para agendadas
import { useNavigate } from 'react-router-dom';

// Dados Mockados de consultas de vídeo
const VIDEO_CONSULTAS = [
  { 
    id: '1', 
    paciente: 'Maria da Silva', 
    medico: 'Dr. Carlos Oliveira', 
    horario: '10:00 - Hoje', 
    status: 'Em andamento', 
    sala: 'sala-maria-carlos' 
  },
  { 
    id: '2', 
    paciente: 'João de Souza', 
    medico: 'Dra. Ana Costa', 
    horario: '14:30 - Hoje', 
    status: 'Agendada', 
    sala: 'sala-joao-ana' 
  },
  { 
    id: '3', 
    paciente: 'Ana Paula', 
    medico: 'Dr. Bruno Lima', 
    horario: '09:00 - Amanhã', 
    status: 'Agendada', 
    sala: 'sala-ana-bruno' 
  },
];

function TelemedicinaIndex() {
  const navigate = useNavigate();
  
  // Estados para controlar o aviso
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  /**
   * Função para lidar com a tentativa de entrar na sala.
   */
  const handleEntrarSala = (roomName: string, status: string) => {
    // 1. Se o status for "Agendada", mostra aviso e NÃO entra.
    if (status === 'Agendada') {
      setSnackbarMessage('A sala ainda não está disponível. Aguarde o horário da consulta.');
      setSnackbarOpen(true);
      return; // Para a execução aqui
    }

    // 2. Se estiver "Em andamento", entra na sala.
    if (status === 'Em andamento') {
      navigate(`/video-chamada?room=${roomName}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Telemedicina - Consultas do Dia
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Gerencie suas consultas virtuais e entre nas salas de atendimento.
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Horário</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Paciente</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Médico</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {VIDEO_CONSULTAS.map((consulta) => (
                <TableRow key={consulta.id} hover>
                  <TableCell>{consulta.horario}</TableCell>
                  <TableCell>{consulta.paciente}</TableCell>
                  <TableCell>{consulta.medico}</TableCell>
                  <TableCell>
                    <Chip 
                      label={consulta.status} 
                      color={consulta.status === 'Em andamento' ? 'success' : 'default'} 
                      size="small" 
                      variant={consulta.status === 'Agendada' ? 'outlined' : 'filled'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant={consulta.status === 'Em andamento' ? 'contained' : 'outlined'} 
                      color={consulta.status === 'Em andamento' ? 'success' : 'primary'}
                      // Muda o ícone dependendo do status
                      startIcon={consulta.status === 'Em andamento' ? <VideocamIcon /> : <AccessTimeIcon />}
                      // Chama a função passando o status também
                      onClick={() => handleEntrarSala(consulta.sala, consulta.status)}
                      disabled={consulta.status === 'Cancelada'}
                    >
                      {consulta.status === 'Em andamento' ? 'Entrar Agora' : 'Aguardar'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Componente de Aviso (Snackbar) */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default TelemedicinaIndex;