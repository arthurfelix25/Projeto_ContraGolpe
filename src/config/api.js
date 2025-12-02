// Configuração centralizada de endpoints da API

// URLs base dos serviços (todas as requisições passam pelo Gateway na porta 8080)
export const API_BASE_URL = 'http://localhost:8080'
export const GOLPES_SERVICE_URL = 'http://localhost:8080'

// Endpoints do Empresa Service (porta 8080)
export const ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    VALIDATE: `${API_BASE_URL}/api/auth/validate`,
  },
  
  // Empresas
  EMPRESA: {
    CADASTRO: `${API_BASE_URL}/api/cadastroempresas`,
    CADASTRO_ADMIN: `${API_BASE_URL}/api/cadastroadmin`,
  },
  
  // Relatórios de golpes da empresa
  SCAM_REPORTS: {
    MY_COMPANY: `${API_BASE_URL}/api/scam-reports/my-company`,
    ME: `${API_BASE_URL}/api/scam-reports/me`,
  },
  
  // Admin - Gerenciar empresas
  ADMIN: {
    EMPRESAS: `${API_BASE_URL}/api/admin/empresas`,
    EMPRESA_BY_ID: (id) => `${API_BASE_URL}/api/admin/empresas/${id}`,
    DESATIVAR_EMPRESA: (id) => `${API_BASE_URL}/api/admin/empresas/${id}/desativar`,
    GOLPES: `${API_BASE_URL}/api/admin/golpes`,
    GOLPE_BY_ID: (id) => `${API_BASE_URL}/api/admin/golpes/${id}`,
  },
}

// Endpoints do Golpes Service (porta 8082)
export const GOLPES_ENDPOINTS = {
  // Público
  HEALTH: `${GOLPES_SERVICE_URL}/api/golpes/health`,
  RANKING: `${GOLPES_SERVICE_URL}/api/golpes/ranking`,
  CADASTRO_PUBLICO: `${GOLPES_SERVICE_URL}/api/cadastrogolpes`,
  RANKING_PUBLICO: `${GOLPES_SERVICE_URL}/api/cadastrogolpes/ranking`,
  
  // Autenticado
  GOLPES: `${GOLPES_SERVICE_URL}/api/golpes`,
  GOLPE_BY_ID: (id) => `${GOLPES_SERVICE_URL}/api/golpes/${id}`,
  
  // Busca por empresa
  BY_EMPRESA_NOME: (nome) => `${GOLPES_SERVICE_URL}/api/golpes/empresa/${nome}`,
  BY_EMPRESA_BUSCAR: (nome) => `${GOLPES_SERVICE_URL}/api/golpes/empresa/buscar/${nome}`,
  BY_EMPRESA_ID: (id) => `${GOLPES_SERVICE_URL}/api/golpes/empresa/id/${id}`,
}

// Helper para criar headers com autenticação
export const createAuthHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

// Helper para criar headers sem autenticação
export const createHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})
