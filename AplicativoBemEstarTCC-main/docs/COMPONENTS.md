## 🧭 Componente: HumorRegistration

**Local:** `src/HumorRegistration/HumorRegistration.tsx`  
**Descrição:**  
O componente **HumorRegistration** permite que o usuário **registre seu humor diário**, associando-o a um ícone e cor representativos. Além disso, oferece um campo opcional para anotações sobre o dia, permitindo capturar sentimentos, reflexões ou eventos importantes.

---

### 🎯 Funcionalidades Principais

- **Seleção de humor:**  
  O usuário escolhe entre cinco estados emocionais (`Triste`, `Ansioso`, `Neutro`, `Feliz`, `Motivado`), cada um representado por um ícone e uma cor distinta.

- **Registro de anotações:**  
  Permite escrever um texto livre sobre o dia, complementando o humor selecionado.

- **Resumo do humor selecionado:**  
  Ao escolher um humor, é exibido um **resumo visual**, destacando o estado emocional com a cor correspondente.

- **Validação de entrada:**  
  Impede salvar o registro caso nenhum humor tenha sido selecionado, garantindo dados consistentes.

- **Botão de salvar registro:**  
  Dispara a função `onSave()` passada por props, podendo ser usada para armazenar os dados no backend ou em estado global.

---

### ⚙️ Estrutura e Componentes

| Elemento | Função |
|-----------|--------|
| `MoodButton` | Componente de botão individual representando cada humor, com ícone, cor e nome. |
| `ScrollView` | Permite rolagem do conteúdo, acomodando todos os elementos mesmo em telas menores. |
| `Header` | Contém título e subtítulo explicando a função da tela. |
| `MoodGrid` | Grade de botões de humor para seleção visual. |
| `SummaryCard` | Exibe o resumo do humor selecionado de forma destacada. |
| `NoteSection` | Campo de texto para registrar anotações sobre o dia. |
| `SaveButton` | Botão para salvar o registro, desabilitado caso nenhum humor seja selecionado. |

---

### 🧠 Lógica Principal

- O estado `selectedMood` armazena o humor atual escolhido pelo usuário.
- O estado `note` mantém o conteúdo do campo de anotações.
- A função `handleSave()` valida a seleção do humor e executa `onSave()`, registrando os dados.
- Cada `MoodButton` altera o estado `selectedMood` quando pressionado.
- A renderização condicional exibe o resumo (`SummaryCard`) apenas se um humor tiver sido selecionado.

---

### 🎨 Estilo e Layout

- **Layout base:** `flex: 1` com fundo branco (`#FAFAFA`), utilizando `ScrollView` para rolagem do conteúdo.  
- **Grade de humores:** botões quadrados arredondados (`borderRadius: 20`) com ícones e cores representativas.  
- **Resumo do humor:** card com fundo azul claro (`#EAF0F7`) e texto centralizado.  
- **Campo de anotações:** input multilinha com borda suave e espaçamento interno confortável.  
- **Botão salvar:** destacado em roxo (`#6C63FF`), desabilitado em cinza claro (`#AAA`) se nenhum humor for selecionado.

---

### 🧩 Dependências Utilizadas

- `react-native` → componentes base (`View`, `Text`, `TouchableOpacity`, `TextInput`, `ScrollView`).  
- `react-native-vector-icons/MaterialCommunityIcons` → ícones de humor.  
- **Props:** `onSave` → função callback disparada ao salvar o registro.  

---

### 🧾 Considerações

O **HumorRegistration** funciona como **registro diário de sentimentos**, permitindo ao usuário monitorar seu estado emocional e criar hábitos de autocuidado.  
Sua estrutura modular com `MoodButton` facilita a expansão futura, como adicionar novos humores ou integrar armazenamento persistente via backend ou Firebase.  
O design intuitivo e responsivo garante que a experiência do usuário seja **clara, interativa e agradável**, incentivando o uso diário do aplicativo.


------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 🔸 Componente EXIBIÇÃO(LAYOUT): MainContent

**Local:** `src/layout/MainContent.tsx`  
**Descrição:**  
O componente **MainContent** atua como o **núcleo de exibição dinâmica** do aplicativo, sendo responsável por renderizar as telas principais de acordo com a navegação interna (Dashboard, Humor, Hábitos, Autocuidado e Meditação).  
Ele também inclui um **botão flutuante de chat**, que servirá futuramente para interação direta com um assistente virtual de apoio emocional.

---

### 🎯 Funcionalidades Principais

- **Gerenciamento de tela ativa:**  
  Controla qual tela está sendo exibida por meio do estado `activeScreen`.

- **Navegação centralizada:**  
  Usa a função `handleNavigate()` para alternar entre as seções do app, conforme definido no tipo `MainScreenState` (Dashboard, Humor, Hábito, Autocuidado, Meditação).

- **Logout do usuário:**  
  Inclui a função `handleLogout()`, responsável por encerrar a sessão de forma controlada (ainda em desenvolvimento).

- **Renderização condicional:**  
  Exibe diferentes componentes de tela de acordo com o valor atual de `activeScreen`.

- **Botão de chat flutuante:**  
  Ícone interativo (em formato de balão de mensagem) posicionado no canto inferior direito da tela, preparado para futuras integrações com chatbots ou suporte ao usuário.

---

### ⚙️ Estrutura e Componentes

| Elemento | Função |
|-----------|--------|
| `Dashboard` | Tela inicial e painel principal do usuário. |
| `HumorRegistration` | Tela para registrar emoções e sentimentos diários. |
| `Placeholder Views` | Estruturas temporárias para telas de Hábito, Autocuidado e Meditação (ainda em desenvolvimento). |
| `Floating Chat Button` | Botão fixo com ícone, permitindo acionamento rápido do suporte. |

---

### 🧠 Lógica Principal

- O estado `activeScreen` (inicializado como `'dashboard'`) define a tela que será exibida.
- A função `renderContent()` contém um **switch** que retorna o componente correto de acordo com o valor de `activeScreen`.
- A função `handleNavigate()` altera o estado para trocar de tela.
- O componente é totalmente **controlado via props internas**, sem necessidade de contextos externos de navegação, simplificando a lógica do fluxo principal.

---

### 🎨 Estilo e Layout

- **Layout base:** `flex: 1`, aproveitando toda a altura da tela.
- **Cores:** fundo cinza claro (`#F0F0F5`) e botão de chat em roxo (`#8A2BE2`), mantendo a identidade visual do app.
- **Design responsivo:** o chat flutuante é fixado via `position: absolute` e mantém distância segura das bordas em diferentes resoluções.
- **Placeholder visual:** textos centralizados para seções ainda não finalizadas.

---

### 🧩 Dependências Utilizadas

- `react-native` → componentes base (View, Text, TouchableOpacity).  
- `react-native-vector-icons/Feather` → ícones vetoriais (balão de chat).  
- `Dashboard` e `HumorRegistration` → telas integradas importadas do diretório `screens`.  
- `MainScreenState` → tipagem central da navegação definida em `BottomNav.tsx`.

---

### 🧾 Considerações

O **MainContent** funciona como o **container de navegação principal**, garantindo a exibição organizada das diferentes seções do aplicativo.  
Essa estrutura modular permite adicionar ou substituir telas facilmente, tornando o código mais **escalável e manutenível**.  

Além disso, o botão flutuante sugere futuras expansões da aplicação, como a inclusão de um **assistente virtual de autocuidado**, um diferencial que reforça a proposta do projeto em oferecer apoio emocional digital de forma acessível e interativa.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 🚢 Componente NAVEGAÇÃO: BottomNav

**Local:** `src/navegation/BottomNav.tsx`  

O componente **BottomNav** foi desenvolvido para gerenciar a navegação principal do aplicativo, oferecendo uma barra inferior fixa que permite ao usuário alternar de forma intuitiva entre as telas centrais do sistema: **Dashboard**, **Registro de Humor**, **Hábitos**, **Autocuidado** e **Meditação**. Ele atua como o núcleo de controle do fluxo de navegação, centralizando a lógica de alternância entre telas e garantindo que a experiência do usuário seja contínua e coerente.  

A implementação utiliza o estado interno `currentTab` para definir qual aba está ativa, permitindo a renderização condicional da tela correspondente. A função `renderScreen()` avalia o estado atual e retorna o componente adequado, como o **Dashboard**, que recebe funções de navegação e logout, ou a tela de **HumorRegistration**, que integra a função de salvamento do registro e redireciona o usuário de volta ao dashboard após o envio dos dados. As telas de **Hábitos**, **Autocuidado** e **Meditação** também são carregadas de forma condicional, sendo que a tela de meditação recebe o método `setNavigationState` para permitir navegação adicional dentro do fluxo do aplicativo.  

A barra inferior é composta por botões interativos (`TouchableOpacity`), cada um associado a um ícone e a um nome representativo de cada funcionalidade. A cor e o destaque visual dos ícones e textos mudam dinamicamente de acordo com a aba selecionada, fornecendo feedback visual imediato e melhorando a usabilidade. A lista de abas (`TabItems`) é definida de forma modular, facilitando a manutenção ou a inclusão de novas seções no futuro.  

O layout do **BottomNav** prioriza clareza e responsividade. O fundo da tela principal é cinza claro (`#F7F7F7`), enquanto a barra inferior utiliza fundo branco, com borda superior discreta para separar visualmente os elementos. Cada botão de aba ocupa espaço proporcional, garantindo interação confortável em diferentes tamanhos de tela, e os ícones são destacados com cores específicas (`#4F46E5` quando ativos e `#7F8C8D` quando inativos). O design é consistente e reforça a identidade visual do aplicativo, mantendo coesão com os outros componentes da interface.  

A construção modular do **BottomNav** permite que toda a lógica de navegação seja concentrada em um único componente, tornando o código mais manutenível e flexível. Essa abordagem facilita futuras expansões, como integração de relatórios de progresso, implementação de notificações ou inclusão de funcionalidades de inteligência artificial, garantindo que o sistema possa evoluir sem comprometer a experiência do usuário. Além disso, a centralização do fluxo de navegação contribui para a consistência do aplicativo, garantindo que todas as telas principais sejam acessíveis de forma rápida e intuitiva, reforçando a proposta de usabilidade e suporte ao bem-estar do usuário.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 🌀 Componente AUTENTICAÇÃO: SharedUI

 **Local:** `src/components/SharedUI.tsx`  

 🧾 **Descrição**:
    Componente reutilizável que fornece ícones simples via emojis e uma proteção de rotas para telas que exigem autenticação.

### 🎯 Funcionalidades Principais

 - **NativeIcon**: Exibe um emoji baseado na prop name. Permite customizar color e size. Fallback padrão caso o nome não exista.
 - **ProtectedRoute**: Verifica se o usuário está autenticado. Se não, redireciona para 'welcome'. Exibe children caso o usuário esteja logado.Mostra mensagem de carregando enquanto verifica autenticação.

### ⚙️ Estrutura

 - **NativeIcon**: retorna <Text> com emoji.
 - **ProtectedRoute**: wrapper que controla acesso a telas protegidas usando useAuth.

### 🧩 Dependências

- `react-native` → componentes base (View, Text).  
- `react` → useEffect, PropsWithChildren.
- **# 'hook autenticação'** 

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## ⌛ Componente: QuickActions

 **Local:** `src/components/QuickActions.tsx`  


 🧾 **Descrição**:
    O componente QuickActions oferece atalhos rápidos para funcionalidades essenciais do aplicativo, como humor, cuidados e meditação. Ele exibe botões com ícones e labels, permitindo ao usuário acessar rapidamente seções importantes do app.

### 🎯 Funcionalidades Principais

    Atalhos Interativos:
    Cada botão representa uma ação rápida com ícone e texto descritivo.

    Feedback de Ação:
    Ao pressionar, executa a função correspondente (onPress), que pode ser adaptada para navegação ou outras funcionalidades.

    Design Compacto:
    Layout horizontal com espaçamento uniforme, mantendo a interface limpa e acessível.

### 🎨 Estilo e Layout

    Container: linha horizontal (flexDirection: 'row') e espaçamento entre botões.

    Botões: fundo lilás claro, cantos arredondados, alinhamento centralizado e largura fixa.

    Label: texto pequeno, centralizado e com cor combinando com o ícone.

### ⚙️ Estrutura

    QuickActions (Principal)

    Mapeia as ações definidas no array actions.

    Renderiza <TouchableOpacity> para cada ação com ícone e label.

    QuickAction (Tipo)

    Define a estrutura de cada ação (label, Icon, onPress).

### 🧩 Dependências

react-native — View, Text, TouchableOpacity, StyleSheet.

lucide-react-native — ícones utilizados nos atalhos.

### 🔗 Observações Técnicas

Pode ser facilmente expandido com novas ações.

Mantém consistência visual e interação rápida, aumentando a usabilidade do app.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 💾 Componente: Placeholder 

 **Local:** `src/components/Placeholder.tsx`  

 🧾 **Descrição**:
    O PlaceholderPage é um componente simples utilizado para exibir páginas de espaço reservado no aplicativo. Ele mostra um título centralizado, servindo como referência visual durante o desenvolvimento ou para telas ainda não implementadas.

 ### 🎯 Funcionalidades Principais
    Exibe um título centralizado passado via prop title, Pode ser reutilizado em qualquer tela que ainda não tenha conteúdo definitivo, Ajuda a manter a consistência visual durante o desenvolvimento do app.

### ⚙️ Estrutura

PlaceholderPage (Principal)

Recebe a prop title.

interface PlaceholderProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

Renderiza um <Text> centralizado dentro de um <View>.


------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 💿 Componente: MeditationSessionCard

 **Local:** `src/components/MeditationSessionCard.tsx`  

 🧾 **Descrição**:
    O MeditationSessionCard é um componente utilizado para exibir informações de uma sessão de meditação no aplicativo. Cada card apresenta título, descrição, duração, ícone representativo e botão para iniciar a sessão, oferecendo uma interface clara e interativa.

 ### 🎯 Funcionalidades Principais

    Exibição de Sessão:
    Mostra o título e descrição da sessão, fornecendo informações resumidas sobre o conteúdo.

    Ícone Personalizado:
    Cada sessão possui um ícone do pacote Feather com fundo colorido definido via prop iconBgColor.

    Duração da Sessão:
    Exibe o tempo em minutos com ícone de relógio, facilitando a visualização rápida.

    Botão "Começar":
    Permite iniciar a sessão ao ser pressionado, disparando a função onPress com o ID da sessão.

### ⚙️ Estrutura

MeditationSessionCard (Principal)

 const MeditationSessionCard: React.FC<SessionCardProps> = ({ session, onPress }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.contentRow}>
          {/* Ícone com Fundo Colorido */}
          <View style={[styles.iconWrapper, { backgroundColor: session.iconBgColor }]}>
            <Feather name={session.iconName} size={28} color="#FFFFFF" />
          </View>

 Suporta customização de ícones e cores, permitindo flexibilidade na interface de diferentes tipos de sessões.

 {/* Botão Começar */}
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => onPress(session.id)}
                activeOpacity={0.8}
 
 Recebe a prop session com dados da sessão e onPress para ação do botão.


 ------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

 ## 🎇 Componente: HabitItem

  **Local:** `src/components/HabitItem.tsx`  

 🧾 **Descrição**:
    O HabitItem é um componente que representa um hábito individual em uma lista de hábitos. Ele permite que o usuário marque ou desmarque a conclusão de um hábito, refletindo visualmente o estado atual através de um checkbox customizado e alterações no estilo do texto.

 ### 🎯 Funcionalidades Principais

    Checkbox Interativo:
    Permite alternar entre concluído e não concluído, atualizando o estado interno e disparando a função onToggle passada pelas props.

    Feedback Visual:

    Checkbox muda de cor ao marcar o hábito.

    Texto do hábito recebe estilo riscado (line-through) e cor mais clara quando concluído.

    Reutilizável:
    Pode ser usado em qualquer lista de hábitos, bastando passar os dados corretos via props.

### ⚙️ Estrutura

**HabitItem (Principal)**

 - Recebe a prop habit com dados do hábito (id, text, completed).
 - Recebe a prop onToggle para atualizar o estado do hábito no componente pai.
 - Mantém estado interno isCompleted para controle visual do item.

------------------------------------------------------------------------------------------------//-------------------------//---------------------//-------------//

## 🚲 Componente: ActivityCard

 **Local:** `src/components/ActivityCard.tsx`  

 🧾 **Descrição**:
    O ActivityCard é um componente que exibe informações detalhadas de uma atividade, incluindo título, descrição, tempo de execução, dificuldade e benefício. Ele é utilizado em listas de atividades ou seções do aplicativo para apresentar de forma clara e visualmente organizada cada item.

 ### 🎯 Funcionalidades Principais

 **Exibição de Detalhes da Atividade**:
 - Título e descrição da atividade.
 - Tempo estimado em minutos.
 - Dificuldade (fácil, médio ou difícil) com tag colorida.
 - Benefício associado à prática da atividade.

**Feedback Visual:**

 - Tag de dificuldade muda de cor dependendo do nível.
 - Ícones do pacote Feather indicam tempo, dificuldade e benefício.

**Reutilizável**:
 - Pode ser usado em diferentes listas ou telas que exibam atividades do aplicativo.

### ⚙️ Estrutura

**ActivityCard (Principal)**

 - Recebe a prop activity com dados da atividade (**title, description, time, difficulty, benefit**).
 - Renderiza todas as informações de forma organizada, com ícones e tags visuais.


