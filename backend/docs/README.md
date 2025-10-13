# 📚 Documentação do Backend API Bem-Estar

Esta pasta contém toda a documentação técnica do projeto backend desenvolvido em Node.js com Express, Firebase Firestore e JWT.

## 📋 Arquivos de Documentação

### `API_EXAMPLES.md` 📝
Exemplos práticos de como usar todas as rotas da API, incluindo exemplos de requisições e respostas para cada endpoint.

### `FIREBASE_SETUP.md` 🔧
Guia completo para configurar o Firebase no projeto, incluindo criação do projeto, configuração do Firestore e credenciais.

### `GOOGLE_OAUTH_SETUP.md` 🔐
Tutorial passo-a-passo para configurar autenticação Google OAuth, incluindo criação de credenciais e configuração do Client ID.

### `TESTES_COMPLETOS.md` 🧪
Guia completo de testes da API com exemplos práticos para Postman, Thunder Client ou curl. Inclui todos os cenários de teste.

### `firebase-structure.md` 🗃️
Estrutura detalhada das coleções no Firebase Firestore, schemas de dados e relacionamentos entre entidades.

## 🏗️ Arquitetura do Sistema

O backend segue uma arquitetura em camadas:

```
├── Controllers/    # Camada de apresentação (rotas HTTP)
├── Services/       # Camada de lógica de negócio
├── Middleware/     # Camada de validação e autenticação
├── Config/         # Configurações do sistema
└── Routes/         # Definição de rotas da API
```

## 🚀 Tecnologias Documentadas

- **Express.js**: Framework web para Node.js
- **Firebase Firestore**: Banco de dados NoSQL
- **JWT**: Autenticação stateless
- **Google OAuth**: Login com Google
- **bcrypt**: Criptografia de senhas
- **Token Blacklist**: Invalidação segura de tokens

## 📖 Como Usar Esta Documentação

### Para Desenvolvedores:
1. Comece com `FIREBASE_SETUP.md` para configurar o ambiente
2. Configure Google OAuth com `GOOGLE_OAUTH_SETUP.md`
3. Use `API_EXAMPLES.md` para entender os endpoints
4. Execute testes com `TESTES_COMPLETOS.md`

### Para QA/Testers:
1. Use `TESTES_COMPLETOS.md` como guia de teste
2. Consulte `API_EXAMPLES.md` para exemplos de requests
3. Verifique `firebase-structure.md` para validar dados

### Para DevOps:
1. Configure produção com `FIREBASE_SETUP.md`
2. Use scripts de deploy documentados

## � Links Úteis

- **Documentação Firebase:** https://firebase.google.com/docs
- **Documentação Express.js:** https://expressjs.com/
- **Documentação Node.js:** https://nodejs.org/docs/
- **Google OAuth 2.0:** https://developers.google.com/identity/protocols/oauth2
- **JWT.io:** https://jwt.io/

## ⚡ Quick Start

Para começar rapidamente:

```bash
# 1. Configure Firebase
npm run setup

# 2. Execute testes
# Consulte TESTES_COMPLETOS.md

# 3. Veja exemplos
# Consulte API_EXAMPLES.md
```

## 📝 Contribuindo com a Documentação

Para adicionar nova documentação:

1. **Crie arquivo**: `.md` nesta pasta com nome descritivo
2. **Use Markdown**: Para formatação consistente
3. **Inclua exemplos**: Código prático sempre que possível
4. **Atualize índices**: Este README e outros índices
5. **Teste exemplos**: Verifique se todos os códigos funcionam

### Template de Documento:
```markdown
# Título do Documento

Breve descrição do que este documento cobre.

## Pré-requisitos
- Liste o que é necessário

## Passos
1. Passo detalhado
2. Com exemplos de código

## Troubleshooting
- Problemas comuns e soluções
```

## 🔍 Índice de Funcionalidades

| Funcionalidade | Arquivo | Status |
|----------------|---------|--------|
| Autenticação JWT | `API_EXAMPLES.md` | ✅ |
| Google OAuth | `GOOGLE_OAUTH_SETUP.md` | ✅ |
| Registro de Humor | `API_EXAMPLES.md` | ✅ |
| Estatísticas de Humor | `API_EXAMPLES.md` | ✅ |
| Tipos de Humor | `API_EXAMPLES.md` | ✅ |
| Logout com Blacklist | `API_EXAMPLES.md`, `TESTES_COMPLETOS.md` | ✅ |
| Configuração Firebase | `FIREBASE_SETUP.md` | ✅ |
| Estrutura de Dados | `firebase-structure.md` | ✅ |
| Testes Completos | `TESTES_COMPLETOS.md` | ✅ |

## 📊 Status da Documentação

- ✅ **Completa**: Todos os recursos principais documentados
- ✅ **Atualizada**: Sincronizada com o código atual
- ✅ **Testada**: Exemplos validados e funcionais
- ✅ **Organizada**: Estrutura clara e navegável