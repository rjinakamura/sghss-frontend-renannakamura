import React, { useState, useMemo } from 'react'; 
import { 
  Box, Typography, Paper, Button, 
  FormControl, InputLabel, Select, MenuItem, TextField, 
  ToggleButtonGroup, ToggleButton, Snackbar, Alert
} from '@mui/material'; 
import Sidebar from '../components/Sidebar'; 
import { type SelectChangeEvent } from '@mui/material/Select';

const drawerWidth = 240; 

// ----------------------------------------------------------------------
// DADOS MOCKADOS (Simulação de Médicos e Horários)
// ----------------------------------------------------------------------
const specialties = [
  { id: 'cli', name: 'Clínica Geral' },
  { id: 'car', name: 'Cardiologia' },
  { id: 'der', name: 'Dermatologia' },
];

const doctors = [
  { id: 'd1', name: 'Dr. Carlos Oliveira', specialtyId: 'cli' },
  { id: 'd2', name: 'Dra. Ana Costa', specialtyId: 'car' },
  { id: 'd3', name: 'Dr. Bruno Lima', specialtyId: 'der' },
  { id: 'd4', name: 'Dra. Sofia Almeida', specialtyId: 'cli' },
];

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'
];
// ----------------------------------------------------------------------

/**
 * Página de Agendamento Online para o Paciente.
 */
function AgendarConsulta() {
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredDoctors = useMemo(() => {
    return doctors.filter(d => d.specialtyId === specialty);
  }, [specialty]);

  const handleSpecialtyChange = (event: SelectChangeEvent) => {
    setSpecialty(event.target.value);
    setDoctor(''); 
    setDate('');
    setTimeSlot(null);
  };

  const handleDoctorChange = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
    setDate('');
    setTimeSlot(null);
  };

  const handleTimeSelect = (_event: React.MouseEvent<HTMLElement>, newTimeSlot: string | null) => {
    setTimeSlot(newTimeSlot);
  };

  const handleConfirmBooking = () => {
    setSnackbarMessage(`Consulta agendada com sucesso para ${date} às ${timeSlot}!`);
    setSnackbarOpen(true);
    
    setSpecialty('');
    setDoctor('');
    setDate('');
    setTimeSlot(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar (Navegação) */}
      <Box 
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Sidebar drawerWidth={0} mobileOpen={false} handleDrawerToggle={function (): void {
          throw new Error('Function not implemented.');
        } } isDesktop={false} /> 
      </Box>
      
      {/* Conteúdo Principal */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` } 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Agendar Consulta Online
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          
          {/* Etapa 1: Selecionar Especialidade */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="specialty-label">1. Escolha a Especialidade</InputLabel>
            <Select
              labelId="specialty-label"
              value={specialty}
              label="1. Escolha a Especialidade"
              onChange={handleSpecialtyChange}
            >
              {specialties.map(spec => (
                <MenuItem key={spec.id} value={spec.id}>{spec.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Etapa 2: Selecionar Médico */}
          {specialty && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="doctor-label">2. Escolha o Médico</InputLabel>
              <Select
                labelId="doctor-label"
                value={doctor}
                label="2. Escolha o Médico"
                onChange={handleDoctorChange}
              >
                {filteredDoctors.map(doc => (
                  <MenuItem key={doc.id} value={doc.id}>{doc.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Etapa 3: Selecionar Data */}
          {doctor && (
            <TextField
              fullWidth
              margin="normal"
              label="3. Escolha a Data"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTimeSlot(null);
              }}
              InputLabelProps={{ shrink: true }}
            />
          )}

          {/* Etapa 4: Selecionar Horário */}
          {date && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>4. Escolha o Horário</Typography>
              <ToggleButtonGroup
                value={timeSlot}
                exclusive
                onChange={handleTimeSelect}
                aria-label="horários disponíveis"
                sx={{ flexWrap: 'wrap', gap: 1 }}
              >
                {availableTimeSlots.map(time => (
                  <ToggleButton key={time} value={time} aria-label={time} sx={{ m: 0.5 }}>
                    {time}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          )}

          {/* Etapa 5: Confirmação */}
          {timeSlot && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 4, width: '100%' }}
              onClick={handleConfirmBooking}
            >
              Confirmar Agendamento
            </Button>
          )}

        </Paper>
      </Box>
      
      {/* Snackbar de Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgendarConsulta;