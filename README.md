# 🛰️ OrbitAgro — Monitoramento Agrícola via Satélite

<div align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Global Solution 2026/1 — FIAP**

*Conectando dados orbitais com o agronegócio para otimizar produtividade, prever desastres climáticos e impulsionar a agricultura sustentável no Brasil.*

</div>

---

## 📋 Descrição

O **OrbitAgro** é uma plataforma web que utiliza dados de satélites como Sentinel-2, Landsat-8, CBERS-4A e GOES-16 para fornecer monitoramento agrícola em tempo real, alertas climáticos antecipados e análise inteligente de culturas.

O projeto foi desenvolvido como parte da **Global Solution 2026/1** da FIAP, cujo tema é a **Economia Espacial** — conectando a exploração espacial com problemas e oportunidades reais na Terra.

### 🌍 Alinhamento com os ODS da ONU

- **ODS 2** — Fome zero e agricultura sustentável
- **ODS 9** — Indústria, inovação e infraestrutura
- **ODS 13** — Ação contra a mudança global do clima

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev) | 18+ | Framework SPA |
| [Vite](https://vite.dev) | 6+ | Build tool e dev server |
| [TypeScript](https://www.typescriptlang.org) | 5+ | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 4+ | Estilização e responsividade |
| [React Router DOM](https://reactrouter.com) | 7+ | Roteamento SPA |
| Fetch API | Nativa | Consumo de API REST |
| [Vercel](https://vercel.com) | — | Deploy e hospedagem |
| [GitHub](https://github.com) | — | Versionamento de código |

---

## 📁 Estrutura de Pastas

```
gs_final/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx       # Navegação responsiva com menu mobile
│   │   ├── Footer.tsx       # Rodapé com links e referências
│   │   ├── Loading.tsx      # Indicador de carregamento animado
│   │   ├── ErrorMessage.tsx # Exibição de erros com retry
│   │   └── Notificacao.tsx  # Toast de notificações
│   ├── contexts/            # Context API (estado global)
│   │   └── AppContext.tsx   # Menu mobile e notificações
│   ├── hooks/               # Custom hooks
│   │   └── useFetch.ts     # Hook genérico para requisições
│   ├── pages/               # Páginas do sistema
│   │   ├── Home.tsx         # Landing page
│   │   ├── Sobre.tsx        # Sobre o projeto
│   │   ├── Integrantes.tsx  # Equipe do projeto
│   │   ├── FAQ.tsx          # Perguntas frequentes
│   │   ├── Contato.tsx      # Formulário de contato
│   │   ├── Dashboard.tsx    # Painel de monitoramento
│   │   ├── Culturas.tsx     # CRUD de culturas
│   │   ├── CulturaDetalhe.tsx # Detalhe (rota dinâmica)
│   │   ├── Alertas.tsx      # Lista de alertas climáticos
│   │   ├── AlertaDetalhe.tsx # Detalhe (rota dinâmica)
│   │   └── NotFound.tsx     # Página 404
│   ├── routes/              # Configuração de rotas
│   │   └── AppRoutes.tsx    # Rotas estáticas e dinâmicas
│   ├── services/            # Camada de comunicação com API
│   │   └── api.ts           # Fetch API com CRUD completo
│   ├── types/               # Tipos e interfaces TypeScript
│   │   └── index.ts         # Types, Union, Intersection, Interface
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais + Tailwind
├── server/                # API REST (json-server)
│   ├── db.json            # Banco de dados JSON
│   ├── index.js           # Entry point do servidor
│   ├── package.json       # Dependências da API
│   └── DEPLOY.md          # Guia de deploy no Render
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 👨‍💻 Autores e Créditos

<div align="center">

| Foto | Nome | RM | Turma | Links |
|:---:|---|:---:|:---:|---|
| <img src="https://github.com/Iguinhuus.png" width="80" style="border-radius:50%"> | **Igor Mendes Oviedo** | 553434 | 1TDSPS-2025 | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/Iguinhuus) [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/igor-mendes-oviedo-27aabb202/) |

</div>

---

## 🖼️ Imagens do Projeto

### Home
> Landing page com apresentação do projeto, features e conexão com ODS da ONU.

### Dashboard
> Painel de monitoramento com KPIs, tabela de culturas e alertas recentes.

### Culturas
> Listagem e cadastro de culturas com filtros por status (ativa, inativa, alerta).

### Alertas Climáticos
> Feed de alertas gerados por dados satelitais com classificação de severidade.

---

## 📖 Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+ instalado
- [Git](https://git-scm.com) instalado

### Instalação e Execução Local

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>

# Entrar na pasta do projeto
cd gs_final

# Instalar dependências do frontend
npm install

# Instalar dependências da API
cd server
npm install
cd ..
```

### Executando o projeto

```bash
# Terminal 1 — Iniciar a API (porta 3001)
cd server
npm start

# Terminal 2 — Iniciar o frontend (porta 5173)
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e a API em `http://localhost:3001`.

### Build de Produção

```bash
npm run build
npm run preview
```

### Links do Projeto

| Recurso | Link |
|---|---|
| 🔗 **Repositório GitHub** | [github.com/Iguinhuus/gs_final](https://github.com/Iguinhuus/gs_final) |
| 🎥 **Vídeo no YouTube** | *Link do vídeo aqui* |
| 🌐 **Deploy na Vercel** | *URL do deploy aqui* |

> ⚠️ **Nota:** Atualizar os links acima após a publicação do vídeo e o deploy.

---

## 🔌 Integração com API

O projeto está preparado para consumir a API REST desenvolvida na disciplina de **Domain Driven Design Using Java**. A integração utiliza a **Fetch API** nativa (sem Axios) com os seguintes métodos HTTP:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/culturas` | Listar todas as culturas |
| `GET` | `/culturas/:id` | Buscar cultura por ID |
| `POST` | `/culturas` | Cadastrar nova cultura |
| `PUT` | `/culturas/:id` | Atualizar cultura existente |
| `DELETE` | `/culturas/:id` | Remover cultura |
| `GET` | `/alertas` | Listar alertas climáticos |
| `GET` | `/alertas/:id` | Buscar alerta por ID |
| `POST` | `/contatos` | Enviar formulário de contato |

Para conectar com a API real, crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://sua-api-java.com/api
```

---

## 📱 Responsividade

A aplicação é **totalmente responsiva**, utilizando exclusivamente **Tailwind CSS** com abordagem mobile-first:

| Breakpoint | Dispositivo | Classe Tailwind |
|---|---|---|
| < 640px | Mobile | default |
| ≥ 640px | Small | `sm:` |
| ≥ 768px | Tablet | `md:` |
| ≥ 1024px | Desktop | `lg:` |
| ≥ 1280px | Large Desktop | `xl:` |

---

## 📞 Contato

- **E-mail:** contato@orbitagro.com.br
- **GitHub:** [github.com/Iguinhuus](https://github.com/Iguinhuus)
- **LinkedIn:** [Igor Mendes Oviedo](https://www.linkedin.com/in/igor-mendes-oviedo-27aabb202/)
- **Instituição:** FIAP — São Paulo, SP

---

<div align="center">

**© 2026 OrbitAgro — Global Solution FIAP**

*React + Vite + TypeScript + Tailwind CSS*

</div>
