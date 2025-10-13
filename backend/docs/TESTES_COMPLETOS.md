# 🧪 Guia Completo de Testes - API Bem-Estar

Este documento contém todos os testes necessários para validar **TODAS** as rotas do backend usando **Postman** ou **Thunder Client**.

## 📋 Pré-requisitos

1. **Backend rodando**: Execute `npm start` na pasta `backend/`
2. **Ferramenta de teste**: Postman ou Thunder Client (extensão VS Code)
3. **URL Base**: `http://localhost:3000`

---

## 🔧 Configuração Inicial

### Headers Padrão para TODAS as requisições:
```
Content-Type: application/json
```

### Headers para Rotas Protegidas (após login):
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🧪 **TESTE 1: Verificar Status da API**

### ✅ GET - Status da API
```
GET http://localhost:3000/
```

**Resposta Esperada:**
```json
{
  "message": "API Bem-Estar funcionando!",
  "version": "1.0.0",
  "timestamp": "2025-10-02T14:30:00.000Z",
  "endpoints": {
    "auth": "/api/auth",
    "mood": "/api/mood"
  }
}
```

---

## 👤 **SEÇÃO: AUTENTICAÇÃO**

### 🧪 **TESTE 2: Registrar Usuário**

### ✅ POST - Registrar novo usuário
```
POST http://localhost:3000/api/auth/register
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao.silva@teste.com",
  "password": "MinhaSenh@123"
}
```

**Resposta Esperada:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "abc123def456",
    "name": "João Silva",
    "email": "joao.silva@teste.com",
    "registrationDate": "2025-10-02T14:30:00.000Z",
    "loginProvider": "email"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🧪 **TESTE 3: Login do Usuário**

### ✅ POST - Login
```
POST http://localhost:3000/api/auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "joao.silva@teste.com",
  "password": "MinhaSenh@123"
}
```

**Resposta Esperada:**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "abc123def456",
    "name": "João Silva",
    "email": "joao.silva@teste.com",
    "registrationDate": "2025-10-02T14:30:00.000Z",
    "loginProvider": "email"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANTE:** Copie o `token` da resposta para usar nos próximos testes!

---

### 🧪 **TESTE 4: Login com Google**

### ✅ POST - Google Login
```
POST http://localhost:3000/api/auth/google-login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "googleToken": "ya29.a0AfH6SMC...",
  "name": "Maria Santos",
  "email": "maria.santos@gmail.com"
}
```

**Resposta Esperada:**
```json
{
  "message": "Login com Google realizado com sucesso",
  "user": {
    "id": "def456ghi789",
    "name": "Maria Santos",
    "email": "maria.santos@gmail.com",
    "registrationDate": "2025-10-02T14:30:00.000Z",
    "loginProvider": "google",
    "googleId": "108234567890123456789"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔐 **SEÇÃO: ROTAS PROTEGIDAS**

**⚠️ Para os próximos testes, você DEVE incluir o token no header Authorization!**

### 🧪 **TESTE 5: Buscar Dados do Usuário**

### ✅ GET - Meus dados
```
GET http://localhost:3000/api/auth/me
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta Esperada:**
```json
{
  "user": {
    "id": "abc123def456",
    "name": "João Silva",
    "email": "joao.silva@teste.com",
    "registrationDate": "2025-10-02T14:30:00.000Z",
    "loginProvider": "email"
  }
}
```

---

### 🧪 **TESTE 6: Atualizar Dados do Usuário**

### ✅ PUT - Atualizar perfil
```
PUT http://localhost:3000/api/auth/me
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "name": "João Silva Santos"
}
```

**Resposta Esperada:**
```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "id": "abc123def456",
    "name": "João Silva Santos",
    "email": "joao.silva@teste.com",
    "registrationDate": "2025-10-02T14:30:00.000Z",
    "loginProvider": "email",
    "updatedAt": "2025-10-02T15:00:00.000Z"
  }
}
```

---

### 🧪 **TESTE 7: Logout (Invalidar Token)**

### ✅ POST - Logout com blacklist
```
POST http://localhost:3000/api/auth/logout
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta Esperada:**
```json
{
  "message": "Logout realizado com sucesso - token invalidado"
}
```

**⚠️ IMPORTANTE**: Após o logout, o token fica invalidado e não pode mais ser usado!

**Teste de Validação**: Tente usar o mesmo token em qualquer rota protegida:
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer TOKEN_USADO_NO_LOGOUT
```

**Resposta Esperada após Logout:**
```json
{
  "error": "Token foi invalidado",
  "code": "TOKEN_BLACKLISTED"
}
```

---

## 😊 **SEÇÃO: REGISTROS DE HUMOR**

### 🧪 **TESTE 8: Criar Registro de Humor - Feliz**

### ✅ POST - Registrar humor feliz
```
POST http://localhost:3000/api/mood
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "moodType": "Feliz",
  "level": 4,
  "shortDescription": "Dia produtivo no trabalho!"
}
```

**Resposta Esperada:**
```json
{
  "message": "Registro de humor criado com sucesso",
  "moodEntry": {
    "id": "mood123abc456",
    "userId": "abc123def456",
    "moodType": "Feliz",
    "level": 4,
    "shortDescription": "Dia produtivo no trabalho!",
    "registrationDate": "2025-10-02T15:30:00.000Z",
    "createdAt": "2025-10-02T15:30:00.000Z"
  }
}
```

---

### 🧪 **TESTE 9: Criar Registro de Humor - Ansioso**

### ✅ POST - Registrar humor ansioso
```
POST http://localhost:3000/api/mood
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "moodType": "Ansioso",
  "level": 2,
  "shortDescription": "Apresentação importante amanhã"
}
```

**Resposta Esperada:**
```json
{
  "message": "Registro de humor criado com sucesso",
  "moodEntry": {
    "id": "mood456def789",
    "userId": "abc123def456",
    "moodType": "Ansioso",
    "level": 2,
    "shortDescription": "Apresentação importante amanhã",
    "registrationDate": "2025-10-02T16:00:00.000Z",
    "createdAt": "2025-10-02T16:00:00.000Z"
  }
}
```

---

### 🧪 **TESTE 10: Criar Registro de Humor - Motivado**

### ✅ POST - Registrar humor motivado
```
POST http://localhost:3000/api/mood
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "moodType": "Motivado",
  "level": 5,
  "shortDescription": "Novo projeto começando!"
}
```

**Resposta Esperada:**
```json
{
  "message": "Registro de humor criado com sucesso",
  "moodEntry": {
    "id": "mood789ghi012",
    "userId": "abc123def456",
    "moodType": "Motivado",
    "level": 5,
    "shortDescription": "Novo projeto começando!",
    "registrationDate": "2025-10-02T16:30:00.000Z",
    "createdAt": "2025-10-02T16:30:00.000Z"
  }
}
```

---

### 🧪 **TESTE 11: Buscar Todos os Registros de Humor**

### ✅ GET - Listar meus registros
```
GET http://localhost:3000/api/mood
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta Esperada:**
```json
{
  "moodEntries": [
    {
      "id": "mood789ghi012",
      "userId": "abc123def456",
      "moodType": "Motivado",
      "level": 5,
      "shortDescription": "Novo projeto começando!",
      "registrationDate": "2025-10-02T16:30:00.000Z",
      "createdAt": "2025-10-02T16:30:00.000Z"
    },
    {
      "id": "mood456def789",
      "userId": "abc123def456",
      "moodType": "Ansioso",
      "level": 2,
      "shortDescription": "Apresentação importante amanhã",
      "registrationDate": "2025-10-02T16:00:00.000Z",
      "createdAt": "2025-10-02T16:00:00.000Z"
    },
    {
      "id": "mood123abc456",
      "userId": "abc123def456",
      "moodType": "Feliz",
      "level": 4,
      "shortDescription": "Dia produtivo no trabalho!",
      "registrationDate": "2025-10-02T15:30:00.000Z",
      "createdAt": "2025-10-02T15:30:00.000Z"
    }
  ],
  "total": 3
}
```

---

### 🧪 **TESTE 12: Atualizar Registro de Humor**

### ✅ PUT - Atualizar humor específico
```
PUT http://localhost:3000/api/mood/mood123abc456
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "moodType": "Feliz",
  "level": 5,
  "shortDescription": "Dia MUITO produtivo no trabalho! Consegui finalizar tudo!"
}
```

**Resposta Esperada:**
```json
{
  "message": "Registro de humor atualizado com sucesso",
  "moodEntry": {
    "id": "mood123abc456",
    "userId": "abc123def456",
    "moodType": "Feliz",
    "level": 5,
    "shortDescription": "Dia MUITO produtivo no trabalho! Consegui finalizar tudo!",
    "registrationDate": "2025-10-02T15:30:00.000Z",
    "createdAt": "2025-10-02T15:30:00.000Z",
    "updatedAt": "2025-10-02T17:00:00.000Z"
  }
}
```

---

### 🧪 **TESTE 13: Deletar Registro de Humor**

### ✅ DELETE - Deletar humor específico
```
DELETE http://localhost:3000/api/mood/mood456def789
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta Esperada:**
```json
{
  "message": "Registro de humor deletado com sucesso"
}
```

---

### 🧪 **TESTE 14: Obter Estatísticas de Humor**

### ✅ GET - Estatísticas do usuário
```
GET http://localhost:3000/api/mood/stats
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta Esperada:**
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
    "userId": "user456",
    "moodType": "Feliz",
    "level": 4,
    "registrationDate": "2025-10-02",
    "shortDescription": "Dia muito produtivo!",
    "createdAt": "2025-10-02T16:30:00Z"
  },
  "trend": "improving"
}
```

**💡 Explicação dos Campos:**
- `totalEntries`: Total de registros do usuário
- `averageMood`: Média dos níveis (1-5)
- `moodDistribution`: Contagem por tipo de humor
- `lastEntry`: Último registro feito
- `trend`: Tendência (improving/declining/stable)

---

### 🧪 **TESTE 15: Tipos de Humor Disponíveis**

### ✅ GET - Listar tipos de humor (público)
```
GET http://localhost:3000/api/mood-types
```

**Headers:**
```
Content-Type: application/json
```
**⚠️ NOTA**: Este endpoint é público, não requer autenticação!

**Resposta Esperada:**
```json
[
  { "level": 1, "name": "Triste", "icon": "emoticon-sad-outline", "color": "#E74C3C" },
  { "level": 2, "name": "Ansioso", "icon": "emoticon-confused-outline", "color": "#F39C12" },
  { "level": 3, "name": "Neutro", "icon": "emoticon-neutral-outline", "color": "#F1C40F" },
  { "level": 4, "name": "Feliz", "icon": "emoticon-happy-outline", "color": "#2ECC71" },
  { "level": 5, "name": "Motivado", "icon": "emoticon-excited-outline", "color": "#9B59B6" }
]
```

---

## 🚫 **SEÇÃO: TESTES DE ERRO**

### 🧪 **TESTE 16: Erro de Validação - Registro**

### ❌ POST - Registrar com dados inválidos
```
POST http://localhost:3000/api/auth/register
```

**Body (JSON):**
```json
{
  "name": "",
  "email": "email-invalido",
  "password": "123"
}
```

**Resposta Esperada (400):**
```json
{
  "error": "Dados de entrada inválidos",
  "details": [
    "Nome é obrigatório",
    "Email deve ter formato válido",
    "Senha deve ter pelo menos 6 caracteres"
  ]
}
```

---

### 🧪 **TESTE 17: Erro de Autenticação**

### ❌ GET - Acessar rota protegida sem token
```
GET http://localhost:3000/api/auth/me
```

**Headers:**
```
Content-Type: application/json
```

**Resposta Esperada (401):**
```json
{
  "error": "Token de acesso necessário"
}
```

---

### 🧪 **TESTE 18: Erro de Humor Inválido**

### ❌ POST - Criar humor com tipo inválido
```
POST http://localhost:3000/api/mood
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "moodType": "TipoInválido",
  "level": 10,
  "shortDescription": "Teste"
}
```

**Resposta Esperada (400):**
```json
{
  "error": "Dados de entrada inválidos",
  "details": [
    "Tipo de humor deve ser: Triste, Ansioso, Neutro, Feliz ou Motivado",
    "Nível deve estar entre 1 e 5"
  ]
}
```

---

### 🧪 **TESTE 19: Rota Não Encontrada**

### ❌ GET - Rota inexistente
```
GET http://localhost:3000/api/rota-inexistente
```

**Resposta Esperada (404):**
```json
{
  "error": "Endpoint não encontrado",
  "path": "/api/rota-inexistente",
  "available_endpoints": [
    "GET /",
    "GET /api/mood-types",
    "POST /api/auth/register",
    "POST /api/auth/login",
    "POST /api/auth/google-login",
    "GET /api/auth/me",
    "PUT /api/auth/me",
    "POST /api/auth/logout",
    "GET /api/mood",
    "POST /api/mood",
    "PUT /api/mood/:id",
    "DELETE /api/mood/:id",
    "GET /api/mood/stats"
  ]
}
```

---

## 📊 **RESUMO DOS TIPOS DE HUMOR VÁLIDOS**

| Tipo | Nível | Emoji | Descrição |
|------|-------|-------|-----------|
| `Triste` | 1-5 | 😢 | Sentimentos de tristeza |
| `Ansioso` | 1-5 | 😰 | Sentimentos de ansiedade |
| `Neutro` | 1-5 | 😐 | Estado neutro/equilibrado |
| `Feliz` | 1-5 | 😊 | Sentimentos de alegria |
| `Motivado` | 1-5 | 🚀 | Estado de motivação/energia |

---

## 🎯 **DADOS EXTRAS PARA TESTES**

### Usuários Adicionais:
```json
// Usuário 2
{
  "name": "Ana Costa",
  "email": "ana.costa@teste.com",
  "password": "MinhaSenh@456"
}

// Usuário 3
{
  "name": "Pedro Oliveira",
  "email": "pedro.oliveira@teste.com",
  "password": "MinhaSenh@789"
}
```

### Registros de Humor Variados:
```json
// Humor Triste
{
  "moodType": "Triste",
  "level": 2,
  "shortDescription": "Dia difícil no trabalho"
}

// Humor Neutro
{
  "moodType": "Neutro",
  "level": 3,
  "shortDescription": "Dia normal, sem grandes novidades"
}

// Humor Ansioso
{
  "moodType": "Ansioso",
  "level": 4,
  "shortDescription": "Preocupado com a entrega do projeto"
}
```

---

## ✅ **CHECKLIST DE TESTES**

- [ ] **TESTE 1**: Status da API
- [ ] **TESTE 2**: Registrar usuário
- [ ] **TESTE 3**: Login do usuário
- [ ] **TESTE 4**: Login com Google
- [ ] **TESTE 5**: Buscar dados do usuário
- [ ] **TESTE 6**: Atualizar dados do usuário
- [ ] **TESTE 7**: Logout (invalidar token)
- [ ] **TESTE 8**: Criar humor feliz
- [ ] **TESTE 9**: Criar humor ansioso
- [ ] **TESTE 10**: Criar humor motivado
- [ ] **TESTE 11**: Buscar todos os registros
- [ ] **TESTE 12**: Atualizar registro de humor
- [ ] **TESTE 13**: Deletar registro de humor
- [ ] **TESTE 14**: Obter estatísticas de humor
- [ ] **TESTE 15**: Teste endpoint mood-types
- [ ] **TESTE 16**: Erro de validação
- [ ] **TESTE 17**: Erro de autenticação
- [ ] **TESTE 18**: Erro de humor inválido
- [ ] **TESTE 19**: Rota não encontrada

---

## 🚀 **PRÓXIMOS PASSOS**

1. **Execute todos os testes** seguindo a ordem
2. **Copie os tokens** quando necessário
3. **Verifique as respostas** com os exemplos
4. **Teste cenários de erro** para validar robustez
5. **Documente qualquer problema** encontrado

**🎉 Parabéns! Você testou TODAS as funcionalidades do backend!**