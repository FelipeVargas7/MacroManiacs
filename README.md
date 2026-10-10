🥗 MacroManiacs

Aplicativo móvel para acompanhamento de metas nutricionais (macronutrientes), hidratação e engajamento coletivo através de chats em grupo gamificados.

📱 Visão Geral

O MacroManiacs combina o monitoramento diário de dieta (proteínas, carboidratos, gorduras e água) com uma comunidade ativa. Em vez de registrar refeições sozinho, os usuários participam de grupos temáticos com metas semanais colaborativas, rankings e troca de dicas de alimentação saudável.

✨ Funcionalidades Principais

💬 Chat em Grupo em Tempo Real: Conversas dinâmicas com outros membros do grupo para incentivo e compartilhamento de refeições pós-treino.

🏆 Gamificação e Conquistas: Notificações de conquistas coletivas (ex: bater meta semanal de água) que geram pontos para todo o grupo.

🖼️ Personalização Visual:

Alteração dinâmica da imagem do grupo diretamente da galeria.

Troca da foto de perfil do usuário.

📊 Navegação Integrada:

Início: Visão geral do dia e calorias restantes.

Refeições: Registro diário de macronutrientes e água.

Grupo: Interações, chat, metas e rankings da equipe.

Perfil: Ajuste de metas individuais e dados antropométricos.

🛠️ Tecnologias Utilizadas

Framework: React Native com Expo (Expo Router)

Linguagem: TypeScript

Ícones: @expo/vector-icons (Ionicons, Feather, MaterialCommunityIcons)

Manipulação de Imagens: expo-image-picker

Áreas Seguras: react-native-safe-area-context

🚀 Como Executar o Projeto Localmente

Pré-requisitos

Node.js (versão LTS recomendada)

Aplicativo Expo Go instalado no celular (Android ou iOS)

Passo a Passo

Clone o repositório:

git clone https://github.com/seu-usuario/macromaniacs.git
cd macromaniacs


Instale as dependências:

npm install


Instale os módulos nativos do Expo:

npx expo install @expo/vector-icons react-native-safe-area-context expo-image-picker


Inicie o servidor de desenvolvimento:

npx expo start


Visualizar no dispositivo:

Escaneie o QR Code exibido no terminal ou navegador usando o aplicativo Expo Go (Android) ou a Câmera nativa (iOS).

📂 Estrutura de Pastas

macromaniacs/
├── app/
│   ├── _layout.tsx         # Configuração de navegação raiz do Expo Router
│   └── index.tsx           # Tela principal do Chat e Grupo
├── assets/                 # Imagens, fontes e ícones estáticos
├── package.json
├── tsconfig.json
└── app.json
