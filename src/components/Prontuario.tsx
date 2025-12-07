import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

// Simulação de dados de prontuário
interface ProntuarioData {
  data: string;
  medico: string;
  motivo: string;
  diagnostico: string;
  prescricao: string;
}

interface ProntuarioProps {
  pacienteId: number;
}

const MOCK_HISTORICO: ProntuarioData[] = [
  { data: "2024-10-25", medico: "Dr. Carlos Oliveira", motivo: "Dor de cabeça persistente", diagnostico: "Cefaleia tensional", prescricao: "Analgésico e descanso." },
  { data: "2024-09-10", medico: "Dra. Ana Costa", motivo: "Exame de rotina anual", diagnostico: "Saúde estável", prescricao: "Manter acompanhamento." },
];

/**
 * Componente que simula a visualização do Prontuário Eletrônico
 */
const Prontuario: React.FC<ProntuarioProps> = ({ pacienteId }) => {
  return (
    <Paper elevation={1} sx={{ mt: 3, p: 3, bgcolor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Histórico Médico (ID: {pacienteId})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {MOCK_HISTORICO.map((registro, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: 'white' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Consulta em: {registro.data}
          </Typography>
          <Typography variant="body2">
            **Médico:** {registro.medico}
          </Typography>
          <Typography variant="body2">
            **Motivo:** {registro.motivo}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            **Diagnóstico:** {registro.diagnostico}
          </Typography>
          <Typography variant="body2">
            **Prescrição:** {registro.prescricao}
          </Typography>
        </Box>
      ))}

      {MOCK_HISTORICO.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          Nenhum registro de prontuário encontrado.
        </Typography>
      )}
    </Paper>
  );
};

export default Prontuario;