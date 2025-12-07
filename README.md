# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# SGHSS - Frontend (Protótipo)

Este documento contém as instruções para execução local do projeto e o guia para validação dos perfis de acesso.

## 🚀 Como executar o projeto

Para executar o protótipo localmente a partir do repositório, siga os passos abaixo:

1.  **Clonagem do repositório:**
    ```bash
    git clone https://github.com/rjinakamura/sghss-frontend-renannakamura.git
    ```

2.  **Instalação das dependências:**
    Entre na pasta do projeto e execute:
    ```bash
    npm install
    ```

3.  **Execução do servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesso:**
    Abra o navegador e acesse o endereço local indicado no terminal (geralmente `http://localhost:5173`).

---

## 🔐 Guia de Verificação de Perfis de Usuário

Para validar o funcionamento do Controle de Acesso (RBAC) e as funcionalidades específicas de cada ator do sistema, utilize as credenciais de teste abaixo.

> **Nota:** A senha padrão para todos os usuários é `123`.

### 1. Perfil Administrador (Gestão Total)
* **Login:** `admin@sghss.com`
* **Senha:** `123`
* **Características:**
    * **Menu Lateral:** Deve visualizar todas as opções, incluindo "Profissionais" e "Relatórios" (exclusivas deste nível).
    * **Acesso:** Consegue entrar em todas as telas e gerenciar o sistema.

### 2. Perfil Médico (Visão Clínica)
* **Login:** `medico@sghss.com`
* **Senha:** `123`
* **Características:**
    * Foca no atendimento ao paciente.
    * Tem acesso às ferramentas operacionais.
    * **Bloqueio:** Não tem acesso a áreas estratégicas ou administrativas (como Relatórios gerenciais).

### 3. Perfil Paciente (Autoatendimento)
* **Login:** `paciente@sghss.com`
* **Senha:** `123`
* **Características:**
    * Valida a experiência do cliente final.
    * **Fluxo:** Navegação completamente diferente dos funcionários da clínica, focada em agendamentos e histórico pessoal.
