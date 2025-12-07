// Tipagem do Paciente
export interface Patient {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  address: string;
}

// Dados Mockados de Pacientes (EXPORTADOS)
export const MOCK_PATIENTS: Patient[] = [
  { id: 1, name: "Maria da Silva", cpf: "123.456.789-00", birthDate: "1985-05-15", phone: "(11) 98765-4321", address: "Rua A, 100 - São Paulo" },
  { id: 2, name: "João de Souza", cpf: "987.654.321-99", birthDate: "1992-11-20", phone: "(21) 99876-5432", address: "Av. B, 250 - Rio de Janeiro" },
  { id: 3, name: "Ana Paula Lima", cpf: "333.222.111-00", birthDate: "1975-02-01", phone: "(31) 91234-5678", address: "Rua C, 50 - Belo Horizonte" },
];