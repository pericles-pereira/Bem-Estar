### 🏠 Tela Welcome (Login / Cadastro)

  **Arquivo:** `src/screens/Welcome/Welcome.tsx`  
  **Descrição:**  
  Tela inicial do aplicativo, responsável pelo fluxo de autenticação do usuário.  
  Permite realizar **login** com e-mail e senha ou **cadastro** de novos usuários, conectando-se ao `AuthContext` que gerencia a autenticação via backend.

  ---

  #### 🔧 Funcionalidades principais
   - Alterna entre os modos **Login** e **Cadastro** (`isRegistering`).
   - Chama as funções `login()` e `register()` do **AuthContext**, que lidam com requisições ao backend Firebase.
   - Exibe mensagens de sucesso ou erro via `Alert`.
   - Inclui campo de entrada para:
    - Nome (apenas no modo de cadastro)
    - E-mail
    - Senha
   - Botão alternativo de **Login com Google** (placeholder para futura implementação).
   - Possui design responsivo e estilizado com **React Native Stylesheet** e ícones `Feather` e `FontAwesome`.

  ---

  #### ⚙️ Estrutura do componente
   - **`Header`** → exibe o logotipo e título “Bem-Estar+”.
   - **`LoginForm`** → renderiza campos e botão de login.
   - **`RegisterForm`** → renderiza campos e botão de cadastro.
   - **`InputField`** → componente reutilizável de input com ícone e estilo padronizado.
   - **`GoogleLoginButton`** → botão placeholder para login via Google.
   - **`Divider`** → separador “OU”.

  ---

  #### 📲 Fluxo de uso
    1. Usuário acessa o app e é direcionado à tela Welcome.
    2. Preenche e-mail e senha → aciona `handleLogin()` → chama `AuthContext.login()`.
    3. Caso não tenha conta, muda para o modo de cadastro → `handleRegister()`.
    4. Ao logar com sucesso, a função `onLoginSuccess()` pode redirecionar para a Home.

  ---

  #### 🧠 Dependências
    - `react-native-vector-icons/Feather`
    - `react-native-vector-icons/FontAwesome`
    - `AuthContext` (contexto de autenticação)
    - `react-native` (Alert, View, TextInput, TouchableOpacity)

  ---

  #### 🎨 Estilo e Layout
    - **Paleta principal:** tons de roxo (`#8A2BE2`)  
    - **Design:** card centralizado com sombras e bordas arredondadas.
    - **Componentização:** promove a reutilização e organização limpa do código.  
    - **Usabilidade:** foco em clareza e simplicidade para onboarding de usuários.


  ------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

    ## 🟣 Tela: Dashboard

    **Local:** `src/screens/Home/Dashboard.tsx`  
    **Descrição:**  
    A tela **Dashboard** é o painel principal do aplicativo **Bem-Estar**, responsável por apresentar uma visão geral da experiência do usuário e facilitar o acesso rápido às principais funcionalidades do sistema, como o registro de humor, o acompanhamento de hábitos, o autocuidado e as sessões de meditação em realidade virtual.

    ---

    ### 🎯 Funcionalidades Principais

    - **Saudação personalizada:**  
      Exibe uma mensagem de boas-vindas dinâmica (“Bom dia”, “Boa tarde” ou “Boa noite”), adaptada ao horário do dia, junto ao nome do usuário.

    - **Botão de Registro de Humor:**  
      Permite acesso direto à tela de humor, incentivando o registro diário do estado emocional.

    - **Ações Rápidas (QuickActionCard):**  
      Conjunto de cartões interativos que direcionam o usuário para as principais áreas do aplicativo:
      - *Registrar Humor* — abre o controle de humor diário.  
      - *Marcar Hábito* — conduz ao rastreador de hábitos.  
      - *Autocuidado* — apresenta atividades voltadas ao bem-estar.  
      - *Imersão VR* — direciona à sessão de meditação em realidade virtual.

    - **Resumo Semanal:**  
      Seção reservada para exibir dados analíticos sobre o progresso do usuário, como estatísticas de humor e hábitos (ainda em desenvolvimento).

    - **Logout:**  
      Botão que encerra a sessão do usuário com segurança.

    ---

    ### ⚙️ Estrutura e Componentes

    #### **Componente Principal**
    O componente `Dashboard` utiliza um **ScrollView** para organizar os elementos da interface e apresenta um cabeçalho colorido, área de ações rápidas e estatísticas.

    #### **Subcomponente: QuickActionCard**
    Componente reutilizável que renderiza os cartões de ação.  
    Cada cartão contém um ícone, título, subtítulo e ação associada (função `onPress`), recebidos por meio de *props*.

    ---

    ### 🧠 Props Utilizadas

    | Prop | Tipo | Descrição |
    |------|------|------------|
    | `navigateTo` | `(screen: MainScreenState) => void` | Controla a navegação entre as telas principais do app. |
    | `handleLogout` | `() => void` | Executa a função de logout do usuário. |

    ---

    ### 🎨 Estilo e Layout

    - **Paleta principal:** tons de roxo (`#4B0082`) com contrastes suaves em rosa, azul e verde.  
    - **Design:** minimalista, com bordas arredondadas, sombras leves e cores acolhedoras.  
    - **Componentização:** promove a reutilização e organização limpa do código.  
    - **Layout responsivo:** desenvolvido com `ScrollView` e alinhamentos flexíveis.

    ---

    ### 🧩 Dependências Utilizadas

    - `react-native-vector-icons` → para ícones (Feather, MaterialCommunityIcons).  
    - `react-native` → componentes básicos da interface.  
    - `BottomNav.tsx` → responsável pela navegação entre as abas.  
    - `AuthContext.tsx` → gerenciamento de autenticação do usuário.

    ---

    ### 🧾 Considerações

    A tela de **Dashboard** representa o ponto de partida da jornada do usuário dentro do aplicativo, oferecendo uma navegação fluida e intuitiva.  
    Seu design foi pensado para transmitir **calma e equilíbrio**, reforçando o propósito do app: promover o **autoconhecimento e o bem-estar emocional** de forma acessível e moderna.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//
##  🚴 Tela: SelfCareScreen

  **Local:** `src/screens/SelfCare/SelfCareScreen.tsx`  

  O componente **SelfCareScreen** foi desenvolvido para centralizar e organizar as atividades de autocuidado dentro do aplicativo, promovendo o bem-estar físico, emocional e artístico do usuário. A tela oferece uma experiência intuitiva e acolhedora, incentivando que o usuário reserve um tempo diário para si mesmo, realizando práticas que promovam relaxamento, vitalidade e equilíbrio emocional. Construído em React Native, o componente utiliza `ScrollView` para permitir a rolagem do conteúdo, garantindo que todas as seções e atividades sejam acessíveis em diferentes tamanhos de tela.  

  A interface está dividida em três seções principais: **Cuidado Físico**, **Cuidado Emocional** e **Cuidado Artístico**. Cada seção contém atividades específicas, representadas por cards (`ActivityCard`) que exibem título, descrição, tempo estimado de execução, nível de dificuldade e benefício principal. Essa estrutura facilita a organização visual e torna a interação mais clara, permitindo que o usuário escolha atividades conforme suas necessidades e disponibilidade. A seção física inclui exercícios leves, como caminhada, alongamento e treino funcional, promovendo energia, vitalidade e flexibilidade. A seção emocional apresenta práticas como escrita em diário, respiração consciente e sessões de gratidão, focando na redução de ansiedade e aumento da positividade. Por fim, a seção artística oferece atividades como desenho, pintura e música, estimulando criatividade e expressão pessoal.  

  O layout da tela foi cuidadosamente planejado para transmitir aconchego e clareza visual. O cabeçalho inclui um ícone de coração em destaque, com fundo vermelho e sombras sutis, reforçando o caráter de cuidado da tela, acompanhado de título e subtítulo centralizados que convidam o usuário à prática do autocuidado. Cada seção possui um ícone representativo colorido, facilitando a identificação do tipo de atividade, e os cards possuem espaçamento adequado, mantendo consistência e conforto visual. O fundo cinza claro (`#F7F7F7`) fornece contraste com os elementos coloridos, reforçando a hierarquia de informação e melhorando a legibilidade.  

  A construção modular do **SelfCareScreen** permite fácil manutenção e expansão futura, possibilitando a adição de novas atividades ou categorias de cuidado sem comprometer a estrutura existente. Essa abordagem garante que o componente seja escalável e adaptável às necessidades do usuário. Além disso, o design responsivo e interativo promove engajamento contínuo, incentivando a adoção de hábitos saudáveis e práticas de autocuidado, alinhando-se com a proposta geral do aplicativo de apoiar o bem-estar integral do usuário.


------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

##  🧘‍♂️ Tela: MeditationScreen

  **Local**: `src/screens/Meditation/MeditationScreen.tsx` 

  ### 🧾 Descrição:
    A tela MeditationScreen é o espaço principal de meditação do app Bem-Estar+. Ela permite que o usuário escolha entre diferentes sessões de meditação guiada ou entre na imersão em realidade virtual (VR).

  ### 🎯 Funcionalidades Principais

    Visualização das Sessões de Meditação: Sessões pré-definidas (Respiração Profunda, Sono Profundo) exibidas em cards. Cada card mostra título, descrição, duração e ícone representativo.

    Imersão em VR: Card especial para iniciar o modo VR. Ao tocar, exibe um Alert e permite navegar para a tela VR (setNavigationState('vr')).

  ### 🎨 Estilo e Layout

    **ScrollView** para permitir rolagem em telas menores.

    Header com ícone principal e informações introdutórias.

  - **Design:** Cards estilizados com cores, sombras e bordas arredondadas. Header com ícone principal e informações introdutórias.
  - **Componentização:** promove a reutilização e organização limpa do código.  
  - **Layout responsivo:** desenvolvido com `ScrollView` e alinhamentos flexíveis.

  ### ⚙️ Estrutura de Componentes

  MeditationScreen (Principal)

  Recebe setNavigationState para controlar a navegação entre telas.

  **MeditationSessionCard**

  Componente reutilizável que exibe cada sessão de meditação com título, descrição, duração e ícone.

  VR Card:

    **TouchableOpacity** customizado para acesso à imersão VR, com ícone e cores diferenciadas.

  ### 🧩 Dependências Utilizadas

    - `react-native-vector-icons` → para ícones (Feather, MaterialCommunityIcons).  
    - `react-native` → componentes básicos da interface.  
    - `MeditationSessionCard.tsx` → componente customizado. 

  ### 🔗 Observações Técnicas

    A navegação para VR é feita diretamente via callback **setNavigationState('vr').**

    Alertas **(Alert.alert)** são usados temporariamente para feedback do usuário.

    A lista de sessões é estática, mas pode ser conectada a uma API ou banco de dados futuramente.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## ⏰ Tela: HabitTrackerScreen

  **Local**: `src/screens/Habits/HabitTrackerScreen.tsx` 

  ### 🧾 Descrição:
    A tela HabitTrackerScreen é responsável por permitir que o usuário acompanhe seus hábitos diários, visualize o progresso de cada dia e construa uma rotina positiva. Por meio de cards, barras de progresso e uma lista interativa, o usuário pode marcar hábitos como concluídos e acompanhar a evolução diária.

  ### 🎯 Funcionalidades Principais

    Exibição de Hábitos:
    Cada hábito é apresentado utilizando o componente HabitItem, permitindo que o usuário marque e desmarque atividades conforme realizações diárias.

    Progresso Diário:
    Calcula o percentual de hábitos concluídos no dia e exibe uma barra de progresso dinâmica, proporcionando feedback visual imediato.

    Informações do Dia:
    Exibe a data atual formatada em português, incluindo o dia da semana e o mês, de forma legível e estilizada.

    Design Interativo:
    Cards e seções bem definidos com cores, sombras e cantos arredondados, reforçando a estética moderna e amigável do app.
    

  ### 🎨 Estilo e Layout

    Container principal:
    flex: 1 com fundo claro (#FAFAFA) para destaque do conteúdo.

    Header:
    Fundo roxo (#6C63FF) com título e subtítulo, cantos arredondados na parte inferior e padding para espaçamento.

    Card do Dia:
    Exibe data, progresso e barra visual de acompanhamento com sombra e cantos arredondados para profundidade.

    Lista de Hábitos:
    Apresenta todos os hábitos em cards interativos dentro de uma seção organizada com título e espaçamento adequado.
  - **Design:** Cards estilizados com cores, sombras e bordas arredondadas. Header com ícone principal e informações introdutórias.
  - **Componentização:** promove a reutilização e organização limpa do código.  
  - **Layout responsivo:** desenvolvido com `ScrollView` e alinhamentos flexíveis.
    
  ### ⚙️ Estrutura de Componentes

  **HabitTrackerScreen** (Principal):

  Gerencia o estado dos hábitos (useState) e calcula o progresso diário (useMemo).

  Renderiza o cabeçalho, card do dia e lista de hábitos.

  HabitItem (Componente Secundário):

  Responsável por exibir cada hábito individualmente e lidar com a interação de marcação/desmarcação.



  ### 🧩 Dependências Utilizadas

   - `react-native` → componentes básicos da interface.  
   - `react-native-vector-icons` — ícones decorativos (ex: calendário).
   - `HabitItem` — componente customizado para cada hábito da lista.

  ### 🔗 Observações Técnicas

O progresso diário é recalculado automaticamente sempre que um hábito é marcado ou desmarcado.

A data é formatada utilizando **Intl.DateTimeFormat** em português, com correção para remover a palavra "feira" do dia da semana.

A arquitetura permite fácil adição de novos hábitos ou modificação de estilo, mantendo consistência com o restante do aplicativo.