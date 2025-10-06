# TrustHub — Arquitetura do Sistema

> Plataforma B2B para gestão centralizada de reputação e feedback.  
> Objetivos arquiteturais: **simplicidade**, **alta coesão**, **baixo acoplamento**, **tipagem forte** e **responsabilidade única**.

---

## 1) Stack & Padrões

### 1.1) Tecnologias Core
- **Framework**: Next.js 15 (App Router), React 19
- **UI**: Tailwind CSS v4, Shadcn UI (componentes externos)
- **Formulários**: React Hook Form + Zod (sempre juntos)
- **Autenticação**: Better-Auth (sessões, cookies HttpOnly)
- **Banco de Dados**: PostgreSQL + Prisma ORM (client gerado em `src/generated/prisma`)
- **Email**: Nodemailer (server-only)
- **Estado Global**: Zustand (slices tipados)
- **Qualidade**: TypeScript estrito, Clean Code, Biome (format/lint/fix)

### 1.2) Princípios Arquiteturais
- **Single Responsibility Principle**: cada componente/hook/função resolve **um** problema específico
- **Separation of Concerns**: lógica de negócio separada da apresentação
- **No Hardcoding**: **nada hardcoded** em componentes — sempre via `shared/constants`
- **Código 100% em inglês**: nomes, arquivos, funções e comentários
- **Comentários mínimos**: apenas quando estritamente necessário (ex.: conversões de tempo)

---

## 2) Estrutura de Pastas & Responsabilidades

### 2.1) Diretório `app/`
**Responsabilidade**: Páginas, layouts, route handlers e rotas da aplicação
- Componentes **server** por padrão
- Importe serviços de `shared/lib` para lógica de negócio
- Cada rota segue padrão: `components/`, `hooks/`, `utils/`, `actions/`

### 2.2) Diretório `shared/components/external/`
**Responsabilidade**: Componentes vindos de bibliotecas externas (Shadcn UI, Radix)
- Sem lógica de negócio
- Apenas composição e estilização
- Export centralizado via `index.ts`

### 2.3) Diretório `shared/components/internal/`
**Responsabilidade**: Componentes internos do produto
- Stateless sempre que possível
- Props tipadas com TypeScript
- Seguem Single Responsibility Principle

### 2.4) Diretório `shared/constants/`
**Responsabilidade**: **Única** fonte de strings, rotas e metadados
- Rotas centralizadas (`routes.ts`)
- Metadados da aplicação (`metadata.ts`)
- Nunca embutir textos/URLs em componentes

### 2.5) Diretório `shared/lib/`
**Responsabilidade**: Adaptações e configurações de serviços externos
- `better-auth.ts`: configuração de autenticação
- `prisma.ts`: cliente do banco de dados
- `nodemailer.ts`: configuração de email
- `tw-merge.ts`: utilitário para classes Tailwind

### 2.6) Diretório `shared/stores/`
**Responsabilidade**: Estado global com Zustand
- Slices pequenos, testáveis e tipados
- Cada slice segue padrão: `State` + `Actions` + `StateCreator`
- Exemplo: `sidebar.ts` para controle de sidebar

### 2.7) Diretório `shared/utils/`
**Responsabilidade**: Funções puras e reutilizáveis
- Sem acessar DOM/`window`
- Sem operações de I/O
- Funções testáveis e isoladas

---

## 3) Padrões de Componentes & Hooks

### 3.1) Separação de Responsabilidades
- **Componentes**: não conhecem detalhes de fetch, autenticação ou DB
- **Hooks de UI**: ficam junto ao componente interno (ex.: `useToggle`)
- **Hooks de domínio**: ficam em `shared/lib` ou módulo dedicado (ex.: `useSignIn`)

### 3.2) Container Hook Pattern
Quando um componente consumir múltiplos hooks com papéis distintos, extrair um *container hook* que orquestre a lógica:
- **Componente**: render puro (`FormSignIn.tsx`)
- **Hook**: integra RHF + Zod + chamada para API (`useSignIn`)

### 3.3) Estrutura de Hooks Customizados
```
hooks/
├── index.ts          # Export centralizado
└── use-feature.ts    # Hook específico com SRP
```

---

## 4) Formulários (React Hook Form + Zod)

### 4.1) Padrão Obrigatório
- Todo formulário usa **React Hook Form** + **Zod**
- Schema de validação em `utils/schema.ts`
- Mensagens de erro e labels via `shared/constants`

### 4.2) Estrutura de Formulários
```
feature/
├── components/
│   └── form-feature/
│       └── index.tsx    # Componente de apresentação
├── hooks/
│   └── use-feature.ts   # Lógica do formulário
└── utils/
    └── schema.ts        # Validação Zod
```

### 4.3) Integração com Server Actions
- Schemas exportados para reuso em server actions/route handlers
- Validação server-side usando os mesmos schemas Zod

---

## 5) Autenticação (Better-Auth)

### 5.1) Configuração
- Configuração central em `shared/lib/better-auth.ts`
- Apenas módulos **server** importam o client server-side
- Cookies HttpOnly, `SameSite=Lax`, `Secure` em produção

### 5.2) Segurança
- Sessão e role resolvidas no servidor
- Componentes recebem **dados já autorizados**
- Middleware de autenticação personalizado para tratamento de erros

### 5.3) Modelos de Dados
- `User`: dados do usuário
- `Session`: sessões ativas
- `Account`: contas vinculadas (OAuth, email/password)
- `Verification`: tokens de verificação

---

## 6) Banco de Dados & Prisma

### 6.1) Configuração
- **Datasource**: PostgreSQL
- **Client**: gerado para `src/generated/prisma`
- **Migrations**: versionadas e versionadas

### 6.2) Modelos de Dados
- `Post`: posts do usuário (exemplo)
- `User`: usuários do sistema
- `Session`: sessões de autenticação
- `Account`: contas de autenticação
- `Verification`: tokens de verificação

### 6.3) Relacionamentos
- Cascade delete para manter integridade
- Foreign keys com UUID
- Timestamps automáticos (`createdAt`, `updatedAt`)

---

## 7) Gerenciamento de Estado (Zustand)

### 7.1) Padrão de Slices
- Cada slice é tipado com `State` + `Actions`
- `StateCreator` para tipagem completa
- Slices pequenos e focados

### 7.2) Exemplo de Implementação
```typescript
interface State {
  isOpenSidebar: boolean;
}

interface Actions {
  toggleSidebar: () => void;
}

export type SidebarSlice = State & Actions;
```

### 7.3) Uso em Componentes
- Import do slice específico
- Acesso direto ao estado e ações
- Sem necessidade de providers

---

## 8) Scripts & Automação

### 8.1) Scripts de Desenvolvimento
- `dev`: gera Prisma + Next.js com Turbopack
- `build`: gera Prisma + build de produção
- `lint`: verificação com Biome
- `format`: formatação com Biome
- `fix`: lint + format em sequência

### 8.2) Scripts de Autenticação
- `auth:generate`: gera tipos do Better-Auth

---

## 9) Convenções de Código

### 9.1) Nomenclatura
- **Arquivos**: kebab-case (`form-sign-in.tsx`)
- **Componentes**: PascalCase (`FormSignIn`)
- **Hooks**: camelCase com prefixo `use` (`useSignIn`)
- **Funções**: camelCase (`handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (`ROUTES`)

### 9.2) Estrutura de Arquivos
- `index.ts` para exports centralizados
- Separação clara entre lógica e apresentação
- Imports organizados: externos → internos → relativos

### 9.3) TypeScript
- Tipagem estrita habilitada
- Interfaces para contratos
- Types para união de tipos
- Generics quando apropriado

---

## 10) Qualidade & Manutenibilidade

### 10.1) Ferramentas de Qualidade
- **Biome**: linting e formatação
- **TypeScript**: verificação de tipos
- **Prisma**: validação de schema

### 10.2) Testabilidade
- Funções puras em `shared/utils`
- Hooks isolados e testáveis
- Componentes stateless quando possível

### 10.3) Performance
- Next.js App Router para otimizações automáticas
- Turbopack para builds rápidos
- Prisma com queries otimizadas
