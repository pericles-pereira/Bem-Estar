# Bem-Estar Backend API 🌱

Backend completo para aplicativo de bem-estar usando Node.js, Express, Firebase Firestore e JWT.

## 🚀 Configuração Rápida

### 1. Instalar dependências:
```bash
cd backend
npm install
```

### 2. Configurar Firebase:
1. Acesse: https://console.firebase.google.com/
2. Crie um novo projeto: `bem-estar-app`
3. Configure Firestore Database (modo teste)
4. Baixe a chave de serviço e salve como `serviceAccountKey.json`

**📖 Guia completo**: [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)

### 3. Configurar Google OAuth (Opcional):
Para autenticação Google completa:

**📖 Guia detalhado**: [docs/GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md)

### 4. Configurar ambiente:
```bash
cp .env.example .env
```
Edite o `.env` com suas configurações Firebase e secrets.

### 5. Iniciar servidor:
```bash
npm run dev  # Para desenvolvimento com nodemon
# ou
npm start    # Para produção
```

**✅ Servidor rodará em:** `http://localhost:3000`

## 🏗️ Arquitetura

```
backend/
├── src/
│   ├── controllers/        # Controladores de rota (AuthController, MoodController)
│   ├── services/          # Lógica de negócio (AuthService, MoodService, TokenBlacklistService)
│   ├── middleware/        # Auth, validação e tratamento de erros
│   ├── routes/           # Definição de rotas (auth.js, mood.js)
│   ├── config/           # Configurações (Firebase, JWT, environment)
│   └── server.js         # Servidor Express principal
├── docs/                 # Documentação completa
├── scripts/              # Scripts de banco (setup, seed, reset)
└── index.js             # Ponto de entrada da aplicação
```

## 📊 Endpoints da API

### 🔐 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Body | Auth |
|--------|----------|-----------|------|------|
| `POST` | `/register` | Registrar usuário | `{name, email, password}` | ❌ |
| `POST` | `/login` | Login com email/senha | `{email, password}` | ❌ |
| `POST` | `/google-login` | Login com Google OAuth | `{googleToken, email, name}` | ❌ |
| `GET` | `/me` | Obter perfil do usuário | - | ✅ |
| `PUT` | `/me` | Atualizar perfil | `{name?}` | ✅ |
| `POST` | `/logout` | Logout (invalida token) | - | ✅ |

### 😊 Registro de Humor (`/api/mood`)

| Método | Endpoint | Descrição | Body | Auth |
|--------|----------|-----------|------|------|
| `GET` | `/` | Buscar registros do usuário | Query: `?startDate&endDate&limit` | ✅ |
| `POST` | `/` | Registrar novo humor | `{moodType, level, shortDescription?}` | ✅ |
| `PUT` | `/:id` | Atualizar registro | `{moodType?, level?, shortDescription?}` | ✅ |
| `DELETE` | `/:id` | Deletar registro | - | ✅ |
| `GET` | `/stats` | Estatísticas de humor | Query: `?startDate&endDate` | ✅ |

### 🎨 Utilitários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/` | Status da API | ❌ |
| `GET` | `/api/mood-types` | Tipos de humor disponíveis | ❌ |

## 🗄️ Estrutura do Banco (Firestore)

```
📁 users/
├── {userId}/
    ├── name: string                    # Nome do usuário
    ├── email: string (único)           # Email de login
    ├── password: string (bcrypt)       # Senha criptografada
    ├── registrationDate: timestamp     # Data de registro
    ├── loginProvider: string           # 'email' | 'google'
    └── googleId?: string               # ID do Google (se OAuth)

📁 mood_entries/
├── {entryId}/
    ├── userId: string                  # Referência ao usuário
    ├── moodType: string                # 'Triste' | 'Ansioso' | 'Neutro' | 'Feliz' | 'Motivado'
    ├── level: number (1-5)             # Intensidade do humor
    ├── registrationDate: string (ISO)  # Data do registro
    ├── shortDescription: string        # Descrição opcional
    ├── createdAt: timestamp            # Timestamp de criação
    └── updatedAt?: timestamp           # Timestamp de atualização

📁 blacklisted_tokens/
├── {tokenId}/
    ├── token: string                   # Hash do token invalidado
    ├── userId: string                  # Usuário do token
    ├── blacklistedAt: timestamp        # Quando foi invalidado
    └── expiresAt: timestamp            # Quando o token expira naturalmente
```

## 🔑 Sistema de Autenticação

### JWT + Token Blacklist
- **JWT Tokens**: Assinados com `JWT_SECRET` (duração: 7 dias)
- **Token Blacklist**: Invalidação ativa de tokens no logout
- **Google OAuth**: Verificação com `google-auth-library`
- **Middleware**: Verificação automática em rotas protegidas

### Headers requeridos para rotas protegidas:
```http
Authorization: Bearer <seu-jwt-token>
Content-Type: application/json
```

## 📝 Tipos de Humor Válidos

```javascript
const MOOD_TYPES = [
  { level: 1, name: 'Triste', icon: 'emoticon-sad-outline', color: '#E74C3C' },
  { level: 2, name: 'Ansioso', icon: 'emoticon-confused-outline', color: '#F39C12' },
  { level: 3, name: 'Neutro', icon: 'emoticon-neutral-outline', color: '#F1C40F' },
  { level: 4, name: 'Feliz', icon: 'emoticon-happy-outline', color: '#2ECC71' },
  { level: 5, name: 'Motivado', icon: 'emoticon-excited-outline', color: '#9B59B6' }
];
```

## ⚙️ Configuração Environment (.env)

```env
# JWT Configuration
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_DATABASE_URL=https://seu-projeto-default-rtdb.firebaseio.com

# Google OAuth (Opcional)
GOOGLE_CLIENT_ID=seu_google_client_id_aqui.apps.googleusercontent.com

# Server
PORT=3000
NODE_ENV=development
SESSION_SECRET=seu-session-secret-aqui
```

## 📖 Scripts Disponíveis

```bash
npm start          # Iniciar servidor de produção
npm run dev        # Desenvolvimento com nodemon
npm run setup      # Verificar configuração
npm run seed       # Popular banco com dados de teste
npm run reset      # Resetar banco de dados
```

## 🔥 Recursos e Tecnologias

### Backend
- **Express.js**: Framework web
- **Firebase Admin SDK**: Database e autenticação
- **JWT**: Autenticação stateless
- **bcrypt**: Criptografia de senhas
- **google-auth-library**: Verificação OAuth Google
- **CORS**: Cross-Origin Resource Sharing

### Middleware Personalizado
- **Authentication**: Verificação JWT + blacklist
- **Validation**: Validação de dados de entrada
- **Error Handling**: Tratamento centralizado de erros

### Security Features
- ✅ **Password Hashing**: bcrypt com salt
- ✅ **JWT Security**: Tokens assinados e verificados
- ✅ **Token Blacklist**: Invalidação ativa no logout
- ✅ **Input Validation**: Sanitização de dados
- ✅ **Error Sanitization**: Respostas seguras em produção
- ✅ **CORS Configuration**: Controle de origem

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| [🔧 FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) | Configuração Firebase e Firestore |
| [🔐 GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md) | Setup completo Google OAuth |
| [🧪 TESTES_COMPLETOS.md](docs/TESTES_COMPLETOS.md) | Guia de testes com exemplos |
| [📝 API_EXAMPLES.md](docs/API_EXAMPLES.md) | Exemplos práticos de uso |
| [🗃️ firebase-structure.md](docs/firebase-structure.md) | Estrutura detalhada do banco |

## 🚀 Exemplos Rápidos

### Registro e Login:
```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@teste.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@teste.com","password":"123456"}'
```

### Registro de Humor:
```bash
# Criar registro
curl -X POST http://localhost:3000/api/mood \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"moodType":"Feliz","level":4,"shortDescription":"Dia produtivo!"}'

# Buscar registros
curl -X GET "http://localhost:3000/api/mood?limit=10" \
  -H "Authorization: Bearer SEU_TOKEN"

# Obter estatísticas
curl -X GET "http://localhost:3000/api/mood/stats" \
  -H "Authorization: Bearer SEU_TOKEN"

# Tipos de humor disponíveis (público)
curl -X GET "http://localhost:3000/api/mood-types"
```

## ⚠️ Importante para Produção

- ✅ Configure `serviceAccountKey.json` do Firebase
- ✅ Use HTTPS obrigatório
- ✅ Configure regras de segurança no Firestore
- ✅ Mantenha `.env` fora do Git
- ✅ Use `NODE_ENV=production`
- ✅ Configure `CORS_ORIGIN` específico
- ✅ Monitore logs de erro
- ✅ Implemente rate limiting se necessário

## 🐛 Troubleshooting

### Problemas comuns:
1. **Firebase não conecta**: Verifique `serviceAccountKey.json`
2. **Token inválido**: Verifique `JWT_SECRET` no .env
3. **CORS errors**: Configure `CORS_ORIGIN` adequadamente
4. **Google OAuth falha**: Verifique `GOOGLE_CLIENT_ID`

### Logs úteis:
```bash
# Ver logs do servidor
npm run dev

# Verificar configuração
npm run setup
```

---

**🔗 API Base URL**: `http://localhost:3000`  
**📊 Status Endpoint**: `GET /`  
**📋 Endpoints Disponíveis**: Listados em `GET /*` (404 response)