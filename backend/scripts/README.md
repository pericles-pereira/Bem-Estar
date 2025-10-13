# 🛠️ Scripts Utilitários do Backend

Esta pasta contém scripts auxiliares para desenvolvimento, manutenção e administração do projeto backend.

## 📋 Scripts Disponíveis

### `setup-check.js` 🔍
Verifica se o ambiente está configurado corretamente para execução:
- ✅ Conexão com Firebase Firestore
- ✅ Arquivo `serviceAccountKey.json` presente
- ✅ Variáveis de ambiente necessárias
- ✅ Dependências npm instaladas
- ✅ Configuração do Google OAuth (se configurado)

**Uso:**
```bash
npm run setup
# ou
node scripts/setup-check.js
```

### `seed-data.js` 🌱
Popula o banco de dados Firestore com dados de exemplo para desenvolvimento e testes:
- 👤 **1 usuário de exemplo** (email/senha: sample@test.com / password123)
- 😊 **5 registros de humor** variados (últimos 5 dias)
- 📊 Dados para testes de estatísticas e tendências
- 🔐 Estrutura pronta para testes de token blacklist

**Dados criados:**
- 1 usuário de teste com loginProvider 'email'
- 5 registros de humor (Feliz, Motivado, Neutro, Ansioso, Feliz)
- Todos os tipos de humor representados
- Dados distribuídos em 5 dias para testes de tendência

**Usuário de Teste:**
- Email: `sample@test.com`
- Senha: `password123`
- Nome: `Sample User`

**Uso:**
```bash
npm run seed
# ou
node scripts/seed-data.js
```

### `reset-database.js` 🗑️
**⚠️ CUIDADO:** Remove TODOS os dados do banco de dados Firestore. Use apenas em desenvolvimento.

**Remove:**
- 👤 Todos os usuários
- 😊 Todos os registros de humor
- 🛡️ Tokens na blacklist
- 📊 Dados de estatísticas

**Uso:**
```bash
npm run reset
# ou
node scripts/reset-database.js
```

## 🚀 Como Usar os Scripts

### Desenvolvimento Típico:
```bash
# 1. Verificar configuração inicial
npm run setup

# 2. Popular dados para desenvolvimento
npm run seed

# 3. Desenvolver e testar...

# 4. Limpar dados quando necessário
npm run reset
```

### Antes de Produção:
```bash
# Verificar se tudo está configurado
npm run setup

# NÃO executar seed ou reset em produção!
```

## 📊 Scripts Package.json

Todos os scripts estão configurados no `package.json`:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js", 
    "setup": "node scripts/setup-check.js",
    "seed": "node scripts/seed-data.js",
    "reset": "node scripts/reset-database.js"
  }
}
```

## ⚙️ Configuração Necessária

### Para Executar Scripts:
1. **Firebase configurado**: `serviceAccountKey.json` presente
2. **Variáveis de ambiente**: `.env` configurado
3. **Dependências**: `npm install` executado

### Variáveis Requeridas:
```env
FIREBASE_DATABASE_URL=https://seu-projeto.firebaseio.com
JWT_SECRET=seu-jwt-secret
```

## 🔒 Segurança dos Scripts

### ✅ Práticas Seguras:
- Scripts verificam se `NODE_ENV !== 'production'` antes de operações destrutivas
- Confirmação requerida para operações perigosas
- Logs detalhados de operações realizadas
- Backup automático antes de reset (em desenvolvimento)

### ⚠️ Avisos Importantes:
- **NUNCA** execute `reset` em produção
- **SEMPRE** faça backup antes de operações destrutivas
- **VERIFIQUE** a configuração com `setup` antes de outras operações

## 🛠️ Desenvolvendo Novos Scripts

### Template Básico:
```javascript
// scripts/meu-script.js
const { initializeFirebase, getDb } = require('../src/config/firebase');

async function meuScript() {
  try {
    // Verificar se não é produção
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Script não pode ser executado em produção');
      process.exit(1);
    }

    // Inicializar Firebase
    initializeFirebase();
    const db = getDb();

    // Sua lógica aqui
    console.log('✅ Script executado com sucesso');
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  meuScript();
}

module.exports = meuScript;
```

### Passos para Adicionar:
1. **Criar arquivo**: `scripts/nome-do-script.js`
2. **Implementar lógica**: Seguir template acima
3. **Adicionar ao package.json**: 
   ```json
   "meu-comando": "node scripts/meu-script.js"
   ```
4. **Documentar**: Atualizar este README
5. **Testar**: Executar em ambiente de desenvolvimento

## 📚 Scripts Externos Úteis

### Backup Manual:
```bash
# Exportar dados do Firestore
npx -p node-firestore-import-export firestore-export --accountCredentials serviceAccountKey.json --backupFile backup.json
```

### Restore Manual:
```bash
# Importar dados para Firestore
npx -p node-firestore-import-export firestore-import --accountCredentials serviceAccountKey.json --backupFile backup.json
```

## 🐛 Troubleshooting

### Problemas Comuns:

1. **"Firebase não conecta"**:
   ```bash
   npm run setup  # Verificar configuração
   ```

2. **"Permission denied"**:
   - Verificar `serviceAccountKey.json`
   - Verificar regras do Firestore

3. **"Module not found"**:
   ```bash
   npm install  # Reinstalar dependências
   ```

### Logs de Debug:
Todos os scripts incluem logs detalhados. Para debug adicional:
```bash
DEBUG=* npm run script-name
```

## 📈 Monitoramento

### Verificar Status Regular:
```bash
# Verificação diária de desenvolvimento
npm run setup

# Verificar integridade dos dados
# (implementar script personalizado se necessário)
```

### Métricas dos Scripts:
- ⏱️ Tempo de execução
- 📊 Quantidade de dados processados
- ❌ Erros encontrados
- ✅ Operações bem-sucedidas