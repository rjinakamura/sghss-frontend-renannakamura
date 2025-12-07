import { 
  useState, 
  type ReactNode,
  createContext 
} from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Tipagem do Usuário
interface User {
  id: string;
  email: string;
  role: 'admin' | 'medico' | 'paciente'; 
}

// Tipagem do Contexto 
export interface AuthContextType {
  user: User | null; 
  login: (email: string, pass: string) => boolean; 
  logout: () => void;
  isAuthenticated: boolean; 
}

//  Base de dados de usuários de teste
const MOCK_USERS: User[] = [
  { id: 'U001', email: 'admin@sghss.com', role: 'admin' },
  { id: 'U002', email: 'medico@sghss.com', role: 'medico' },
  { id: 'U003', email: 'paciente@sghss.com', role: 'paciente' },
];

// Valor Padrão
// eslint-disable-next-line react-refresh/only-export-components
export const defaultAuthContextValue: AuthContextType = {
  user: null,
  login: () => false, 
  logout: () => {}, 
  isAuthenticated: false,
};

// Criação do Contexto (EXPORTADO para o useAuth, não esquecr)
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue); 

/**
 * Provedor de Autenticação (AuthProvider). 
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const navigate = useNavigate(); 

  const login = (email: string, pass: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.email === email);

    // *** INÍCIO DA DEPURAÇÃO ***
    if (foundUser) {
      console.log("Usuário encontrado:", foundUser.email);
      console.log("Papel (Role) encontrado:", foundUser.role);
      console.log("A verificação (foundUser.role === 'paciente') retorna:", foundUser.role === 'paciente');
    } else {
      console.log("Usuário NÃO encontrado para o email:", email);
    }
    // *** FIM DA DEPURAÇÃO ***

    if (foundUser && pass.length > 0) {
      setUser(foundUser);
      
      // Lógica de Redirecionamento
      if (foundUser.role === 'paciente') {
        console.log("Redirecionando para /agendar-consulta");
        navigate('/agendar-consulta');
      } else {
        console.log("Redirecionando para /dashboard");
        navigate('/dashboard'); 
      }
      
      return true; 
    } else {
      setUser(null);
      return false; 
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); 
  };

  const value = { user, login, logout, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};