# 🔥 Setup Firebase - 5 Minutos!

## ⚡ Setup Rápido

### 1. Criar Projeto Firebase
1. Acesse: **https://console.firebase.google.com/**
2. **"Adicionar projeto"** → Nome: `bem-estar-app`
3. **Desmarque** Google Analytics → **"Criar projeto"**

### 2. Configurar Firestore
1. Menu lateral → **"Firestore Database"**
2. **"Criar banco de dados"**
3. **"Começar no modo de teste"** → Localização: **"southamerica-east1"**

### 3. Baixar Chave Firebase
1. **Configurações** (⚙️) → **"Configurações do projeto"**
2. Aba **"Contas de serviço"**
3. **"Gerar nova chave privada"** → Baixar JSON
4. **Renomear** para `serviceAccountKey.json`
5. **Mover** para pasta `backend/`

### 4. Configurar Projeto
```bash
cd backend
cp serviceAccountKey.example.json serviceAccountKey.json
# Edite o serviceAccountKey.json com os dados baixados
```

### 5. Editar .env
No arquivo `.env`, substitua `bem-estar-app` pelo seu Project ID:
```env
FIREBASE_DATABASE_URL=https://SEU_PROJECT_ID-default-rtdb.firebaseio.com
```

### 6. Testar
```bash
npm start
```

Acesse: http://localhost:3000/

### 7. Configurar Google OAuth (Opcional)

Para autenticação Google completa:

1. **Google Console**: https://console.developers.google.com/
2. **Criar/Selecionar Projeto** → Mesmo nome do Firebase
3. **APIs & Serviços** → **"Credenciais"**
4. **"Criar credenciais"** → **"ID do cliente OAuth 2.0"**
5. **Tipo**: "Aplicação da Web"
6. **Origens autorizadas**: `http://localhost:3000`
7. **URIs de redirecionamento**: `http://localhost:3000/auth/google/callback`
8. **Copiar CLIENT_ID** → Atualizar no `.env`:

```env
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
```

**Nota**: Sem o GOOGLE_CLIENT_ID, a API funcionará em modo de desenvolvimento (tokens não são verificados).

## 🎯 URLs Importantes

- **Console Firebase**: https://console.firebase.google.com/
- **Firestore**: https://console.firebase.google.com/project/SEU_PROJECT/firestore
- **API Local**: http://localhost:3000/api

## 🚨 Checklist

- [ ] ✅ Projeto Firebase criado
- [ ] ✅ Firestore configurado
- [ ] ✅ Chave baixada como `serviceAccountKey.json`
- [ ] ✅ Arquivo `.env` configurado
- [ ] ✅ `npm start` funcionando
- [ ] ✅ `/` retornando sucesso
- [ ] 🔧 Google OAuth configurado (opcional)

## ⚠️ Problemas Comuns

**"serviceAccountKey.json not found"**
→ Arquivo na pasta errada ou nome incorreto

**"Permission denied"**
→ Firestore ainda em modo restrito (configure modo teste)

**"Project not found"**
→ Project ID errado no `.env`

## ✅ Pronto!

Seu backend Firebase está configurado e rodando! 🎉

**Próximo passo**: Integrar com seu app React Native.