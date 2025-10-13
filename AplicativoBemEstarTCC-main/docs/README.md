# 📱 Aplicativo Bem-Estar+

Aplicativo mobile desenvolvido como parte do Trabalho de Conclusão de Curso (TCC), com o objetivo de promover o **bem-estar emocional e psicológico** dos usuários por meio do rastreamento de humor, hábitos saudáveis, práticas de meditação, autocuidado e imersão em experiências de realidade virtual.

---

## 🧠 Visão Geral do Projeto

O sistema é composto por duas camadas principais:

- **Frontend (aplicativo mobile)** → desenvolvido em **React Native (TypeScript)**.
- **Backend (API REST)** → construído com **Node.js e Firebase** para autenticação e persistência de dados.

Essa divisão permite um fluxo de comunicação seguro e escalável, no qual o aplicativo consome os serviços expostos pela API.

---

## 📱 Estrutura do Aplicativo (Frontend)

**Local:** `/src/app/`

| Diretório / Arquivo | Função |
|----------------------|--------|
| `App.tsx` | Ponto de entrada principal do aplicativo, responsável por inicializar os contextos e navegação. |
| `components/` | Contém os componentes reutilizáveis (cards, botões, inputs, placeholders, etc.). |
| `contexts/` | Gerencia o estado global da aplicação, como autenticação (`AuthContext.tsx`). |
| `layout/` | Define a organização visual principal, com componentes de estrutura (`MainContent.tsx`). |
| `navegation/` | Responsável pela navegação entre telas via abas inferiores (`BottomNav.tsx`). |
| `screens/` | Contém todas as telas do aplicativo: |
| ├── `HabitTracker/` → rastreamento de hábitos diários. |
| ├── `Home/` → tela inicial com resumo das funcionalidades. |
| ├── `HumorRegistration/` → registro e acompanhamento de humor. |
| ├── `Meditation/` → sessões de meditação guiada. |
| ├── `SelfCare/` → atividades e sugestões de autocuidado. |
| ├── `VR/` → ambiente de realidade virtual para relaxamento. |
| └── `Welcome/` → tela inicial de login e cadastro. |
| `services/api.js` | Configuração do Axios e comunicação com o backend. |
| `types/types.ts` | Definições de tipos e interfaces TypeScript utilizadas em todo o app. |

---

## ⚙️ Estrutura do Backend (Node.js + Firebase)

**Local:** `/backend/src/`

| Diretório / Arquivo | Função |
|----------------------|--------|
| `config/firebase.js` | Configuração e inicialização da conexão com o Firebase. |
| `controllers/` | Implementa a lógica principal das rotas (ex: `authController.js`, `moodController.js`). |
| `middleware/` | Middlewares para autenticação JWT, tratamento de erros e validações. |
| `routes/` | Define as rotas da API (ex: `/auth`, `/mood`). |
| `services/` | Contém a regra de negócio e comunicação entre controladores e o banco de dados. |
| `server.js` | Inicializa o servidor Express e as rotas principais. |

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React Native  
- TypeScript  
- Context API  
- Axios  
- React Navigation  
- React Native Vector Icons  

### Backend
- Node.js  
- Express.js  
- Firebase Admin SDK  
- JWT (JSON Web Token)  
- dotenv  

---

## 🔗 Comunicação entre Frontend e Backend

A comunicação entre as camadas é realizada via **requisições HTTP** através do **Axios**, com autenticação via **JWT**.  
O backend valida os tokens e retorna dados personalizados de cada usuário autenticado.

---

## 👥 Autores

Projeto desenvolvido por **Mateus Vitor**, **Lucas Vagula**,**João Narducci**,**Gustavo Dantas** e **José Guilherme**, como parte do **Trabalho de Conclusão de Curso (TCC)** com foco em tecnologia e bem-estar digital.




###  ‼️ Como Rodar o Projeto (Nativo no Celular)

### 1️⃣ Pré-requisitos
- Node.js (v18+)  
- Yarn ou npm  
- React Native CLI  
- Android Studio e/ou Xcode  
- Celular físico ou emulador configurado  

`build.gradle Android`
    buildscript {
        ext {
            buildToolsVersion = "34.0.0"
            minSdkVersion = 24
            compileSdkVersion = 34
            targetSdkVersion = 34
            ndkVersion = "25.1.8937393"
            kotlinVersion = "1.9.10"
        } 

    > ⚠️ Para execução nativa no celular, o app **não usa Expo**.


### 2️⃣ Clonar o Projeto      
    ```bash
        git clone <repositório-do-projeto>
        cd <nome-do-projeto>
    ```
### 3️⃣ Instalar Dependências(Front)

```bash
    npm install

### 4️⃣ Configurar o Backend

Acesse /backend

cd backend
npm install
```

⚠️ Observações Importantes

Local API: `src/app/services/api.js`

- Durante o desenvolvimento, **não conseguimos realizar a ligação do frontend com o backend através do Axios usando `localhost`**, mesmo após diversas tentativas de configuração.  
- Testes foram feitos com cabos USB, emuladores e substituindo `localhost` pelo IP da máquina na rede local, **sem sucesso**.  

**Em desenvolvimento**


### 5️⃣ Rodar o Aplicativo no Celular

Android:
```bash
npx react-native run-android
```

Certifique-se de que o celular esteja conectado via USB e com depuração habilitada (Android) 