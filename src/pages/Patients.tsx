import { useState, useMemo } from 'react'; 
import { 
  Box, Typography, Button, TextField, Container, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import Prontuario from '../components/Prontuario'; 
import { MOCK_PATIENTS, type Patient } from '../data/mockPatients'; 

// ----------------------------------------------------------------------
// Tipagens e Dados Mockados
// ----------------------------------------------------------------------
// Componente de Detalhes do Paciente (EXPORTADO!)
// ----------------------------------------------------------------------
export const PatientDetail: React.FC<{ patient: Patient, onBack: () => void }> = ({ patient, onBack }) => {
  const [showProntuario, setShowProntuario] = useState(false);

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Detalhes do Paciente</Typography>
      </Box>

      {/* Seção de Informações Básicas */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid #ccc', pb: 3, mb: 3 }}>
        <Box sx={{ width: { xs: '100%', sm: '48%' } }}> 
          <Typography variant="body1" component="span" fontWeight="bold">Nome:</Typography>
          <Typography variant="body1" component="span"> {patient.name}</Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
          <Typography variant="body1" component="span" fontWeight="bold">CPF:</Typography>
          <Typography variant="body1" component="span"> {patient.cpf}</Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
          <Typography variant="body1" component="span" fontWeight="bold">Nascimento:</Typography>
          <Typography variant="body1" component="span"> {patient.birthDate}</Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '48%' } }}>
          <Typography variant="body1" component="span" fontWeight="bold">Telefone:</Typography>
          <Typography variant="body1" component="span"> {patient.phone}</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body1" component="span" fontWeight="bold">Endereço:</Typography>
          <Typography variant="body1" component="span"> {patient.address}</Typography>
        </Box>
        
        {/* Botão de Ação */}
        <Box sx={{ mt: 3 }}>
           <Button 
              variant="contained" 
              color="secondary"
              onClick={() => setShowProntuario(prev => !prev)}
           >
              {showProntuario ? 'Ocultar Prontuário' : 'Visualizar Prontuário'}
           </Button>
        </Box>
      </Box>
      
      {showProntuario && <Prontuario pacienteId={patient.id} />}
      
    </Paper>
  );
};

// ----------------------------------------------------------------------
// Componente de Tabela de Visualização com Busca (EXPORTADO)
// ----------------------------------------------------------------------
export const PatientsList: React.FC<{ 
  patients: Patient[], 
  onSelectPatient: (patient: Patient) => void,
  search: string,
  onSearchChange: (value: string) => void
}> = ({ patients, onSelectPatient, search, onSearchChange }) => {

  const filteredPatients: Patient[] = useMemo(() => { 
    if (!search) return patients;
    const lowerSearch = search.toLowerCase();
    
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(lowerSearch) || 
      patient.cpf.includes(search)
    );
  }, [patients, search]);
  
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Pacientes Cadastrados ({filteredPatients.length})</Typography>
        <TextField 
          label="Buscar por Nome ou CPF"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: '40%' }}
        />
      </Box>

      <TableContainer component={Paper}> 
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nascimento</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map(patient => (
              <TableRow key={patient.id} hover>
                <TableCell>
                  <Button onClick={() => onSelectPatient(patient)} variant="text" size="small">
                    {patient.name}
                  </Button>
                </TableCell>
                <TableCell>{patient.cpf}</TableCell>
                <TableCell>{patient.birthDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhum paciente encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// ----------------------------------------------------------------------
// Componente de Formulário de Cadastro (EXPORTADO)
// ----------------------------------------------------------------------
export const PatientForm: React.FC<{ onSave: (patient: Omit<Patient, 'id'>) => void }> = ({ onSave }) => {
  const [formData, setFormData] = useState<Omit<Patient, 'id'>>({ name: '', cpf: '', birthDate: '', phone: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', cpf: '', birthDate: '', phone: '', address: '' });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Novo Paciente
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}> 
        <TextField required fullWidth label="Nome Completo" name="name" value={formData.name} onChange={handleChange} />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField required fullWidth label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} />
          <TextField required fullWidth label="Data de Nascimento" name="birthDate" type="date" InputLabelProps={{ shrink: true }} value={formData.birthDate} onChange={handleChange} />
          <TextField required fullWidth label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
        </Box>
        
        <TextField required fullWidth label="Endereço Completo" name="address" value={formData.address} onChange={handleChange} />
        
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          Salvar Paciente
        </Button>
      </Box>
    </Paper>
  );
};

// ----------------------------------------------------------------------
// Página Principal de Gestão de Pacientes. (EXPORTAÇÃO PADRÃO)
// ----------------------------------------------------------------------
function PatientsPage() {
  const [view, setView] = useState<'list' | 'form' | 'detail'>('list');
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  
  const handleSave = (newPatient: Omit<Patient, 'id'>) => {
    const newId = patients.length > 0 ? patients[patients.length - 1].id + 1 : 1;
    const patientWithId: Patient = { ...newPatient, id: newId };
    setPatients(prev => [...prev, patientWithId]); 
    setView('list'); 
  };
  
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedPatient(null);
  }

  // Renderiza a visualização correta
  const renderView = () => {
    if (view === 'detail' && selectedPatient) {
      return <PatientDetail patient={selectedPatient} onBack={handleBackToList} />;
    }
    if (view === 'form') {
      return <PatientForm onSave={handleSave} />;
    }
    return (
      <PatientsList 
        patients={patients} 
        onSelectPatient={handleSelectPatient}
        search={searchTerm}
        onSearchChange={setSearchTerm}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3">
          Gestão de Pacientes
        </Typography>
        
        {/* BOTÃO: VOLTAR AO DASHBOARD */}
        <Button
            variant="outlined"
            color="info"
            onClick={() => navigate('/dashboard')} // Navega para o Dashboard
            startIcon={<ArrowBackIcon />}
        >
            Voltar ao Dashboard
        </Button>
      </Box>
      
      {/* Botão de Alternância de Visualização */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end'}}>
        {view !== 'detail' && (
          <Button
            variant="contained"
            onClick={() => setView(view === 'list' ? 'form' : 'list')}
            startIcon={view === 'list' ? <AddIcon /> : <ListIcon />}
          >
            {view === 'list' ? 'Cadastrar Novo' : 'Ver Lista'}
          </Button>
        )}
      </Box>

      {renderView()}
      
    </Container>
  );
}

export default PatientsPage;