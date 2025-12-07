export interface Professional {
  id: string;
  name: string;
  role: 'Médico' | 'Enfermeiro' | 'Administrativo';
  specialty: string;
  crm?: string; // apenas para médicos
  email: string;
  phone: string;
}

export const MOCK_PROFESSIONALS: Professional[] = [
  { 
    id: 'prof1', 
    name: 'Dr. Carlos Oliveira', 
    role: 'Médico', 
    specialty: 'Clínica Geral', 
    crm: '12345-SP', 
    email: 'carlos.oliveira@sghss.com', 
    phone: '(11) 99999-1001' 
  },
  { 
    id: 'prof2', 
    name: 'Dra. Ana Costa', 
    role: 'Médico', 
    specialty: 'Cardiologia', 
    crm: '67890-RJ', 
    email: 'ana.costa@sghss.com', 
    phone: '(21) 98888-2002' 
  },
  { 
    id: 'prof3', 
    name: 'Enf. Bruno Lima', 
    role: 'Enfermeiro', 
    specialty: 'Triagem', 
    email: 'bruno.lima@sghss.com', 
    phone: '(31) 97777-3003' 
  },
  { 
    id: 'prof4', 
    name: 'Dra. Sofia Almeida', 
    role: 'Médico', 
    specialty: 'Dermatologia', 
    crm: '54321-MG', 
    email: 'sofia.almeida@sghss.com', 
    phone: '(31) 96666-4004' 
  },
];