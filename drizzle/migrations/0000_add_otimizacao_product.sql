alter table public.products drop constraint if exists products_category_check;
alter table public.products add constraint products_category_check check (category in ('games','streaming','otimizacao'));

insert into public.products (
  slug, category, name, short_description, description, rules, warranty,
  price, image, banner_image, stock, is_active, is_sold_out, delivery_type,
  variations, data, sort_order
) values (
  'otimizacao-pc-fps-boost',
  'otimizacao',
  'Otimização de PC para Jogos — FPS Boost + Debloat Windows',
  'Script premium de otimização aplicado remotamente: ganho real de FPS, menos input lag e travamentos, e remoção de bloatware do Windows. Suporte incluso via Discord e WhatsApp.',
  'Script premium de otimização aplicado remotamente: ganho real de FPS, menos input lag e travamentos, e remoção de bloatware do Windows. Suporte incluso via Discord e WhatsApp.',
  '',
  '',
  35.00,
  '/otimizacao-banner.png',
  '/otimizacao-banner.png',
  30,
  true,
  false,
  'manual',
  '[]'::jsonb,
  '{"game": {
     "cover": "/otimizacao-banner.png",
     "originalNumber": 100,
     "description": "Script premium de otimização aplicado remotamente: ganho real de FPS, menos input lag e travamentos, e remoção de bloatware do Windows. Suporte incluso via Discord e WhatsApp.",
     "about": "Script premium de otimização aplicado remotamente: ganho real de FPS, menos input lag e travamentos, e remoção de bloatware do Windows. Suporte incluso via Discord e WhatsApp.",
     "tags": ["FPS Boost", "Menos Lag", "Debloat Windows"],
     "rating": "Livre",
     "platform": "PC",
     "minReq": {"os": "Windows 10 ou Windows 11", "cpu": "Processadores Intel ou AMD compatíveis", "ram": "4 GB ou mais", "gpu": "Placas NVIDIA, AMD ou Intel", "storage": "Espaço temporário para a aplicação"},
     "recReq": {"os": "Windows 11 atualizado", "cpu": "Processadores Intel ou AMD modernos", "ram": "8 GB ou mais", "gpu": "Drivers de vídeo atualizados", "storage": "Espaço livre para limpeza e otimização"},
     "delivery": "Serviço aplicado remotamente em até 5 minutos após a confirmação do pagamento, com suporte via Discord e WhatsApp.",
     "categories": ["otimizacao"],
     "badge": "FPS BOOST",
     "accessLabel": "Serviço remoto — aplicação em até 5 minutos",
     "isService": true
   }}'::jsonb,
  10
)
on conflict (slug) do nothing;