# Inteli Junior - Landing Page

Landing page institucional da Inteli Junior, focada em narrativa visual, alta performance e UX para conversao.

## Visao Geral

Esta aplicacao foi refatorada para consolidar:

- Arquitetura por secoes reutilizaveis
- Linguagem visual consistente (arquitetural + glass + grid lines)
- Animacoes de entrada e scroll com GSAP + Lenis
- Hero com cena 3D em `three`
- Navegacao desktop/mobile integrada

## Stack

- `next@16` (App Router)
- `react@19` + `typescript@5`
- `tailwindcss@4`
- `gsap` + `@studio-freight/lenis`
- `three`
- `lucide-react`

## Estrutura Atual

```text
frontend/
|- app/
|  |- globals.css
|  |- layout.tsx
|  `- page.tsx
|- components/
|  |- sections/
|  |  |- FirstSection.tsx
|  |  |- SecondSection.tsx
|  |  |- ThirdSection.tsx
|  |  |- FourthSection.tsx
|  |  |- IndustriesSection.tsx
|  |  |- FifthSection.tsx
|  |  `- PageShell.tsx
|  `- ui/
|     |- hero-header.tsx
|     |- hero-torus-scene.tsx
|     |- navigation-rail.tsx
|     `- viewport-marquee.tsx
|- lib/
|  `- utils.ts
`- public/images/
```

## Fluxo da Home

Arquivo: `app/page.tsx`

1. `PageShell`
2. `FirstSection` (Hero)
3. `SecondSection` (Quem somos + marquee de mercado)
4. `ThirdSection` (Portfolio com cards sticky)
5. `FourthSection` (Servicos)
6. `IndustriesSection` (Membros em marquee)
7. `FifthSection` (Contato / footer)

## Arquitetura de UI e Animacao

### `PageShell`

Arquivo: `components/sections/PageShell.tsx`

- Inicializa `Lenis` para smooth scroll
- Sincroniza `ScrollTrigger` com scroll customizado
- Intercepta anchors `#id` para scroll suave
- Executa intro do hero e reveal de textos com `data-split`
- Controla loader inicial e parallax do footer

### Hero 3D

Arquivos:

- `components/ui/hero-header.tsx`
- `components/ui/hero-torus-scene.tsx`

`hero-torus-scene.tsx` monta uma cena `three` client-side com:

- Estrutura de nos e arestas
- Rotacao guiada por tempo + ponteiro
- Pausa automatica fora de viewport via `IntersectionObserver`

### Navegacao

Arquivo: `components/ui/navigation-rail.tsx`

- Rail lateral no desktop
- Drawer no mobile com lock de scroll do `body`
- Acessibilidade com `aria-*`, `Escape` e `focus-visible`

## Design Tokens e Estilos

Arquivo: `app/globals.css`

- Fonte global: `JetBrains Mono`
- Cor primaria: `--brand-primary` (`#ff4d3a`)
- Superficies: `--surface-hero`, `--surface-dark-*`
- Tokens de glass, sombras e opacidades de grafos
- Utilitarios e animacoes globais (`marquee-seamless`, loader, reveal)

Regra do projeto: preferir variaveis CSS para cores/sombras, evitando hardcode em componentes.

## Como Rodar

Pre-requisitos:

- Node.js 18+
- npm

Instalacao e execucao:

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Boas Praticas de Manutencao

- Preservar ids de secao (`#hero`, `#quem-somos`, etc.) para nao quebrar navegacao.
- Aplicar `data-split` apenas em texto puro. Nao usar em containers com icones/SVG.
- Em elementos com icone + texto, aplicar `data-split` somente no `<span>` de texto.
- Manter consistencia de espacamento horizontal com `arch-shell` e rail-safe gutter no `lg+`.
- Priorizar imagens otimizadas em `public/images` para reduzir dependencia de fontes externas.

## Conteudo

Textos da landing devem seguir como referencia principal o arquivo `landing-copy.md` (quando aplicavel), com adaptacoes para legibilidade e responsividade.

## Status

Projeto em desenvolvimento continuo. Esta documentacao reflete a versao refatorada atual da landing.
