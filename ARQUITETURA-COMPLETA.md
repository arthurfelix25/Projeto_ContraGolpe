# 🏗️ Arquitetura Completa do Sistema ContraGolpe

## 📊 Visão Geral

Sistema para denúncia de golpes do tipo "presente", com frontend React e backend em microserviços Spring Boot.

---

## 🎨 FRONTEND (React + Vite)

### Tecnologias:
- React 18
- React Router DOM
- Tailwind CSS
- Vite (build tool)

### Porta: `5173` (desenvolvimento)

### Rotas:
- `/` - Home (página inicial)
- `/info` - Informações
- `/register` - Cadastro de golpe (PÚBLICO - pessoas)
- `/empresas` - Ranking de empresas com mais golpes
- `/rempresas` - Login/Registro de empresas
- `/empresa` - Dashboard da empresa (após login)

### Componentes Principais:

#### 1. **Home.jsx**
- Página inicial
- Links para cadastro de pessoa e empresa

#### 2. **Register.jsx** (Cadastro Público de Golpe)
- Formulário para pessoas denunciarem golpes
- Campos: nome, cidade, empresa, email/telefone, CPF, meio de contato, descrição
- **Endpoint**: `POST http://localhost:8080/api/cadastrogolpes`
- ⚠️ **PROBLEMA**: Está usando porta 8080 mas deveria usar endpoint correto

#### 3. **RegisterCompaines.jsx** (Login/Registro de Empresas)
- Formulário de login e registro de empresas
- Login: `POST http://localhost:8080/api/auth/login`
- Registro: `POST http://localhost:8080/api/cadastroempresas`
- Salva token JWT e usuário no localStorage
- Redireciona para `/empresa` após login

#### 4. **Compaines.jsx** (Ranking Público)
- Mostra ranking de empresas com mais golpes
- **Endpoint**: `GET http://localhost:8082/api/cadastrogolpes/ranking`
- Público (sem autenticação)

#### 5. **EmpresaDashboard.jsx** (Dashboard da Empresa)
- Mostra golpes relacionados à empresa logada
- **Endpoint**: `GET http://localhost:8082/api/golpes/empresa/buscar/{nome}`
- Requer autenticação (JWT token)
- Paginação local

### Configuração de API (`src/config/api.js`):
```javascript
API_BASE_URL = 'http://localhost:8080'  // Gateway ou Empresa Service
GOLPES_SERVICE_URL = 'http://localhost:8082'  // Golpes Service
```

---

## 🔧 BACKEND (Microserviços Spring Boot)

### Arquitetura:
```
Frontend (5173)
    ↓
Gateway (8080) ← FALTA IMPLEMENTAR?
    ↓
├─→ Empresa Service (8081)
│   └─→ MySQL (empresas_db)
│
└─→ Golpes Service (8081) ← PORTA CONFLITANTE!
    └─→ MySQL (golpe_db)
```

---

## 🏢 EMPRESA SERVICE

### Porta: `8081`
### Database: `empresas_db` (MySQL)

### Responsabilidades:
- Autenticação de empresas (JWT)
- Cadastro de empresas
- Gerenciamento de empresas (CRUD)
- Buscar golpes relacionados à empresa (via Golpes Service)

### Endpoints Principais:

#### Autenticação:
- `POST /api/auth/login` - Login de empresa
- `GET /api/auth/validate` - Validar token

#### Empresas:
- `POST /api/cadastroempresas` - Cadastrar empresa (público)
- `POST /api/cadastroadmin` - Cadastrar admin (requer ADMIN)

#### Relatórios:
- `GET /api/scam-reports/my-company` - Golpes da empresa logada
- `GET /api/scam-reports/me` - Golpes da empresa logada (alternativo)

#### Admin:
- `GET /api/admin/empresas` - Listar empresas
- `GET /api/admin/empresas/{id}` - Buscar empresa
- `PUT /api/admin/empresas/{id}` - Atualizar empresa
- `DELETE /api/admin/empresas/{id}` - Excluir empresa

### Configuração Atual:
```properties
server.port=8081
scam.service.base-url=http://localhost:8082  ✅ CORRETO
```

### Comunicação com Golpes Service:
- `ScamRetrievalService` faz requisições HTTP para buscar golpes
- URL corrigida: `/api/golpes/empresa/{nome}`
- Timeout: 5000ms

---

## 🚨 GOLPES SERVICE

### Porta: `8081` ⚠️ **CONFLITO COM EMPRESA SERVICE!**
### Database: `golpe_db` (MySQL)

### Responsabilidades:
- Cadastro de golpes (público e autenticado)
- Listagem de golpes
- Ranking de empresas
- Busca de golpes por empresa

### Endpoints Principais:

#### Público:
- `GET /api/golpes/health` - Health check
- `GET /api/golpes/ranking` - Ranking de empresas
- `POST /api/cadastrogolpes` - Cadastrar golpe (público)
- `GET /api/cadastrogolpes/ranking` - Ranking público
- `GET /api/golpes/empresa/{nome}` - Busca por empresa (público para comunicação interna)
- `GET /api/golpes/empresa/buscar/{nome}` - Busca parcial (público)
- `GET /api/golpes/empresa/id/{empresaId}` - Busca por ID (público)

#### Autenticado:
- `POST /api/golpes` - Cadastrar golpe (EMPRESA)
- `GET /api/golpes` - Listar todos (ADMIN)
- `PUT /api/golpes/{id}` - Atualizar (ADMIN)
- `DELETE /api/golpes/{id}` - Excluir (ADMIN)

### Configuração Atual:
```properties
server.port=8081  ❌ CONFLITO!
```

---

## 🔐 AUTENTICAÇÃO E SEGURANÇA

### JWT (JSON Web Token):
- Secret compartilhado entre serviços
- Expiration: 3600000ms (1 hora)
- Roles: `EMPRESA`, `ADMIN`

### CORS:
- Configurado para aceitar `http://localhost:*`
- Permite credenciais
- Headers: Authorization, Content-Type, Accept

### Fluxo de Autenticação:
1. Empresa faz login → recebe JWT token
2. Token armazenado no localStorage
3. Requisições protegidas incluem: `Authorization: Bearer {token}`
4. Backend valida token e extrai role/empresaId

---

## 🐛 PROBLEMAS IDENTIFICADOS

### 1. ⚠️ CONFLITO DE PORTAS
**Problema**: Empresa Service e Golpes Service ambos na porta 8081
**Solução**: Mudar Golpes Service para porta 8082

### 2. ⚠️ GATEWAY AUSENTE
**Problema**: Frontend acessa diretamente os microserviços
**Situação**: Parece haver um gateway na porta 8080, mas não está no workspace
**Solução**: 
- Opção A: Implementar gateway (Spring Cloud Gateway)
- Opção B: Frontend acessa diretamente (atual)

### 3. ⚠️ ENDPOINT INCONSISTENTE NO REGISTER.JSX
**Problema**: Register.jsx usa `http://localhost:8080/api/cadastrogolpes`
**Deveria**: Usar `http://localhost:8082/api/cadastrogolpes` (Golpes Service)
**Ou**: Se houver gateway, está correto

### 4. ✅ CORS CONFIGURADO (resolvido)
- Empresa Service: ✅
- Golpes Service: ✅

### 5. ✅ URLs CORRIGIDAS (resolvido)
- ScamRetrievalService: `/api/golpes/empresa/` ✅

---

## 🎯 CONFIGURAÇÃO RECOMENDADA

### Opção 1: COM GATEWAY (Recomendado)
```
Frontend (5173) → Gateway (8080)
                      ↓
    ┌─────────────────┴─────────────────┐
    ↓                                   ↓
Empresa Service (8081)          Golpes Service (8082)
```

**Vantagens**:
- Ponto único de entrada
- Roteamento centralizado
- Load balancing
- Autenticação centralizada

### Opção 2: SEM GATEWAY (Atual)
```
Frontend (5173)
    ↓
    ├─→ Empresa Service (8081)
    └─→ Golpes Service (8082)
```

**Vantagens**:
- Mais simples
- Menos overhead

---

## 📝 AÇÕES NECESSÁRIAS

### URGENTE:
1. ✅ Corrigir porta do Golpes Service: 8081 → 8082
2. ✅ Recompilar ambos os serviços
3. ✅ Reiniciar serviços

### IMPORTANTE:
4. ⚠️ Corrigir Register.jsx para usar porta correta
5. ⚠️ Decidir sobre Gateway (implementar ou remover referências)
6. ⚠️ Testar fluxo completo

### OPCIONAL:
7. Adicionar validações no frontend
8. Melhorar tratamento de erros
9. Adicionar loading states
10. Implementar refresh token

---

## 🧪 FLUXO DE TESTE COMPLETO

### 1. Cadastro Público de Golpe (Pessoa):
```
Frontend: /register
    ↓
POST http://localhost:8082/api/cadastrogolpes
    ↓
Golpes Service salva no banco
```

### 2. Cadastro de Empresa:
```
Frontend: /rempresas (aba Registrar)
    ↓
POST http://localhost:8080/api/cadastroempresas
    ↓
Empresa Service salva no banco
```

### 3. Login de Empresa:
```
Frontend: /rempresas (aba Login)
    ↓
POST http://localhost:8080/api/auth/login
    ↓
Empresa Service valida e retorna JWT
    ↓
Frontend salva token no localStorage
    ↓
Redireciona para /empresa
```

### 4. Dashboard da Empresa:
```
Frontend: /empresa
    ↓
GET http://localhost:8082/api/golpes/empresa/buscar/{nome}
Header: Authorization: Bearer {token}
    ↓
Golpes Service retorna golpes
    ↓
Frontend exibe em tabela paginada
```

### 5. Ranking Público:
```
Frontend: /empresas
    ↓
GET http://localhost:8082/api/cadastrogolpes/ranking
    ↓
Golpes Service retorna ranking
    ↓
Frontend exibe com medalhas
```

---

## 📊 RESUMO DO STATUS

| Componente | Status | Porta | Observações |
|------------|--------|-------|-------------|
| Frontend | ✅ OK | 5173 | Configurado corretamente |
| Empresa Service | ⚠️ Precisa recompilar | 8081 | URLs corrigidas |
| Golpes Service | ❌ Porta errada | 8081→8082 | Conflito de porta |
| Gateway | ❓ Desconhecido | 8080 | Não está no workspace |
| CORS | ✅ OK | - | Configurado |
| JWT | ✅ OK | - | Funcionando |

---

## 🚀 PRÓXIMOS PASSOS

1. Mudar porta do Golpes Service para 8082
2. Recompilar ambos os serviços
3. Reiniciar todos os serviços
4. Testar fluxo completo
5. Corrigir Register.jsx se necessário
6. Documentar ou implementar Gateway
