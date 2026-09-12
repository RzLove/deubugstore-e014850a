# Adicionar o produto Otimização

## Resultado
Adicionar o serviço “OTIMIZAÇÃO” à página inicial, ao catálogo, à busca e à página de detalhes, preservando o visual e os produtos existentes.

## Alterações

1. **Imagem fornecida**
   - Copiar a imagem anexada para `public/otimizacao-banner.png`.
   - Usar exatamente `/otimizacao-banner.png` no banner, card, catálogo e página do produto.

2. **Seção OTIMIZAÇÃO na página inicial**
   - Criar a seção logo após Minecraft e antes de “Acompanhe a Deu Bug”.
   - Reaproveitar a estrutura e o card da seção Minecraft, com destaque neon-cyan.
   - Exibir título, subtítulo, selo “ENTREGA RÁPIDA”, banner 16:9 e o único produto solicitado.
   - Manter o botão “COMPRAR” ligado ao mesmo modal de compra existente.

3. **Produto no catálogo e na busca**
   - Ampliar o modelo atual para aceitar a categoria `otimizacao`, slug explícito, badge e texto de acesso.
   - Cadastrar o produto estático com slug `otimizacao-pc-fps-boost`, preços R$ 100,00/R$ 35,00, estoque 30 e os textos fornecidos.
   - Registrar o mesmo produto na tabela de produtos da Lovable Cloud, sem alterar registros existentes.
   - Adicionar a aba “Otimização” ao Catálogo Completo e filtrar somente essa categoria.
   - Garantir que o produto apareça em “Todos”, na busca e nos contadores.

4. **Página própria do produto**
   - Manter a rota existente `/game/otimizacao-pc-fps-boost` e o mesmo layout geral das páginas de produto.
   - Para esse serviço, mostrar “Serviço remoto — aplicação em até 5 minutos” e conteúdo de otimização em vez de textos específicos de acesso a jogos por 30 dias.
   - Preservar o modal de compra e o contato atual via Discord/WhatsApp.

5. **Validação**
   - Verificar catálogo, filtro, busca, modal e página própria em desktop e celular.
   - Confirmar que a imagem pública carrega e que nenhum preço ou produto existente foi modificado.

## Detalhes técnicos
- O produto será incluído na fonte estática usada pela busca e também na tabela `products`, pois o catálogo mescla as duas fontes e prioriza os registros da Lovable Cloud.
- O card compartilhado da seção Minecraft será parametrizado por cor para evitar duplicação e manter o mesmo padrão visual.
- A categoria `otimizacao` será reconhecida pelo tipo, pelo filtro e pelos termos de busca existentes.
