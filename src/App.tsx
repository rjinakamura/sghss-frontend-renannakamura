import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'; 

// Importa os componentes de página
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import PatientsPage from './pages/Patients.tsx'; 
import Agendamentos from './pages/Agendamentos.tsx'; 
import AgendarConsulta from './pages/AgendarConsulta.tsx'; 
import Relatorios from './pages/Relatorios.tsx'; 
import FinanceiroPaciente from './pages/FinanceiroPaciente.tsx';
import ProfessionalsPage from './pages/Professionals.tsx';
import Telemedicina from './pages/Telemedicina.tsx'; // A Sala de Vídeo (Tela Cheia)
import TelemedicinaIndex from './pages/TelemedicinaIndex.tsx';

import ProtectedRoute from './components/ProtectedRoute'; 
import RoleBasedGuard from './components/RoleBasedGuard'; 
import Layout from './components/Layout.tsx'; 

/**
 * Componente principal da aplicação (App).
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          {/* --- Rotas Públicas --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} /> 
          
          {/* --- Rotas Protegidas --- */}
          <Route element={<ProtectedRoute />}>
            
            {/* ROTA DA SALA DE VÍDEO (Tela Cheia)*/}
            <Route path="/video-chamada" element={
              <RoleBasedGuard allowedRoles={['admin', 'medico', 'paciente']}>
                <Telemedicina />
              </RoleBasedGuard>
            } />

            {/* LAYOUT PRINCIPAL (Com Sidebar)
               Todas as páginas administrativas e de gestão ficam aqui.
            */}
            <Route element={<Layout />}> 

              {/* NOVA ROTA: Lista de Telemedicina (Dentro do Layout) */}
              <Route path="/telemedicina" element={
                <RoleBasedGuard allowedRoles={['admin', 'medico', 'paciente']}>
                  <TelemedicinaIndex />
                </RoleBasedGuard>
              } />

              {/* Admin/Medico */}
              <Route path="/dashboard" element={
                <RoleBasedGuard allowedRoles={['admin', 'medico']}>
                  <Dashboard />
                </RoleBasedGuard>
              } />
              <Route path="/patients" element={
                <RoleBasedGuard allowedRoles={['admin', 'medico']}>
                  <PatientsPage />
                </RoleBasedGuard>
              } />
              <Route path="/agendamentos" element={
                <RoleBasedGuard allowedRoles={['admin', 'medico']}>
                  <Agendamentos />
                </RoleBasedGuard>
              } />
              
              {/* Só Admin */}
              <Route path="/relatorios" element={
                <RoleBasedGuard allowedRoles={['admin']}>
                  <Relatorios />
                </RoleBasedGuard>
              } />
              <Route path="/professionals" element={
                <RoleBasedGuard allowedRoles={['admin']}>
                  <ProfessionalsPage />
                </RoleBasedGuard>
              } />

              {/* Paciente (e Admin para teste) */}
              <Route path="/agendar-consulta" element={
                <RoleBasedGuard allowedRoles={['paciente', 'admin']}>
                  <AgendarConsulta />
                </RoleBasedGuard>
              } />
              <Route path="/meu-financeiro" element={
                <RoleBasedGuard allowedRoles={['paciente', 'admin']}>
                  <FinanceiroPaciente />
                </RoleBasedGuard>
              } />
            
            </Route> {/* Fim do Layout */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;