# Plano de Implementação

1. **Estrutura de Rotas**: Adicionar `src/routes/game.$id.tsx` para a página de detalhes do jogo.
2. **Criação da Página de Detalhes**:
    * Implementar o componente `GameDetailPage` com:
        * Cabeçalho de alta qualidade (imagem de capa, nome, plataforma, selos).
        * Informações principais: Preço, Botão "Comprar Agora" (usando o `PurchaseModal` existente).
        * Descrição detalhada, requisitos mínimos/recomendados e entrega.
        * Gatilhos de conversão: Selos de segurança, selos de entrega rápida/instantânea.
3. **Atualização dos Componentes de Grade**:
    * Atualizar `GameGrid` e `ProductGrid` para que, ao clicar no jogo, o usuário seja redirecionado para a página `game/$id` usando `useNavigate` do TanStack Router.
4. **Data Management**:
    * Centralizar a lista de jogos/produtos (atualmente dispersa em vários componentes) em um arquivo comum `src/lib/games.ts` ou integrar no `__root.tsx`.

### Detalhes Técnicos
*   **Routing**: TanStack Router (`file-based`).
*   **Componentes**: UI baseada em Tailwind, Lucide React para ícones.
*   **Data**: Adicionar atributos como `description`, `minRequirements`, `recommendedRequirements`, `platform` na estrutura do objeto de jogo.
