import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importa os componentes do Material-UI (MUI) para temas e reset de CSS
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Cria a instância de tema base do MUI, usado para cores e tipografia
const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Envolve a aplicação com o StrictMode do React para detecção de problemas
  <React.StrictMode>
    {/* ThemeProvider do MUI: Aplica o tema a todos os componentes*/}
    <ThemeProvider theme={theme}>
      {/* CssBaseline do MUI: Aplica o reset de CSS padrão para consistência entre navegadores */}
      <CssBaseline />
      
      {/*  Redenrizando o app aqui */}
      <App /> 
      
    </ThemeProvider>
  </React.StrictMode>,
);