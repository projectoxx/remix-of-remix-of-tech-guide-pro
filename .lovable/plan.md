## Diagnóstico

Todos os problemas têm a mesma causa raiz: **hoje o painel salva tudo (preços, imagens, links de afiliado, produtos novos) no `localStorage` do navegador em que você editou.**

- No celular é *outro* navegador → não vê fotos, links de afiliado voltam para `#` (por isso "atualiza a página" ao clicar em "Ver no Mercado Livre").
- Preços "R$ 2" ou "R$ 4" são valores que ficaram salvos por engano no seu painel local — só existem no seu desktop.
- Avaliações estão só no `localStorage` (não persistem, não aparecem para ninguém).
- Formulário de alerta de preço hoje não faz nada.

Solução: ativar **Lovable Cloud** e mover essa configuração para o banco, além de criar reviews e alertas por e-mail.

## O que vou construir

### 1. Ativar Lovable Cloud (backend)
Banco Postgres + autenticação + e-mails, tudo integrado. Sem contas extras.

### 2. Painel migrado para o banco
Novas tabelas: `product_overrides` (preço, preço antigo, % desconto, rótulo, imagem, link de afiliado por slug) e `user_products` (produtos criados por você). Leitura pública (qualquer visitante, qualquer aparelho) via política `TO anon` restrita só às colunas seguras; escrita **só para admin** (tabela `user_roles` + função `has_role`, padrão seguro).

Login do painel: substituir a senha em `sessionStorage` por login real (e-mail + senha) com role `admin`. A URL secreta `/painel-controle-9k2m` continua.

Um botão de "importar do navegador" para subir de uma vez o que já está no seu localStorage — assim você não perde as configurações atuais e limpa os "R$ 2".

### 3. Fotos aparecendo no celular
Depois que as imagens vêm do banco (e não do localStorage), aparecem em qualquer aparelho automaticamente. Também vou garantir `loading="lazy"`, `object-contain` e `min-height` no tile mobile para não quebrar layout.

### 4. Botão "Ver no Mercado Livre"
Passa a ler o link do banco. Vou trocar o fallback de `href="#"` (que recarrega a página) por botão **desabilitado** quando não houver link, para nunca mais atualizar a página à toa. `rel="sponsored noopener"` e `target="_blank"` continuam.

### 5. Avaliações salvas no Supabase
Tabela `reviews` (product_slug, rating, author, comment, created_at, status). Qualquer visitante pode enviar; qualquer visitante lê apenas reviews `approved`. Novo review entra como `pending` — você aprova pelo painel (aba "Avaliações"). Isso protege de spam.

### 6. Alertas de preço por e-mail (`ofertas@techradarbrasil.store`)
- Tabela `price_alert_subscribers` (email, created_at, confirmed_at, unsubscribed_at).
- Formulário do rodapé grava no banco e dispara e-mail de **confirmação (double opt-in)** — obrigatório para não queimar o domínio.
- No painel, aba "Enviar oferta": você escolhe um produto, escreve uma nota curta e envia para todos os inscritos confirmados. Envio individual por fila (nada de "bulk" burro), com link de descadastro em cada e-mail.
- Infraestrutura de e-mail: vou configurar o **Lovable Emails** no domínio `techradarbrasil.store`. Você vai precisar entrar em **Cloud → Emails** uma vez para colar 2–3 registros DNS no seu provedor (a Lovable mostra os valores exatos). Enquanto o DNS não propaga, o envio fica em fila.
  - Obs.: `ofertas@techradarbrasil.store` funciona como remetente visível assim que o domínio for verificado. Não precisa de servidor de e-mail próprio nem SMTP externo.

## Detalhes técnicos (para referência)

- Stack: TanStack Start + Supabase (via Lovable Cloud). Leituras públicas via `createServerFn` com cliente publishable + policies `TO anon`. Escritas do painel via `requireSupabaseAuth` + `has_role(auth.uid(),'admin')`.
- Painel vira rota `_authenticated/painel-controle-9k2m` (gate padrão do template) + checagem de role. Remove hash de senha no client.
- E-mails via `email_domain--setup_email_infra` + `scaffold_transactional_email`. Templates React Email: "Confirme sua inscrição", "Nova oferta: {produto}", "Descadastrar".
- Migração one-shot no painel: lê `localStorage` atual e faz upsert nas tabelas novas, depois limpa as chaves antigas.

## O que você precisa fazer (só uma vez)

1. Confirmar este plano.
2. Depois que eu ativar o Cloud e configurar o domínio de e-mail, abrir **Cloud → Emails** e adicionar os registros DNS no seu provedor de domínio (Registro.br / Hostgator / onde estiver `techradarbrasil.store`). Enquanto isso não é feito, o site funciona 100%, só os e-mails ficam aguardando.
3. Criar sua conta de admin no primeiro login do painel (eu deixo o script pronto para promover seu e-mail a admin).

Posso seguir?