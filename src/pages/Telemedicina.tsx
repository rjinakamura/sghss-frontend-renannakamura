import { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, IconButton, TextField, Avatar, CircularProgress, Chip
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

// Simulação de mensagens de chat
const MOCK_CHAT = [
  { sender: 'Dr. Carlos', text: 'Olá, bom dia! Como você está se sentindo hoje?' },
  { sender: 'Eu', text: 'Bom dia, Dr. Estou com um pouco de dor de cabeça.' },
];

function Telemedicina() {
  const navigate = useNavigate();
  
  // Estados da simulação
  const [status, setStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [messages, setMessages] = useState(MOCK_CHAT);
  const [newMessage, setNewMessage] = useState('');
  const [seconds, setSeconds] = useState(0);

  // Efeito para simular conexão e timer
  useEffect(() => {
    // Simula 2 segundos conectando
    const connectTimer = setTimeout(() => {
      setStatus('connected');
    }, 2000);

    // Timer da chamada
    const interval = setInterval(() => {
      if (status === 'connected') {
        setSeconds(s => s + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(interval);
    };
  }, [status]);

  // Formatado segundos em MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Eu', text: newMessage }]);
      setNewMessage('');
    }
  };

  const handleEndCall = () => {
    setStatus('ended');
    // Redireciona após 2 segundos para o dashboard
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  // Tela de Conexão
  if (status === 'connecting') {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: '#202124', color: 'white', flexDirection: 'column' }}>
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h5" sx={{ mt: 3 }}>Estabelecendo conexão segura...</Typography>
      </Box>
    );
  }

  // Tela de Fim de Chamada
  if (status === 'ended') {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: '#202124', color: 'white', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>Chamada Encerrada</Typography>
        <Typography variant="body1">Redirecionando para o painel...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#202124', overflow: 'hidden' }}>
      
      {/* ÁREA DE VÍDEO PRINCIPAL (O Médico) */}
      <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        
        {/* Simulação do Vídeo do Médico */}
        <Paper 
          elevation={4} 
          sx={{ 
            width: '100%', height: '100%', borderRadius: 4, bgcolor: '#3c4043', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <Avatar sx={{ width: 150, height: 150, bgcolor: 'primary.main', fontSize: 60, mb: 2 }}>DR</Avatar>
          <Typography variant="h5" sx={{ color: 'white' }}>Dr. Carlos Oliveira</Typography>
          <Chip label={formatTime(seconds)} sx={{ mt: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }} />

          {/* Minha Câmera (PIP - Picture in Picture) */}
          <Paper sx={{ 
            position: 'absolute', bottom: 20, right: 20, 
            width: 200, height: 150, bgcolor: 'black', 
            borderRadius: 2, border: '2px solid #555',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {camOn ? (
              <Typography variant="caption" color="gray">Minha Câmera</Typography>
            ) : (
              <VideocamOffIcon sx={{ color: 'white', fontSize: 40 }} />
            )}
          </Paper>
        </Paper>

        {/* BARRA DE CONTROLES (Inferior) */}
        <Box sx={{ 
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          bgcolor: 'rgba(0,0,0,0.6)', borderRadius: 10, px: 4, py: 2, display: 'flex', gap: 2
        }}>
          <IconButton onClick={() => setMicOn(!micOn)} sx={{ bgcolor: micOn ? '#3c4043' : '#ea4335', color: 'white', '&:hover': { bgcolor: '#555' } }}>
            {micOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          
          <IconButton onClick={() => setCamOn(!camOn)} sx={{ bgcolor: camOn ? '#3c4043' : '#ea4335', color: 'white', '&:hover': { bgcolor: '#555' } }}>
            {camOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>

          <IconButton onClick={handleEndCall} sx={{ bgcolor: '#ea4335', color: 'white', width: 60, borderRadius: 4, '&:hover': { bgcolor: '#d93025' } }}>
            <CallEndIcon />
          </IconButton>
        </Box>
      </Box>

      {/* BARRA LATERAL (Chat e Info) - Apenas em Desktop */}
      <Box sx={{ width: 350, bgcolor: 'white', display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">Chat da Consulta</Typography>
        </Box>
        
        {/* Área de Mensagens */}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ 
              alignSelf: msg.sender === 'Eu' ? 'flex-end' : 'flex-start',
              bgcolor: msg.sender === 'Eu' ? '#e3f2fd' : '#f5f5f5',
              p: 1.5, borderRadius: 2, maxWidth: '80%'
            }}>
              <Typography variant="caption" color="text.secondary" display="block">{msg.sender}</Typography>
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          ))}
        </Box>

        {/* Input de Mensagem */}
        <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
          <TextField 
            fullWidth size="small" placeholder="Digite uma mensagem..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

    </Box>
  );
}

export default Telemedicina;