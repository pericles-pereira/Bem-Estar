# 🔐 Configuração Google OAuth - Guia Completo

Este guia mostra como configurar autenticação Google para sua API Bem-Estar.

## 🎯 O que você vai conseguir

- ✅ **Login com Google** funcionando 100%
- ✅ **Verificação de tokens** contra API do Google
- ✅ **Segurança real** em produção
- ✅ **Fallback para desenvolvimento** quando não configurado

---

## 📋 Pré-requisitos

- ✅ Projeto Firebase criado
- ✅ Backend funcionando (`npm start`)
- ✅ Conta Google ativa

---

## 🚀 Passo-a-Passo Detalhado

### **PASSO 1: Acessar Google Cloud Console**

1. **Abra** https://console.developers.google.com/
2. **Faça login** com a mesma conta Google do Firebase
3. **No topo da página**, clique no **seletor de projeto**

#### Se você JÁ tem projeto Firebase:
- **Procure** pelo nome do seu projeto Firebase
- **Selecione** o projeto existente

#### Se você NÃO tem projeto Firebase ainda:
- **Clique** em **"NOVO PROJETO"**
- **Nome**: Use o mesmo nome do Firebase (ex: "bem-estar-app")
- **Localização**: Deixe padrão
- **CRIAR**

---

### **PASSO 2: Habilitar APIs Necessárias**

1. **Menu lateral** → **"APIs e serviços"** → **"Biblioteca"**

2. **Pesquisar e ativar estas APIs:**

   **API 1: Google+ API**
   - **Digite**: "Google+ API"
   - **Clique** na primeira opção
   - **ATIVAR**

   **API 2: People API**
   - **Digite**: "People API" 
   - **Clique** na primeira opção
   - **ATIVAR**

---

### **PASSO 3: Configurar Tela de Consentimento**

1. **Menu lateral** → **"APIs e serviços"** → **"Tela de consentimento OAuth"**

2. **Escolher tipo de usuário:**
   - **Selecione**: **"Externo"**
   - **CRIAR**

3. **Preencher informações obrigatórias:**

   ```
   Nome do aplicativo: Bem-Estar App
   Email de suporte do usuário: seu.email@gmail.com
   
   Informações de contato do desenvolvedor:
   Endereços de email: seu.email@gmail.com
   ```

4. **SALVAR E CONTINUAR**

5. **Tela "Escopos":**
   - **Pular** esta etapa
   - **SALVAR E CONTINUAR**

6. **Tela "Usuários de teste":**
   - **Pular** esta etapa  
   - **SALVAR E CONTINUAR**

7. **Tela "Resumo":**
   - **VOLTAR AO PAINEL**

---

### **PASSO 4: Criar Credenciais OAuth**

1. **Menu lateral** → **"APIs e serviços"** → **"Credenciais"**

2. **Clique** em **"+ CRIAR CREDENCIAIS"**

3. **Selecione** → **"ID do cliente OAuth 2.0"**

4. **Configurar aplicação:**

   ```
   Tipo de aplicação: Aplicação da web
   Nome: Bem-Estar Backend API
   ```

5. **Origens JavaScript autorizadas:**
   
   **Clique em "ADICIONAR URI"** para cada uma:
   ```
   http://localhost:3000
   http://localhost:8081
   https://seudominio.com (se tiver)
   ```

6. **URIs de redirecionamento autorizados:**
   
   **⚠️ IMPORTANTE**: Nossa aplicação é uma **API REST** para mobile, não uma aplicação web com redirecionamento.
   
   **Para aplicação mobile/API** (nosso caso):
   ```
   http://localhost:3000
   ```
   
   **💡 Explicação**: Não precisamos de rotas de callback porque:
   - O frontend (React Native) obtém o token Google
   - Envia o token diretamente para nossa API via POST
   - Nossa API valida o token e retorna JWT próprio

7. **CRIAR**

---

### **PASSO 5: Copiar Client ID**

1. **Na tela que aparece**, você verá:
   ```
   ID do cliente: 123456789-abcdefghijklmnop.apps.googleusercontent.com
   Código secreto do cliente: GOCSPX-xxxxxxxxxxxxxxx
   ```

2. **COPIE APENAS** o **"ID do cliente"** (o que termina com `.apps.googleusercontent.com`)

3. **NÃO PRECISA** do "Código secreto do cliente" para este projeto

---

### **PASSO 6: Configurar no Backend**

1. **Abra** o arquivo `backend/.env`

2. **Encontre** a linha:
   ```env
   GOOGLE_CLIENT_ID=seu_google_client_id_aqui.apps.googleusercontent.com
   ```

3. **Substitua** pelo seu Client ID real:
   ```env
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   ```

4. **Salve** o arquivo

---

### **PASSO 7: Testar Configuração**

1. **Reiniciar servidor:**
   ```bash
   # No terminal, pare o servidor (Ctrl+C) e execute:
   npm start
   ```

2. **Verificar logs:**
   ```
   🚀 Servidor rodando na porta 3000
   📡 API disponível em: http://localhost:3000
   🔥 Firebase conectado com sucesso
   🔐 Google OAuth configurado com Client ID: 123456789-abc...
   ```

3. **Testar endpoint** (usando Postman/Thunder Client):
   ```
   POST http://localhost:3000/api/auth/google-login
   
   Headers:
   Content-Type: application/json
   
   Body:
   {
     "googleToken": "token_real_do_google",
     "name": "João Silva",
     "email": "joao@gmail.com"
   }
   ```

   **💡 Para testar sem token real** (modo desenvolvimento):
   ```json
   {
     "googleToken": "fake-token-for-testing",
     "name": "Teste Usuario",
     "email": "teste@gmail.com"
   }
   ```

---

## 🔧 Modos de Funcionamento

### **Como Funciona o Fluxo OAuth**

1. **Frontend (React Native)**:
   - Usuário clica em "Login com Google"
   - Google SignIn retorna `idToken` (JWT do Google)
   - App envia `idToken` + dados para nossa API

2. **Backend (Nossa API)**:
   - Recebe `POST /api/auth/google-login`
   - Valida `idToken` com Google API (se configurado)
   - Cria/encontra usuário no Firebase
   - Retorna nosso próprio JWT

3. **Resultado**:
   - App usa nosso JWT para autenticação
   - Usuário logado com segurança

### **Modo Produção** (com GOOGLE_CLIENT_ID configurado)
- ✅ **Tokens Google são verificados** contra API do Google
- ✅ **Segurança máxima**
- ✅ **Apenas tokens válidos** são aceitos

### **Modo Desenvolvimento** (sem GOOGLE_CLIENT_ID)
- ⚠️ **Tokens NÃO são verificados**
- ⚠️ **Qualquer string** é aceita como token
- ⚠️ **Apenas para desenvolvimento/testes**

---

## 🚨 Problemas Comuns

### **Erro: "Token Google inválido"**
**Causa**: Token expirado ou inválido
**Solução**: Use um token Google válido e atual

### **Erro: "Email do token Google não corresponde"**
**Causa**: Email do token ≠ email enviado no body
**Solução**: Certifique-se que o email está correto

### **Warning: "GOOGLE_CLIENT_ID não configurado"**
**Causa**: Variável não está no .env
**Solução**: Configure o Client ID conforme PASSO 6

### **Erro: "APIs não habilitadas"**
**Causa**: Google+ API ou People API não ativadas
**Solução**: Volte ao PASSO 2

---

## 📱 Integração Frontend

Para usar no React Native:

```javascript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configurar Google SignIn
GoogleSignin.configure({
  webClientId: '123456789-abc.apps.googleusercontent.com', // Mesmo Client ID
});

// Fazer login
const signIn = async () => {
  const { idToken, user } = await GoogleSignin.signIn();
  
  const response = await fetch('http://localhost:3000/api/auth/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      googleToken: idToken,
      name: user.name,
      email: user.email
    })
  });
};
```

---

## 🔗 Links Úteis

- **Google Cloud Console**: https://console.developers.google.com/
- **Documentação OAuth 2.0**: https://developers.google.com/identity/protocols/oauth2
- **Firebase Console**: https://console.firebase.google.com/
- **React Native Google SignIn**: https://github.com/react-native-google-signin/google-signin

---

## ✅ Checklist Final

- [ ] ✅ Projeto Google Cloud criado/selecionado
- [ ] ✅ Google+ API habilitada
- [ ] ✅ People API habilitada  
- [ ] ✅ Tela de consentimento configurada
- [ ] ✅ Credenciais OAuth criadas
- [ ] ✅ Client ID copiado
- [ ] ✅ .env atualizado
- [ ] ✅ Servidor reiniciado
- [ ] ✅ Logs mostram "Google OAuth configurado"
- [ ] ✅ Teste com token real funcionando

## 🛣️ Rotas Disponíveis na API

**Autenticação:**
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login tradicional
- `POST /api/auth/google-login` - **Login Google** ⭐
- `GET /api/auth/me` - Dados do usuário logado
- `PUT /api/auth/me` - Atualizar perfil
- `POST /api/auth/logout` - Logout

**Humor:**
- `GET /api/mood` - Listar registros de humor
- `POST /api/mood` - Criar registro de humor
- `PUT /api/mood/:id` - Atualizar registro
- `DELETE /api/mood/:id` - Deletar registro
- `GET /api/mood/stats` - Estatísticas de humor

**Outros:**
- `GET /` - Status da API
- `GET /api/mood-types` - Tipos de humor disponíveis

**🎉 Parabéns! Google OAuth configurado com sucesso!**