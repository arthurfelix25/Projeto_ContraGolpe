# 📋 Documentação de Endpoints - ContraGolpe

## 🔐 Empresa Service (porta 8080)

### Autenticação
- **POST** `/api/auth/login` - Login de empresa
  - Body: `{ usuario, password }`
  - Retorna: `{ token, usuario, scamReports[] }`
  - Público

- **GET** `/api/auth/validate` - Validar token JWT
  - Header: `Authorization: Bearer {token}`
  - Retorna: "Token válido" ou 401
  - Requer: Autenticação

### Empresas
- **POST** `/api/cadastroempresas` - Cadastrar nova empresa
  - Body: `{ usuario, cnpj, password }`
  - Retorna: `{ id, usuario, cnpj, role, ativo }`
  - Público

- **POST** `/api/cadastroadmin` - Cadastrar admin
  - Body: `{ usuario, senha }`
  - Requer: ADMIN

### Relatórios de Golpes
- **GET** `/api/scam-reports/my-company` - Golpes da empresa logada
  - Requer: EMPRESA (autenticação)

- **GET** `/api/scam-reports/me` - Golpes da empresa logada (alternativo)
  - Requer: EMPRESA (autenticação)

### Admin - Gerenciar Empresas
- **GET** `/api/admin/empresas` - Listar todas empresas
  - Requer: ADMIN

- **GET** `/api/admin/empresas/{id}` - Buscar empresa por ID
  - Requer: ADMIN

- **PUT** `/api/admin/empresas/{id}` - Atualizar empresa
  - Requer: ADMIN

- **PUT** `/api/admin/empresas/{id}/desativar` - Desativar empresa
  - Requer: ADMIN

- **DELETE** `/api/admin/empresas/{id}` - Excluir empresa
  - Requer: ADMIN

### Admin - Gerenciar Golpes
- **GET** `/api/admin/golpes` - Listar todos golpes
  - Requer: ADMIN

- **DELETE** `/api/admin/golpes/{id}` - Excluir golpe
  - Requer: ADMIN

---

## 🚨 Golpes Service (porta 8082)

### Endpoints Públicos
- **GET** `/api/golpes/health` - Health check
  - Público

- **GET** `/api/golpes/ranking` - Ranking de empresas
  - Público

- **POST** `/api/cadastrogolpes` - Cadastrar golpe (público)
  - Body: `{ nome, cidade, cpf, meioDeContato, descricao, emailOuTelefone, empresa? }`
  - Público

- **GET** `/api/cadastrogolpes/ranking` - Ranking público
  - Público

### Endpoints Autenticados
- **POST** `/api/golpes` - Cadastrar golpe (empresa)
  - Body: `{ empresa, descricao, nome, cidade, cpf, meioDeContato, emailOuTelefone }`
  - Requer: EMPRESA

- **GET** `/api/golpes` - Listar todos golpes
  - Requer: ADMIN

- **PUT** `/api/golpes/{id}` - Atualizar golpe
  - Requer: ADMIN

- **DELETE** `/api/golpes/{id}` - Excluir golpe
  - Requer: ADMIN

### Busca por Empresa (Público para comunicação interna)
- **GET** `/api/golpes/empresa/{nome}` - Busca exata por nome
  - Público (para comunicação entre serviços)

- **GET** `/api/golpes/empresa/buscar/{nome}` - Busca parcial (LIKE)
  - Público (para comunicação entre serviços)

- **GET** `/api/golpes/empresa/id/{empresaId}` - Busca por ID da empresa
  - Público (para comunicação entre serviços)

---

## 🔑 Autenticação

### Como usar JWT:
1. Faça login em `/api/auth/login`
2. Receba o token no response
3. Inclua em requisições protegidas:
   ```
   Authorization: Bearer {seu-token-aqui}
   ```

### Roles disponíveis:
- **EMPRESA** - Empresa cadastrada
- **ADMIN** - Administrador do sistema

---

## 📝 Exemplos de Uso

### Login
```javascript
fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    usuario: 'BANCOXPTO', 
    password: 'senha123' 
  })
})
```

### Buscar golpes da empresa
```javascript
const token = localStorage.getItem('authToken')
fetch('http://localhost:8082/api/golpes/empresa/buscar/BANCOXPTO', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
})
```

### Ranking público
```javascript
fetch('http://localhost:8082/api/cadastrogolpes/ranking')
```
