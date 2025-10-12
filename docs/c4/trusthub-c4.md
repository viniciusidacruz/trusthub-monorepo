# TrustHub C4 Architecture & User Flow

Este documento apresenta a visão em múltiplos níveis do TrustHub utilizando o modelo C4, destacando como os diferentes perfis de usuário percorrem a plataforma e quais partes do sistema são acionadas em cada etapa.

## Nível 1 — Diagrama de Contexto

O objetivo é mostrar o TrustHub como um sistema único, seus atores externos e integrações principais.

```mermaid
%%{init: {"theme": "neutral"}}%%
C4Context
    title TrustHub — Contexto do Sistema
    Person(user, "Usuário", "Cliente que publica e acompanha feedbacks")
    Person(admin, "Admin", "Gestor da empresa que responde feedbacks e acompanha métricas")
    System(trusthub, "TrustHub", "Plataforma B2B de gestão de reputação")
    System_Ext(googleReviews, "Google Reviews", "Fonte externa de avaliações públicas")
    System_Ext(reclameAqui, "Reclame Aqui", "Plataforma de reclamações monitorada pelo TrustHub")
    System_Ext(emailService, "Serviço de Email", "Envio de notificações e convites via SMTP")

    Rel(user, trusthub, "Cria e acompanha feedbacks")
    Rel(admin, trusthub, "Gere empresa, responde feedbacks, consome analytics")
    Rel(trusthub, googleReviews, "Importa avaliações públicas (planos Intermediate e Enterprise)")
    Rel(trusthub, reclameAqui, "Sincroniza reclamações (plano Enterprise)")
    Rel(trusthub, emailService, "Dispara alertas críticos e comunicações")
```

## Nível 2 — Diagrama de Containers

Representa os principais contêineres (aplicações, bancos e serviços) e como eles colaboram para cumprir o fluxo de ponta a ponta.

```mermaid
%%{init: {"theme": "neutral"}}%%
C4Container
    title TrustHub — Contêineres Principais
    Person(user, "Usuário")
    Person(admin, "Admin")

    System_Boundary(trusthub, "TrustHub") {
        Container(nextApp, "Next.js App", "React + Next.js 15", "Interface web (App Router) que atende admins e usuários")
        Container(serverActions, "Server Actions & Route Handlers", "Next.js Server", "Executam regras de negócio, autenticação e integrações")
        Container(authService, "Better-Auth", "Library", "Gerencia sessões, roles e tokens")
        Container(prisma, "Prisma ORM", "Node.js", "Acesso tipado ao banco relacional")
        ContainerDb(database, "PostgreSQL", "Banco de Dados", "Armazena usuários, empresas, feedbacks, sessões e planos")
        Container(notification, "Email Worker", "Node.js + Nodemailer", "Envio de alertas críticos e convites")
        Container(externalIngest, "External Ingestion Jobs", "Node.js", "Coleta dados do Google Reviews e Reclame Aqui conforme o plano")
    }

    System_Ext(googleReviews, "Google Reviews", "Avaliações públicas")
    System_Ext(reclameAqui, "Reclame Aqui", "Reclamações externas")
    System_Ext(emailService, "SMTP Provider", "Entrega de emails transacionais")

    Rel(user, nextApp, "Interage via navegador")
    Rel(admin, nextApp, "Interage via navegador")
    Rel(nextApp, serverActions, "Invoca ações server-side")
    Rel(serverActions, authService, "Valida sessões e roles")
    Rel(serverActions, prisma, "Executa queries tipadas")
    Rel(prisma, database, "CRUD dados TrustHub")
    Rel(serverActions, notification, "Solicita envio de emails")
    Rel(notification, emailService, "SMTP")
    Rel(externalIngest, googleReviews, "Importa avaliações públicas")
    Rel(externalIngest, reclameAqui, "Coleta reclamações")
    Rel(externalIngest, prisma, "Persiste dados integrados")
```

## Nível 3 — Componentes do Next.js App

Foco na estrutura interna do contêiner `Next.js App`, destacando componentes e camadas que participam das jornadas principais.

```mermaid
%%{init: {"theme": "neutral"}}%%
C4Component
    title TrustHub — Componentes da Aplicação Web
    Container(nextApp, "Next.js App", "React")

    Component(appRouter, "App Router Pages & Layouts", "Server Components", "Entrega páginas públicas e autenticadas")
    Component(uiComponents, "Shared UI Components", "React", "Componentes visuais reutilizáveis (Shadcn + internos)")
    Component(forms, "Form Hooks", "React Hook Form + Zod", "Validação e submissão de formulários de feedback e login")
    Component(zustandStores, "Zustand Stores", "State Management", "Gerencia estado client-side (ex.: sidebar, filtros)")
    Component(authClient, "Better-Auth Client", "Browser/Server", "Consome sessão autenticada e refresh tokens")
    Component(apiActions, "Server Actions", "Next.js", "Executa lógica de domínio para feedbacks, empresas e planos")
    Component(prismaAdapter, "Prisma Adapter", "Server Utility", "Wrapper que expõe operações tipadas do banco")

    Rel(appRouter, uiComponents, "Renderiza UI compartilhada")
    Rel(appRouter, forms, "Incorpora validação e submissão")
    Rel(forms, apiActions, "Submete dados com validação")
    Rel(appRouter, zustandStores, "Controla estado de interface")
    Rel(appRouter, authClient, "Controla rotas protegidas")
    Rel(apiActions, prismaAdapter, "Usa Prisma via server-side")
```

> Nota: o `prismaClient` e demais serviços server-side residem no contêiner de Server Actions/Route Handlers mostrado no nível 2.

## Nível 4 — Fluxo Dinâmico do Usuário

O diagrama abaixo resume o fluxo completo desde o ponto de vista de cada persona, destacando condicionais relacionadas aos planos de assinatura.

```mermaid
%%{init: {"theme": "neutral"}}%%
C4Dynamic
    title Fluxo Dinâmico — Usuário vs. Admin
    Person(user, "Usuário")
    Person(admin, "Admin")
    Container(nextApp, "Next.js App")
    Container(serverActions, "Server Actions")
    Container(prisma, "Prisma ORM")
    ContainerDb(database, "PostgreSQL")
    Container(externalIngest, "External Ingestion Jobs")

    Rel(user, nextApp, "1. Explora empresas públicas e envia feedback")
    Rel(nextApp, serverActions, "2. Valida dados com Zod e envia ação server-side")
    Rel(serverActions, prisma, "3. Persiste feedback e histórico")
    Rel(prisma, database, "4. Salva feedback vinculado à empresa")
    Rel(admin, nextApp, "5. Admin acessa dashboard filtrado pela própria empresa")
    Rel(nextApp, serverActions, "6. Server Actions retornam feedbacks conforme plano")
    Rel(serverActions, prisma, "7. Consulta feedbacks + métricas")
    Rel(prisma, database, "8. Retorna dados autorizados")
    Rel(externalIngest, prisma, "9. Jobs importam avaliações externas (quando plano >= Intermediate)")
    Rel(prisma, database, "10. Atualiza tabelas de fontes externas")
    Rel(serverActions, nextApp, "11. Admin recebe alertas/sugestões conforme plano")
```

## Narrativa do Fluxo do Usuário

1. **Descoberta e Login**  
   O usuário cria conta ou inicia sessão via email e senha. O fluxo de autenticação passa pelo Better-Auth, que gera tokens e vincula a sessão ao contexto correto (empresa para admins, perfil individual para usuários).  
2. **Exploração e Feedback (Usuário)**  
   Pelo catálogo público, o usuário escolhe uma empresa e envia um feedback. O formulário utiliza React Hook Form + Zod, e a submissão invoca uma Server Action que persiste o feedback no PostgreSQL via Prisma. O usuário passa a visualizar o histórico das interações na sua área pessoal.  
3. **Monitoramento e Resposta (Admin)**  
   O administrador acessa o dashboard centralizado da sua empresa. As Server Actions filtram feedbacks e métricas pelo `companyId` associado à sessão. O admin responde, atribui responsáveis e acompanha indicadores-chave.  
4. **Integração Multicanal por Plano**  
   Jobs agendados coletam avaliações externas. Clientes **Intermediate** recebem dados do Google Reviews; clientes **Enterprise** também recebem Reclame Aqui. Essas entradas alimentam os módulos de feedbacks e analytics.  
5. **Alertas e Insights**  
   Quando feedbacks críticos chegam ou padrões são detectados, notificações podem ser disparadas via Nodemailer para os admins e colaboradores, reforçando a gestão proativa da reputação.

Esses diagramas fornecem uma visão unificada da plataforma TrustHub, alinhando arquitetura técnica com as jornadas de negócio descritas no README e no documento de arquitetura.
