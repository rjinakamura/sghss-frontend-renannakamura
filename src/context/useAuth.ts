import { useContext } from 'react';
import { AuthContext } from './AuthContext.tsx';

/**
 * Hook customizado useAuth.
 */
export const useAuth = () => {
  const context = useContext(AuthContext); 
  
  if (context === null) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context; 
};