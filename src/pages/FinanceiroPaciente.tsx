import { Box, Typography, Paper, Divider, Chip } from '@mui/material';
// ----------------------------------------------------------------------
// DADOS MOCKADOS (Simulação de Cobranças)
// ----------------------------------------------------------------------
interface Cobranca {
  id: string;
  descricao: string;
  dataVencimento: string;
  valor: number;
  status: 'Pendente' | 'Pago';
}

const MOCK_COBRANCAS: Cobranca[] = [
  { id: 'f100', descricao: 'Consulta Cardiologia (Dra. Ana Costa)', dataVencimento: '2025-11-15', valor: 150.00, status: 'Pendente' },
  { id: 'f101', descricao: 'Mensalidade Plano SGHSS Básico', dataVencimento: '2025-11-10', valor: 250.00, status: 'Pendente' },
  { id: 'f102', descricao: 'Consulta Clínica Geral (Dr. Carlos)', dataVencimento: '2025-10-15', valor: 100.00, status: 'Pago' },
];
// ----------------------------------------------------------------------

/**
 * Página de Financeiro (Visão do Paciente).
 * Esta página também é renderizada DENTRO do <Outlet> do Layout.tsx.
 */
function FinanceiroPaciente() {
  
  const totalPendente = MOCK_COBRANCAS
    .filter(c => c.status === 'Pendente')
    .reduce((acc, c) => acc + c.valor, 0);

  const getStatusColor = (status: Cobranca['status']) => {
    return status === 'Pendente' ? 'error' : 'success';
  };

  return (
    <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Meu Financeiro
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Acompanhe suas mensalidades e pagamentos de consultas.
        </Typography>

        {/* Card de Resumo */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.main' }}>
          <Typography variant="h5" component="h2" sx={{ mb: 1, color: 'error.dark' }}>
            Valor Total Pendente
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'error.dark' }}>
            R$ {totalPendente.toFixed(2)}
          </Typography>
        </Paper>

        {/* Lista de Cobranças */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Extrato de Cobranças
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {MOCK_COBRANCAS.map((cobranca) => (
            <Box 
              key={cobranca.id}
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                borderBottom: '1px solid #eee' 
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold">{cobranca.descricao}</Typography>
                <Typography variant="body2" color="text.secondary">Vencimento: {cobranca.dataVencimento}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6">R$ {cobranca.valor.toFixed(2)}</Typography>
                <Chip label={cobranca.status} color={getStatusColor(cobranca.status)} size="small" />
              </Box>
            </Box>
          ))}
        </Paper>
    </Box>
  );
}

export default FinanceiroPaciente;