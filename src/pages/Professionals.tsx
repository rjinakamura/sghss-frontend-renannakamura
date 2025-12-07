import { useState, useMemo } from 'react';
import { 
  Box, Typography, Button, TextField, Container, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge'; // Ícone para profissionais

// Importa dados mockados
import { MOCK_PROFESSIONALS, type Professional } from '../data/mockProfessionals';

/**
 * Página de Gestão de Profissionais (Visão Admin).
 */
function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro de busca
  const filteredProfessionals = useMemo(() => {
    if (!searchTerm) return professionals;
    const lowerSearch = searchTerm.toLowerCase();
    return professionals.filter(prof => 
      prof.name.toLowerCase().includes(lowerSearch) || 
      prof.specialty.toLowerCase().includes(lowerSearch) ||
      (prof.crm && prof.crm.includes(searchTerm))
    );
  }, [professionals, searchTerm]);

  // Função de exclusão simplificada
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover o profissional ${name}?`)) {
      setProfessionals(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gestão de Profissionais
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => alert('Funcionalidade de cadastro em breve!')}
        >
          Novo Profissional
        </Button>
      </Box>

      {/* Barra de Busca */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Buscar por Nome, Especialidade ou CRM"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* Tabela de Profissionais */}
      <Paper elevation={3}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Função</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Especialidade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Registro (CRM)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contato</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProfessionals.map((prof) => (
                <TableRow key={prof.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BadgeIcon color="action" fontSize="small" />
                        {prof.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                        label={prof.role} 
                        color={prof.role === 'Médico' ? 'primary' : 'default'} 
                        size="small" 
                        variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{prof.specialty}</TableCell>
                  <TableCell>{prof.crm || '-'}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontSize={12}>{prof.email}</Typography>
                    <Typography variant="body2" fontSize={12} color="text.secondary">{prof.phone}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      size="small"
                      onClick={() => alert(`Editar ${prof.name}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      size="small" 
                      onClick={() => handleDelete(prof.id, prof.name)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProfessionals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">Nenhum profissional encontrado.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default ProfessionalsPage;