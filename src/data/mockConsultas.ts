// Tipagem da Consulta
export interface Consulta {
  id: string;
  paciente: string;
  medico: string;
  especialidade: string;
  data: string;
  hora: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
}

// Dados Mockados
export const MOCK_CONSULTAS: Consulta[] = [
  { id: 'c100', paciente: 'Maria da Silva', medico: 'Dra. Ana Costa', especialidade: 'Cardiologia', data: '2025-11-10', hora: '09:00', status: 'Confirmada' },
  { id: 'c101', paciente: 'João de Souza', medico: 'Dr. Carlos Oliveira', especialidade: 'Clínica Geral', data: '2025-11-10', hora: '10:30', status: 'Confirmada' },
  { id: 'c102', paciente: 'Ana Paula Lima', medico: 'Dr. Bruno Lima', especialidade: 'Dermatologia', data: '2025-11-11', hora: '14:00', status: 'Pendente' },
  { id: 'c103', paciente: 'Carlos Jorge', medico: 'Dra. Ana Costa', especialidade: 'Cardiologia', data: '2025-11-12', hora: '11:00', status: 'Cancelada' },
];