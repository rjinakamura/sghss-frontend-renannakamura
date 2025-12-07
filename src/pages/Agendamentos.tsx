import { useState, useMemo } from 'react'; 
import { 
  Box, Typography, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, TextField 
} from '@mui/material';

// Importa os dados mockados
import { MOCK_CONSULTAS, type Consulta } from '../data/mockConsultas';

/**
 * Página de Gestão de Agendamentos (Visão Admin/Médico)
 */
function Agendamentos() {
  const [consultas] = useState<Consulta[]>(MOCK_CONSULTAS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro de busca
  const filteredConsultas = useMemo(() => {
    if (!searchTerm) return consultas;
    const lowerSearch = searchTerm.toLowerCase();
    return consultas.filter(c => 
      c.paciente.toLowerCase().includes(lowerSearch) || 
      c.medico.toLowerCase().includes(lowerSearch)
    );
  }, [consultas, searchTerm]);

  // Função para definir a cor do Chip com base no status
  const getStatusColor = (status: Consulta['status']) => {
    if (status === 'Confirmada') return 'success';
    if (status === 'Pendente') return 'warning';
    if (status === 'Cancelada') return 'error';
    return 'default';
  };

  return (
    <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gestão de Agendamentos
        </Typography>

        {/* Barra de Busca */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <TextField
            label="Buscar por Paciente ou Médico"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        {/* Tabela de Agendamentos */}
        <Paper elevation={3}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Médico</TableCell>
                  <TableCell>Especialidade</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredConsultas.map((consulta) => (
                  <TableRow key={consulta.id} hover>
                    <TableCell>{consulta.paciente}</TableCell>
                    <TableCell>{consulta.medico}</TableCell>
                    <TableCell>{consulta.especialidade}</TableCell>
                    <TableCell>{consulta.data}</TableCell>
                    <TableCell>{consulta.hora}</TableCell>
                    <TableCell>
                      <Chip label={consulta.status} color={getStatusColor(consulta.status)} size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </Box>
  );
}

export default Agendamentos;