# 🔧 Como Recompilar o Backend

## Opção 1: Usando o IntelliJ IDEA ou Eclipse

1. Abra o projeto `MircroservicoGolpe` na sua IDE
2. Clique com botão direito no módulo `empresa_service`
3. Selecione **Maven** → **Reload Project**
4. Depois **Maven** → **Clean**
5. Depois **Maven** → **Install** (ou **Package**)
6. Reinicie o serviço

## Opção 2: Linha de Comando (PowerShell)

### Passo 1: Parar os serviços
```powershell
taskkill /F /IM java.exe
```

### Passo 2: Navegar até a pasta do microserviço
```powershell
# Ajuste o caminho conforme sua estrutura
cd "C:\Users\rayan\OneDrive\Documents\Nova pasta\MircroservicoGolpe"
# OU
cd "C:\Users\rayan\Downloads\MircroservicoGolpe-main\MircroservicoGolpe"
```

### Passo 3: Recompilar empresa_service
```powershell
cd empresa_service
.\mvnw.cmd clean package -DskipTests
```

### Passo 4: Recompilar golpes_service
```powershell
cd ..
cd golpes_service
.\mvnw.cmd clean package -DskipTests
```

### Passo 5: Iniciar empresa_service
```powershell
cd ..
cd empresa_service
java -jar target/*.jar
```

### Passo 6: Em OUTRA janela do PowerShell, iniciar golpes_service
```powershell
cd "C:\Users\rayan\OneDrive\Documents\Nova pasta\MircroservicoGolpe"
cd golpes_service
java -jar target/*.jar
```

---

## ✅ Como saber se funcionou?

Após reiniciar, os logs devem mostrar:
```
>>> [JwtAuthFilter] Processing request: /api/golpes/empresa/BANCOXPTO
```

Note o `/golpes/` no caminho!

---

## 🚨 Se não souber onde está a pasta MircroservicoGolpe

Execute no PowerShell:
```powershell
Get-ChildItem -Path "C:\Users\rayan" -Filter "MircroservicoGolpe" -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object FullName
```

Isso vai procurar a pasta em todo o seu usuário.
