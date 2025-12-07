import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { Typography, Box, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../context/useAuth';

// Define os papéis
type UserRole = 'admin' | 'medico' | 'paciente';

interface RoleBasedGuardProps {
  // A lista de papéis que são permitidos nesta rota
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

/**
 * Componente que protege uma rota, permitindo acesso apenas se o papel (role) do usuário estiver na lista de 'allowedRoles'*/
const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth(); // Pega o usuário do contexto de autenticação

  // 1. Pega o papel do usuário
  const userRole = user?.role;

  // 2. Verifica se o usuário tem um papel
  if (!isAuthenticated || !userRole) {
    // Se não tiver, manda para o login
    return <Navigate to="/login" replace />; 
  }

  // 3. Verifica se o papel do usuário está na lista de papéis permitidos
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>; // Sucesso = Renderiza a página
  }

  // 4. Falha = O usuário está logado, mas não tem permissão
  return (
    <Box sx={{ p: 4, textAlign: 'center', width: '100%' }}>
      <Alert severity="error" sx={{ textAlign: 'left' }}>
        <AlertTitle>Acesso Negado</AlertTitle>
        <Typography variant="body1">
          Você não tem permissão para visualizar esta página.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          (Seu papel atual: **{userRole.toUpperCase()}** / Requerido: **{allowedRoles.join(', ').toUpperCase()}**)
        </Typography>
      </Alert>
    </Box>
  );
};

export default RoleBasedGuard;