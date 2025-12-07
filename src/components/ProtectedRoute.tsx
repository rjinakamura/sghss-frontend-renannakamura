import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; 

/**
 * Componente de HOC para proteger rotas.
 * Redireciona para /login se o usuário não estiver autenticado.
 */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Se o usuário NÃO estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />; 
}