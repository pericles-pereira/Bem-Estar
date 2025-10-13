# Estrutura de Dados - Firebase Firestore 🗃️

O sistema utiliza Firebase Firestore como banco de dados NoSQL. No Firestore, trabalhamos com **Coleções** (equivalente a tabelas) e **Documentos** (equivalente a registros).

## 🏗️ Arquitetura de Dados

### 📁 Coleção `users`
Armazena informações dos usuários registrados na plataforma.

```
users/
├── {userId}/                        ← ID único do documento
    ├── name: string                 ← Nome completo do usuário
    ├── email: string (único)        ← Email de login (índice único)
    ├── password: string             ← Senha hasheada com bcrypt
    ├── registrationDate: timestamp  ← Data de criação da conta
    ├── loginProvider: string        ← Provedor: 'email' | 'google'
    ├── googleId?: string            ← ID do Google (apenas OAuth)
    └── updatedAt?: timestamp        ← Última atualização do perfil
```

**Exemplo de documento:**
```json
{
  "id": "kfmwXcE4vSzCdNtqXkdaR",
  "name": "João Silva",
  "email": "joao@teste.com",
  "password": "$2b$12$hash...",
  "registrationDate": "2025-10-02T10:00:00Z",
  "loginProvider": "email",
  "updatedAt": "2025-10-02T14:30:00Z"
}
```

### 📁 Coleção `mood_entries`
Armazena os registros de humor dos usuários.

```
mood_entries/
├── {entryId}/                       ← ID único do registro
    ├── userId: string               ← Referência ao usuário (foreign key)
    ├── moodType: string             ← Tipo: 'Triste'|'Ansioso'|'Neutro'|'Feliz'|'Motivado'
    ├── level: number                ← Intensidade de 1 a 5
    ├── registrationDate: string     ← Data do registro (ISO string)
    ├── shortDescription: string     ← Descrição opcional (máx 500 chars)
    ├── createdAt: timestamp         ← Timestamp de criação (servidor)
    └── updatedAt?: timestamp        ← Timestamp de atualização (se editado)
```

**Exemplo de documento:**
```json
{
  "id": "aBcDeF123456789",
  "userId": "kfmwXcE4vSzCdNtqXkdaR",
  "moodType": "Feliz",
  "level": 4,
  "registrationDate": "2025-10-02",
  "shortDescription": "Consegui concluir projeto importante hoje!",
  "createdAt": "2025-10-02T16:45:00Z"
}
```

### 📁 Coleção `blacklisted_tokens` (Segurança)
Armazena tokens JWT invalidados para controle de logout seguro.

```
blacklisted_tokens/
├── {tokenId}/                       ← ID único do token invalidado
    ├── token: string                ← Hash do token JWT
    ├── userId: string               ← Usuário que fez logout
    ├── blacklistedAt: timestamp     ← Quando foi invalidado
    └── expiresAt: timestamp         ← Expiração natural do token
```

**Exemplo de documento:**
```json
{
  "id": "token_abc123",
  "token": "sha256hash...",
  "userId": "kfmwXcE4vSzCdNtqXkdaR", 
  "blacklistedAt": "2025-10-02T18:00:00Z",
  "expiresAt": "2025-10-09T18:00:00Z"
}
```

## 📊 Índices do Firestore

### Índices Simples (Automáticos):
- `users.email` (único)
- `mood_entries.userId`
- `mood_entries.registrationDate`
- `blacklisted_tokens.token`

### Índices Compostos (Configurar manualmente):
```javascript
// Para consultas otimizadas
mood_entries: [
  { userId: "asc", registrationDate: "desc" },
  { userId: "asc", moodType: "asc", registrationDate: "desc" }
]
```

## 🔍 Consultas Comuns

### Autenticação:
```javascript
// Buscar usuário por email
const user = await db.collection('users')
  .where('email', '==', 'usuario@teste.com')
  .limit(1)
  .get();

// Verificar se token está na blacklist
const isBlacklisted = await db.collection('blacklisted_tokens')
  .where('token', '==', tokenHash)
  .limit(1)
  .get();
```

### Registros de Humor:
```javascript
// Buscar todos os registros de um usuário
const entries = await db.collection('mood_entries')
  .where('userId', '==', 'abc123')
  .orderBy('registrationDate', 'desc')
  .limit(30)
  .get();

// Filtrar por período (ATENÇÃO: requer JavaScript sort se usar where)
const filtered = await db.collection('mood_entries')
  .where('userId', '==', 'abc123')
  .where('registrationDate', '>=', '2025-10-01')
  .where('registrationDate', '<=', '2025-10-07')
  .get();

// Buscar por tipo de humor específico
const happyMoods = await db.collection('mood_entries')
  .where('userId', '==', 'abc123')
  .where('moodType', '==', 'Feliz')
  .orderBy('registrationDate', 'desc')
  .get();
```

### Estatísticas:
```javascript
// Contar registros por tipo (processamento client-side)
const stats = await db.collection('mood_entries')
  .where('userId', '==', 'abc123')
  .get();

// Processar estatísticas em JavaScript
const moodCounts = stats.docs.reduce((acc, doc) => {
  const mood = doc.data().moodType;
  acc[mood] = (acc[mood] || 0) + 1;
  return acc;
}, {});

// Calcular média de humor
const totalLevel = stats.docs.reduce((sum, doc) => sum + doc.data().level, 0);
const averageMood = totalLevel / stats.docs.length;

// Determinar tendência (comparar períodos)
const sortedByDate = stats.docs
  .map(doc => doc.data())
  .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));

const recent7 = sortedByDate.slice(0, 7);
const previous7 = sortedByDate.slice(7, 14);
// Calcular médias e comparar para determinar tendência
```

## 😊 Tipos de Humor Válidos

O sistema utiliza 5 níveis padronizados de humor:

```javascript
const MOOD_TYPES = [
  { level: 1, name: 'Triste', icon: 'emoticon-sad-outline', color: '#E74C3C' },
  { level: 2, name: 'Ansioso', icon: 'emoticon-confused-outline', color: '#F39C12' },
  { level: 3, name: 'Neutro', icon: 'emoticon-neutral-outline', color: '#F1C40F' },
  { level: 4, name: 'Feliz', icon: 'emoticon-happy-outline', color: '#2ECC71' },
  { level: 5, name: 'Motivado', icon: 'emoticon-excited-outline', color: '#9B59B6' }
];
```

### Validação de Dados:
- **moodType**: Deve ser exatamente um dos 5 valores acima
- **level**: Número inteiro de 1 a 5
- **shortDescription**: String opcional (máx 500 caracteres)

## 🔐 Regras de Segurança Firestore

Configure as seguintes regras no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuários só podem acessar seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    // Registros de humor só podem ser acessados pelo próprio usuário
    match /mood_entries/{entryId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      
      // Permitir criação se userId no documento == usuário autenticado
      allow create: if request.auth != null &&
        request.resource.data.userId == request.auth.uid;
    }
    
    // Tokens blacklisted - apenas leitura para o sistema
    match /blacklisted_tokens/{tokenId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## ⚙️ Configuração Inicial

### 1. Criar Projeto Firebase:
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie novo projeto: `bem-estar-app`
3. Ative Firestore Database (modo teste)
4. Configure Authentication (Email/Password + Google)

### 2. Configurar Coleções:
```javascript
// As coleções são criadas automaticamente na primeira inserção
// Não há necessidade de criar esquemas prévios
```

### 3. Configurar Índices:
```bash
# Os índices compostos precisam ser criados manualmente
# O Firestore sugerirá URLs para criar quando necessário
```

### 4. Baixar Credenciais:
1. Vá em "Configurações do Projeto"
2. Aba "Contas de Serviço"
3. Baixe `serviceAccountKey.json`

## 🚨 Limitações Importantes

### Firestore Constraints:
- **Consultas AND**: Máximo 10 clausulas `where`
- **Consultas OR**: Use `where('field', 'in', [val1, val2])`
- **OrderBy + Where**: Requer índices compostos
- **Transações**: Máximo 500 operações

### Performance:
- **Índices**: Essenciais para consultas complexas
- **Paginação**: Use `startAfter()` para grandes datasets
- **Cache**: Configure cache local para melhor UX

## 🛠️ Desenvolvimento vs Produção

### Desenvolvimento:
- Modo teste no Firestore (sem autenticação)
- Regras permissivas para debug
- Logs detalhados habilitados

### Produção:
- Regras restritivas obrigatórias
- Índices otimizados
- Monitoring e alertas configurados
- Backup automático habilitado

## 📈 Monitoramento e Métricas

### Métricas Importantes:
- **Leituras/Escritas por dia**
- **Latência das consultas**
- **Uso de armazenamento**
- **Erros de permissão**

### Ferramentas:
- Firebase Console (métricas básicas)
- Cloud Monitoring (métricas avançadas)
- Logs de aplicação (debug customizado)

## 🔄 Backup e Restore

### Backup Automático:
```bash
# Configure backup diário no Cloud Functions
gcloud firestore export gs://bucket-backup
```

### Backup Manual:
```bash
# Exportar coleções específicas
npx -p node-firestore-import-export firestore-export \
  --accountCredentials serviceAccountKey.json \
  --backupFile backup-$(date +%Y%m%d).json
```

### Restore:
```bash
# Importar dados
npx -p node-firestore-import-export firestore-import \
  --accountCredentials serviceAccountKey.json \
  --backupFile backup.json
```

## 💡 Boas Práticas

### Estrutura de Dados:
- ✅ Use IDs auto-gerados do Firestore
- ✅ Desnormalize dados para performance
- ✅ Mantenha documentos < 1MB
- ✅ Use subcoleções para relacionamentos 1:N

### Consultas:
- ✅ Configure índices antes de usar em produção
- ✅ Use paginação para grandes datasets
- ✅ Cache resultados no frontend
- ✅ Otimize consultas com `.limit()`

### Segurança:
- ✅ Sempre configure regras restritivas
- ✅ Valide dados no frontend E backend
- ✅ Use autenticação em todas as operações
- ✅ Monitore acessos suspeitos