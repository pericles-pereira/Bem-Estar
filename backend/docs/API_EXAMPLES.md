# 📖 Exemplos de Uso da API

Exemplos práticos para testar todas as funcionalidades do backend.

## 🔧 Configuração Base

### URL Base
```
http://localhost:3000/api
```

### Headers para rotas autenticadas
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT
```

## 🚀 Testando no Terminal

### 1. Registrar Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@teste.com", 
    "password": "123456"
  }'
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "abc123",
    "name": "João Silva",
    "email": "joao@teste.com"
  }
}
```

### 2. Fazer Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com",
    "password": "123456"
  }'
```

### 3. Login Google
```bash
curl -X POST http://localhost:3000/api/auth/google-login \
  -H "Content-Type: application/json" \
  -d '{
    "googleToken": "seu_token_google_aqui",
    "name": "João Silva",
    "email": "joao@gmail.com"
  }'
```

## 👤 Exemplos com Perfil de Usuário

### Atualizar Perfil
```bash
curl -X PUT http://localhost:3000/api/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "name": "João Santos Silva"
  }'
```
### Ver Informações do Usuário
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  http://localhost:3000/api/auth/me
```

### Logout (Invalidar Token)
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Resposta:**
```json
{
  "message": "Logout realizado com sucesso - token invalidado"
}
```

## 😊 Exemplos com Registro de Humor

### Registrar Humor
```bash
curl -X POST http://localhost:3000/api/mood \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "moodType": "Feliz",
    "level": 4,
    "shortDescription": "Me sentindo muito bem hoje!"
  }'
```

### Buscar Registros de Humor
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  "http://localhost:3000/api/mood"
```

### Buscar Registros com Filtros
```bash
# Filtrar por período
curl -H "Authorization: Bearer SEU_TOKEN" \
  "http://localhost:3000/api/mood?startDate=2025-10-01&endDate=2025-10-02"

# Limitar resultados
curl -H "Authorization: Bearer SEU_TOKEN" \
  "http://localhost:3000/api/mood?limit=5"
```

### Obter Estatísticas de Humor
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  "http://localhost:3000/api/mood/stats"
```

**Resposta de Estatísticas:**
```json
{
  "totalEntries": 15,
  "averageMood": 3.4,
  "moodDistribution": {
    "Triste": 2,
    "Ansioso": 3,
    "Neutro": 4,
    "Feliz": 4,
    "Motivado": 2
  },
  "lastEntry": {
    "id": "abc123",
    "moodType": "Feliz",
    "level": 4,
    "registrationDate": "2025-10-02",
    "shortDescription": "Dia produtivo!"
  },
  "trend": "improving"
}
```

### Atualizar Registro de Humor
```bash
curl -X PUT http://localhost:3000/api/mood/ID_DO_REGISTRO \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "moodType": "Motivado",
    "level": 5,
    "shortDescription": "Atualizado: Dia incrível!"
  }'
```

### Deletar Registro de Humor
```bash
curl -X DELETE http://localhost:3000/api/mood/ID_DO_REGISTRO \
  -H "Authorization: Bearer SEU_TOKEN"
```

## 🎨 Exemplos com Utilitários

### Verificar Tipos de Humor Disponíveis
```bash
curl -X GET http://localhost:3000/api/mood-types
```

**Resposta:**
```json
[
  { "level": 1, "name": "Triste", "icon": "emoticon-sad-outline", "color": "#E74C3C" },
  { "level": 2, "name": "Ansioso", "icon": "emoticon-confused-outline", "color": "#F39C12" },
  { "level": 3, "name": "Neutro", "icon": "emoticon-neutral-outline", "color": "#F1C40F" },
  { "level": 4, "name": "Feliz", "icon": "emoticon-happy-outline", "color": "#2ECC71" },
  { "level": 5, "name": "Motivado", "icon": "emoticon-excited-outline", "color": "#9B59B6" }
]
```

## 🛠️ Testando no PowerShell

### Registrar usuário (Windows)
```powershell
$body = @{
    name = "Maria Silva"
    email = "maria@teste.com"
    password = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### Registrar humor (Windows)
```powershell
$headers = @{
    "Authorization" = "Bearer SEU_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    moodType = "Feliz"
    level = 4
    shortDescription = "Dia incrível no trabalho!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/mood" `
  -Method POST `
  -Body $body `
  -Headers $headers
```

## 🚨 Erros Comuns de Resposta

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Token inválido ou expirado"
}
```

### 400 Bad Request
```json
{
  "error": "Dados de entrada inválidos",
  "details": [
    "Tipo de humor deve ser: Triste, Ansioso, Neutro, Feliz ou Motivado",
    "Nível deve estar entre 1 e 5"
  ]
}
```

### 404 Not Found
```json
{
  "error": "Registro de humor não encontrado"
}
```

## ✅ Dicas de Sucesso

1. **Sempre inclua o header Authorization** para rotas protegidas
2. **Use Content-Type correto** (application/json)
3. **Verifique códigos de status de resposta**
4. **Salve o JWT token** do login/register
5. **Use formatos de data adequados** (string ISO)

## 🔗 Links Úteis

- **API Base**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/
- **Tipos de Humor**: http://localhost:3000/api/mood-types
- **Console Firebase**: https://console.firebase.google.com

## 🎯 Fluxo Típico de Uso

1. **Registrar/Login** → Obter token
2. **Registrar humor** → Acompanhar bem-estar diário
3. **Ver histórico** → Analisar padrões de humor
4. **Ver estatísticas** → Insights sobre tendências
5. **Atualizar perfil** → Manter dados atualizados
6. **Logout** → Invalidar token por segurança

## 🔍 Dicas de Debug

### Ver logs do servidor:
```bash
npm start
# Logs aparecem no terminal
```

## 📊 Tipos de Humor Válidos

| Tipo | Nível | Emoji | Descrição |
|------|-------|-------|-----------|
| `Triste` | 1-5 | 😢 | Sentimentos de tristeza |
| `Ansioso` | 1-5 | 😰 | Sentimentos de ansiedade |
| `Neutro` | 1-5 | 😐 | Estado neutro/equilibrado |
| `Feliz` | 1-5 | 😊 | Sentimentos de alegria |
| `Motivado` | 1-5 | 🚀 | Estado de motivação/energia |
