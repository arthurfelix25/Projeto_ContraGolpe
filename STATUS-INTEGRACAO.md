# 📊 Status da Integração Frontend ↔️ Backend

## ✅ Frontend - PRONTO
- [x] Endpoints configurados em `src/config/api.js`
- [x] RegisterCompaines usando endpoints corretos
- [x] Compaines usando endpoint de ranking
- [x] EmpresaDashboard usando endpoint de busca
- [x] CORS configurado no código

## ⚠️ Backend - PRECISA RECOMPILAR

### Problema Atual:
O backend está usando código antigo. Os logs mostram:
```
/api/empresa/BANCOXPTO  ❌ (URL antiga)
```

Deveria mostrar:
```
/api/golpes/empresa/BANCOXPTO  ✅ (URL correta)
```

### Arquivos que foram corrigidos (mas não compilados):
1. ✅ `empresa_service/.../ScamRetrievalService.java`
   - URLs corrigidas de `/api/empresa/` para `/api/golpes/empresa/`

2. ✅ `empresa_service/.../SecurityConfig.java`
   - CORS configurado

3. ✅ `golpes_service/.../SecurityConfig.java`
   - CORS configurado
   - Endpoints `/api/golpes/empresa/**` tornados públicos

### O que falta:
🔴 **RECOMPILAR E REINICIAR OS SERVIÇOS**

---

## 🎯 Ação Necessária

Execute estes comandos no PowerShell:

```powershell
# 1. Parar serviços
taskkill /F /IM java.exe

# 2. Ir para a pasta do microserviço (ajuste o caminho)
cd "C:\caminho\para\MircroservicoGolpe"

# 3. Recompilar empresa_service
cd empresa_service
.\mvnw.cmd clean package -DskipTests
cd ..

# 4. Recompilar golpes_service
cd golpes_service
.\mvnw.cmd clean package -DskipTests
cd ..

# 5. Iniciar empresa_service (em uma janela)
start powershell -NoExit -Command "cd empresa_service; java -jar target/*.jar"

# 6. Aguardar 5 segundos

# 7. Iniciar golpes_service (em outra janela)
start powershell -NoExit -Command "cd golpes_service; java -jar target/*.jar"
```

---

## 🧪 Como Testar Após Recompilar

### 1. Teste o Ranking (sem login)
- URL: http://localhost:5173/empresas
- Deve mostrar ranking de empresas

### 2. Teste o Cadastro
- Criar conta de teste
- Usuário: TESTE
- CNPJ: 12345678901234
- Senha: 123456

### 3. Teste o Login
- Fazer login com a conta criada
- Verificar no console: `localStorage.getItem('authToken')`
- Deve redirecionar para `/empresa`

### 4. Teste o Dashboard
- Após login, ver golpes da empresa
- Se não houver golpes, mostrará mensagem apropriada

---

## 📞 Precisa de Ajuda?

Se não souber onde está a pasta MircroservicoGolpe, execute:
```powershell
Get-ChildItem -Path "C:\Users\rayan" -Filter "MircroservicoGolpe" -Recurse -Directory -ErrorAction SilentlyContinue
```
