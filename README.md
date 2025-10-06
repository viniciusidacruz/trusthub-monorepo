# TrustHub

**Confiança em um só lugar.**

O **TrustHub** é uma plataforma B2B de **gestão centralizada de reputação e feedback**, permitindo que empresas monitorem, respondam e analisem em um só dashboard a percepção de clientes em diferentes canais (Google Reviews, Reclame Aqui, redes sociais e outros).

Este repositório é um **monolito** que contém tanto o cliente (frontend) quanto o servidor (backend) do TrustHub, garantindo organização, escalabilidade e padronização.

---

## 🚀 Visão Geral do Produto

- **Nome:** TrustHub  
- **Slogan:** _Confiança em um só lugar._  
- **Objetivo:** Centralizar e simplificar o gerenciamento de reputação corporativa.  
- **Público-alvo:** Empresas de todos os portes que precisam acompanhar e gerenciar feedbacks de clientes em tempo real.  

---

## 🛠️ Funcionalidades Principais

- 🔎 **Monitoramento Multicanal**: acompanhe avaliações e menções em diversas plataformas.  
- 📊 **Dashboard Centralizado**: visualize métricas de reputação e engajamento em um só lugar.  
- ⚡ **Alertas em Tempo Real**: notificações imediatas sobre novos feedbacks críticos.  
- 🤝 **Gestão Colaborativa**: atribua responsabilidades à equipe e acompanhe o histórico de respostas.  
- 📈 **Relatórios Inteligentes**: insights acionáveis para melhorar a reputação da marca.  

---

## 📋 Regras de Negócio

O TrustHub opera com um modelo de **assinatura escalável**, dividido em três planos principais.  
Cada plano oferece um nível progressivo de acesso às fontes de feedback e às ferramentas de análise disponíveis na plataforma.

### 🧩 Planos Disponíveis

#### 1. **Essencial (Essential)**
- Voltado para pequenas empresas que desejam iniciar o monitoramento de sua reputação.  
- Permite visualizar **somente os feedbacks cadastrados diretamente na plataforma** — ou seja, aqueles enviados por clientes dentro do próprio sistema TrustHub.  
- Ideal para quem quer consolidar o atendimento e começar a construir uma base de reputação digital.  

#### 2. **Intermediário (Intermediate)**
- Inclui todas as funcionalidades do plano **Essencial**.  
- Além disso, o usuário passa a ter acesso aos **feedbacks e comentários públicos do Google**, integrando as avaliações do Google My Business diretamente ao painel.  
- Esse plano oferece uma visão mais ampla da reputação online, permitindo comparar percepções internas e externas.  

#### 3. **Empresarial (Enterprise)**
- Inclui todas as funcionalidades dos planos anteriores.  
- Expande o monitoramento para **múltiplas fontes externas**, incluindo **Reclame Aqui**, **Google Reviews** e a própria **plataforma TrustHub**.  
- Voltado para médias e grandes empresas que buscam uma gestão de reputação completa, com **monitoramento avançado, relatórios analíticos detalhados e suporte prioritário**.  

---

### 🔒 Controle de Acesso por Plano

| Recurso                                 | Essencial | Intermediário | Empresarial |
|----------------------------------------|:----------:|:--------------:|:------------:|
| Feedbacks da plataforma TrustHub       | ✅         | ✅             | ✅           |
| Comentários e avaliações do Google     | ❌         | ✅             | ✅           |
| Reclamações do Reclame Aqui            | ❌         | ❌             | ✅           |
| Relatórios avançados e alertas críticos | ❌         | ✅ (limitado)  | ✅ (completo) |

---

## 👥 Sessão de Usuário e Controle de Acesso  

O **TrustHub** utiliza um sistema de autenticação e autorização baseado em **sessões seguras** e **papéis de usuário (roles)**.  
Cada sessão é autenticada e isolada, garantindo que os acessos e ações dentro da plataforma estejam de acordo com as permissões de cada perfil.  

### 🧑‍💼 Tipos de Usuário  

#### 1. **Admin (Administrador da Empresa)**
- Representa a **empresa contratante** do TrustHub.  
- É responsável por **gerenciar todos os dados e usuários associados à sua organização**.  
- Tem acesso completo aos recursos vinculados à sua empresa, incluindo:  
  - Visualização de **todos os feedbacks** da empresa.  
  - Acesso aos **relatórios analíticos e métricas de reputação**.  
  - Configuração dos **canais integrados** (Google, Reclame Aqui, etc.).  
  - Gerenciamento de **usuários internos** (criação, edição e exclusão).  
  - Respostas oficiais aos feedbacks recebidos.  
- O **Admin é sempre vinculado a uma única empresa**, e sua sessão reflete o contexto organizacional dessa empresa.  

#### 2. **User (Usuário Comum)**
- É o usuário final da plataforma, que interage com as empresas cadastradas no ecossistema TrustHub.  
- Pode:  
  - **Visualizar todas as empresas** públicas cadastradas na plataforma.  
  - **Criar novos feedbacks** sobre produtos, serviços ou atendimentos.  
  - **Avaliar empresas** com base em sua experiência.  
  - **Ver as respostas** enviadas pelos administradores das empresas.  
  - **Consultar informações públicas** das empresas, incluindo:  
    - Nome comercial, setor e descrição.  
    - **Avaliações e perguntas** relacionadas à empresa.  
    - **Canais de contato** (e-mail, telefone ou links externos) — quando disponibilizados pela própria empresa.  
- O usuário não tem acesso aos painéis internos de gestão das empresas, apenas às informações públicas e interativas.  

---

### 🔐 Funcionamento da Sessão  

1. **Autenticação**
   - O usuário realiza login com **e-mail e senha**.  
   - O sistema valida as credenciais e gera uma **sessão persistente** com tokens seguros e expiração controlada.  

2. **Associação ao Contexto de Empresa (para Admins)**
   - Caso o usuário seja do tipo **Admin**, a sessão é automaticamente vinculada à empresa associada.  
   - Todas as requisições e dados visualizados são filtrados pelo **ID da empresa**.  

3. **Autorização (Roles)**
   - Cada área do sistema valida a **role** do usuário antes de permitir o acesso.  
   - Usuários com `role = "admin"` possuem acesso às rotas corporativas e dados internos da empresa.  
   - Usuários com `role = "user"` acessam apenas áreas públicas e de interação social.  

4. **Expiração e Segurança**
   - Sessões expiram automaticamente após um período de inatividade.  
   - Tokens de acesso são renovados via **refresh token**.  
   - Todas as sessões são registradas e auditadas, permitindo o encerramento manual pelo administrador da empresa.  

---

### 🧭 Resumo do Modelo de Acesso  

| Função        | Pode ver todas as empresas | Pode criar feedbacks | Pode ver respostas | Pode gerenciar empresa | Pode ver feedbacks internos | Pode acessar contatos públicos |
|----------------|:--------------------------:|:--------------------:|:------------------:|:----------------------:|:---------------------------:|:------------------------------:|
| **User**       | ✅                         | ✅                   | ✅                 | ❌                     | ❌                          | ✅                            |
| **Admin**      | ❌ (somente sua empresa)   | ❌                   | ✅                 | ✅                     | ✅                          | ✅ (da própria empresa)        |

---

📌 **Em resumo:**  
O **User** interage com todas as empresas públicas cadastradas no TrustHub — visualizando informações, avaliações e canais de contato — enquanto o **Admin** gerencia integralmente os dados, feedbacks e reputação da sua própria empresa.  

Essa separação de papéis garante **segurança, integridade das informações** e uma **experiência direcionada** para cada tipo de usuário.
