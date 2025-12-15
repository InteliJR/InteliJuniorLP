# Inteli Junior - Landing Page

Landing page institucional da Inteli Junior, empresa junior do Instituto de Tecnologia e Lideranca (Inteli).

> **Status do projeto:** Em desenvolvimento

---

## Sumario

1. [Visao Geral](#visao-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalacao e Execucao](#instalacao-e-execucao)
5. [Arquitetura da Aplicacao](#arquitetura-da-aplicacao)
6. [Paginas](#paginas)
7. [Componentes](#componentes)
8. [Estilos e Design System](#estilos-e-design-system)
9. [Animacoes](#animacoes)
10. [Guia de Manutencao](#guia-de-manutencao)

---

## Visao Geral

Este projeto e uma landing page moderna desenvolvida para apresentar a Inteli Junior. O design utiliza efeitos de glass-morphism (vidro fosco), animacoes fluidas e um visual premium com foco em tecnologia e inovacao.

### Caracteristicas principais

- Design glass-morphism com efeitos de transparencia e blur
- Cursor personalizado em formato de quadrado
- Animacoes de texto com efeito "scramble" (embaralhamento)
- Scroll suave com biblioteca Lenis
- Parallax e zoom em imagens
- Carrossel infinito de logos de empresas parceiras
- Timeline interativa

---

## Tecnologias Utilizadas

### Framework e Linguagem

| Tecnologia | Versao | Descricao |
|------------|--------|-----------|
| Next.js | 16.0.0 | Framework React para producao |
| React | 19.2.0 | Biblioteca para construcao de interfaces |
| TypeScript | 5.x | Superset JavaScript com tipagem estatica |

### Estilizacao

| Tecnologia | Versao | Descricao |
|------------|--------|-----------|
| Tailwind CSS | 4.x | Framework CSS utilitario |
| tw-animate-css | 1.4.0 | Animacoes pre-definidas para Tailwind |

### Animacoes e Interatividade

| Biblioteca | Versao | Uso no projeto |
|------------|--------|----------------|
| Framer Motion | 12.x | Animacoes declarativas e transicoes |
| GSAP | 3.13.0 | Animacoes avancadas e timeline |
| Lenis | 1.1.18 | Scroll suave e customizado |

### 3D e Graficos

| Biblioteca | Versao | Uso no projeto |
|------------|--------|----------------|
| Three.js | 0.181.2 | Renderizacao 3D |
| React Three Fiber | 9.4.0 | Three.js para React |
| React Three Drei | 10.7.7 | Helpers para React Three Fiber |

### Componentes UI

| Biblioteca | Versao | Uso no projeto |
|------------|--------|----------------|
| Radix UI | varios | Componentes acessiveis (checkbox, label, select, switch) |
| Lucide React | 0.548.0 | Biblioteca de icones |
| class-variance-authority | 0.7.1 | Variantes de componentes |

### Carrossel

| Biblioteca | Versao | Uso no projeto |
|------------|--------|----------------|
| Embla Carousel | 8.6.0 | Carrossel customizavel |

---

## Estrutura do Projeto

```
frontend/
├── app/                        # Diretorio principal do Next.js (App Router)
│   ├── globals.css             # Estilos globais e variaveis CSS
│   ├── layout.tsx              # Layout raiz da aplicacao
│   └── page.tsx                # Pagina inicial (home)
│
├── components/                 # Componentes reutilizaveis
│   ├── sections/               # Secoes da landing page
│   │   ├── FirstSection.tsx    # Hero (AuroraFlow desktop + fallback mobile)
│   │   ├── SecondSection.tsx   # Quem somos + ZoomParallax + carrossel de empresas
│   │   ├── ThirdSection.tsx    # Timeline/Trajetoria
│   │   ├── FourthSection.tsx   # Servicos (cards 3D)
│   │   ├── FifthSection.tsx    # Cases (HeroParallax)
│   │   └── SixthSection.tsx    # Depoimentos/Membros (console/carrossel)
│   │
│   ├── ui/                     # Componentes de interface
│   │   ├── Button.tsx          # Botao customizado (CVA)
│   │   ├── Header.tsx          # Cabecalho/Navegacao com scroll inteligente
│   │   ├── Timeline.tsx        # Componente de timeline
│   │   ├── HeroParallax.tsx    # Parallax de produtos/cases
│   │   ├── ImpactCard.tsx      # Card de metricas
│   │   ├── TechCard.tsx        # Card de tecnologia/stack
│   │   └── textScramble/       # Efeito de texto embaralhado
│   │       ├── index.ts
│   │       ├── TextScramble.tsx
│   │       └── TextScramble.module.css
│   │
│   ├── loading/                # Tela de carregamento
│   │   ├── Loading.tsx         # Componente de loading (GSAP)
│   │   └── Loading.css         # Estilos do loading
│   │
│   ├── AppLoaderShell.tsx      # Gerenciador de estado de carregamento
│   ├── AuroraFlow.tsx          # Background com efeito aurora (3D)
│   ├── card-flip.tsx           # Card com efeito de flip (Kokonut UI, agora na raiz de components)
│   ├── ClientCursor.tsx        # Wrapper desktop-only para Cursor
│   ├── CompaniesCarousel.tsx   # Carrossel de logos
│   ├── ContactModal.tsx        # Modal reutilizavel de contato
│   ├── Cursor.tsx              # Cursor personalizado
│   ├── GlassBackground.tsx     # Wrapper com efeito glass
│   ├── ImageStructure3D.jsx    # Estrutura 3D de imagem
│   ├── LazyMotionProvider.tsx  # Provider do Framer Motion (domAnimation)
│   ├── ProfileCardTestimonialCarousel.tsx # Carrossel de depoimentos (não usado na home)
│   ├── SmoothScrolling.tsx     # Provider de scroll suave (Lenis)
│   └── ZoomParallax.tsx        # Efeito de zoom com parallax
│
├── hooks/                      # Hooks compartilhados
│   └── useIsMobile.ts          # Detecta mobile para gating de recursos
│
├── lib/                        # Utilitarios
│   └── utils.ts                # Funcao cn() para classes condicionais
│
├── public/                     # Arquivos estaticos
│   └── images/                 # Imagens do projeto
│
├── scripts/                    # Scripts auxiliares
│   └── convert-images.js       # Conversão/otimização de imagens
│
├── components.json             # Configuracao do shadcn/ui
├── eslint.config.mjs           # Regras de lint
├── next.config.ts              # Configuracao do Next.js
├── package.json                # Dependencias e scripts
├── postcss.config.mjs          # Configuracao do PostCSS
├── tsconfig.json               # Configuracao do TypeScript
└── next-env.d.ts               # Tipagem Next.js
```

---

## Instalacao e Execucao

### Pre-requisitos

- Node.js 18.x ou superior
- npm, yarn ou pnpm

### Passos para instalacao

1. Clone o repositorio ou navegue ate a pasta do projeto:

```bash
cd frontend
```

2. Instale as dependencias:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:3000
```

### Scripts disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de producao |
| `npm run start` | Inicia o servidor de producao |
| `npm run lint` | Executa o linter (ESLint) |

---

## Arquitetura da Aplicacao

### Fluxo de Renderizacao

```
layout.tsx (Layout Raiz)
    |
    ├── LazyMotionProvider (Framer Motion domAnimation)
    |
    ├── ClientCursor (desktop-only) -> Cursor (BlobCursor)
    |
    └── SmoothScrolling (Provider Lenis)
        |
        └── AppLoaderShell (Gate de loading)
            |
            ├── Loading (Splash GSAP)
            |
            └── [Conteudo da pagina]
                |
                ├── Header (Navegacao fixa)
                |
                └── page.tsx
                    |
                    ├── FirstSection (Hero)
                    ├── SecondSection (Quem Somos + parceiros)
                    ├── ThirdSection (Timeline)
                    ├── FourthSection (Servicos)
                    ├── FifthSection (Cases)
                    ├── SixthSection (Depoimentos/Membros)
                    └── Footer (Contato/Parceiros)
```

### Contextos e Estados Globais

#### AppLoaderContext

Localizado em `AppLoaderShell.tsx`, fornece:

- `isDocumentReady`: Indica se o documento foi totalmente carregado
- `isAnimationComplete`: Indica se a animacao de loading terminou
- `isInitialLoading`: Combinacao dos dois anteriores (true enquanto carrega)
- `isContentVisible`: Inverso de isInitialLoading

**Como usar:**

```tsx
import { useAppLoader } from '@/components/AppLoaderShell';

function MeuComponente() {
    const { isInitialLoading } = useAppLoader();
    
    if (isInitialLoading) return null;
    
    return <div>Conteudo visivel</div>;
}
```

---

## Paginas

### page.tsx (Home)

Localizado em `app/page.tsx`, e a pagina principal da landing page.

**Estrutura:**

```tsx
<main>
    <FirstSection />   // Hero com CTA
    <SecondSection />  // Quem somos + Carrossel de empresas
    <ThirdSection />   // Timeline da trajetoria
    <FourthSection />  // Servicos oferecidos
    <FifthSection />   // Cases (HeroParallax)
    <SixthSection />   // Depoimentos/Membros
    <Footer />         // Contato + parceiros
</main>
```

### layout.tsx (Layout Raiz)

Localizado em `app/layout.tsx`, envolve todas as paginas.

**Responsabilidades:**

1. Define a fonte global (JetBrains Mono)
2. Renderiza o cursor personalizado
3. Aplica o scroll suave (Lenis)
4. Gerencia o estado de loading
5. Renderiza o Header

**Configuracoes importantes:**

- `cursor-none` no body: Esconde o cursor padrao
- `z-9999` no BlobCursor: Garante que o cursor fique acima de tudo

---

## Componentes

### Secoes da Landing Page

#### FirstSection.tsx

**Localizacao:** `components/sections/FirstSection.tsx`

**Descricao:** Hero section, primeira coisa que o usuario ve ao acessar a pagina.

**Funcionalidades:**

- Titulo com efeito TextScramble
- Botoes de CTA (Call to Action) com animacao de hover
- Animacao de entrada baseada em IntersectionObserver

**Dependencias:**

- TextScramble
- Framer Motion
- Lucide icons (ArrowRight)

---

#### SecondSection.tsx

**Localizacao:** `components/sections/SecondSection.tsx`

**Descricao:** Secao "Quem Somos" com bento grid de cards e carrossel de empresas parceiras.

**Funcionalidades:**

- Titulo com conquista dos 3 clusters
- Icone de trofeu com efeito de glow
- ZoomParallax com timeline visual
- Grid de cards com informacoes da empresa
- Carrossel infinito de logos de empresas

**Estrutura do Grid (Bento Grid):**

```
┌─────────────────┬─────────────────┬─────────────────┐
│                 │                 │    Card 5       │
│    Card 1       │                 │  (Metodologia)  │
│  (Inteli Jr)    │    Card 3       ├─────────────────┤
│                 │  (Excelencia)   │                 │
├─────────────────┤                 │    Card 6       │
│    Card 2       │                 │     (CTA)       │
│ (Vivencia Agil) │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Carrossel de Empresas:**

O carrossel usa a animacao CSS `animate-marquee` definida em `globals.css`. A velocidade atual e de 45 segundos para uma volta completa.

**Para alterar a velocidade:** Edite a variavel `--animate-marquee` em `globals.css`:

```css
--animate-marquee: marquee 45s linear infinite;
```

- Valor maior = mais lento
- Valor menor = mais rapido

**Dependencias:**

- ZoomParallax
- TextScramble
- Lucide icons (Cpu, Users, ArrowUpRight, Trophy, Award, ArrowRight)
- Lenis

---

#### FifthSection.tsx

**Localizacao:** `components/sections/FifthSection.tsx`

**Descricao:** Secao de cases com parallax horizontal (HeroParallax) em tres linhas.

**Dependencias:**

- HeroParallax
- TextScramble (dentro do HeroParallax)
- Framer Motion

---

#### SixthSection.tsx

**Localizacao:** `components/sections/SixthSection.tsx`

**Descricao:** Depoimentos/Membros em layout de console duplo com carrossel automatico, pausa por interacao/fora de viewport e drawer lateral.

**Dependencias:**

- Framer Motion
- TextScramble
- Lucide icons (Pause, Play, List, ChevronLeft, ChevronRight, Terminal, Search, X)

---

#### Footer.tsx

**Localizacao:** `components/sections/Footer.tsx`

**Descricao:** Rodape com abas (Formulario vs. Agentes), CTA, links sociais e parceiros.

**Dependencias:**

- ContactModal
- TextScramble
- Framer Motion
- Lucide icons

---

#### ThirdSection.tsx

**Localizacao:** `components/sections/ThirdSection.tsx`

**Descricao:** Timeline interativa mostrando a trajetoria da Inteli Junior.

**Funcionalidades:**

- Timeline vertical com marcadores de ano
- Cards com conquistas de cada ano (2023, 2024, 2025)
- Animacao de progresso baseada no scroll

**Dependencias:**

- Timeline (componente ui)
- TextScramble

---

#### FourthSection.tsx

**Localizacao:** `components/sections/FourthSection.tsx`

**Descricao:** Apresentacao dos servicos oferecidos pela Inteli Junior.

**Funcionalidades:**

- Cards de servicos com descricoes
- Efeitos de hover
- Links para mais informacoes

**Dependencias:**

- TextScramble
- Lucide icons

---

### Componentes de UI

#### Header.tsx

**Localizacao:** `components/ui/Header.tsx`

**Descricao:** Cabecalho fixo com navegacao.

**Funcionalidades:**

- Menu de navegacao com links para secoes
- Efeito TextScramble nos itens do menu ao hover
- Auto-hide: esconde ao rolar para baixo, aparece ao rolar para cima (escuta scroll/Lenis)

**Comportamento de scroll:**

- Rolar para baixo: Header desaparece (translateY negativo)
- Rolar para cima: Header reaparece
- Parar de rolar: Header reaparece apos timeout

**Itens de navegacao:**

```tsx
const NAV_ITEMS = [
    { label: "QUEM SOMOS", href: "#quem-somos" },
    { label: "TRAJETÓRIA", href: "#trajetoria" },
    { label: "SERVIÇOS", href: "#servicos" },
    { label: "PORTFÓLIO", href: "#cases" },
    { label: "MEMBROS", href: "#depoimentos" },
    { label: "CONTATO", href: "#contato" },
];
```

---

#### TextScramble

**Localizacao:** `components/ui/textScramble/`

**Descricao:** Componente que cria efeito de texto sendo "embaralhado" antes de revelar o texto final.

**Props:**

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `children` | string | - | Texto a ser exibido |
| `duration` | number | 0.8 | Duracao da animacao em segundos |
| `speed` | number | 0.04 | Velocidade de troca de caracteres |
| `characterSet` | string | A-Za-z0-9 | Caracteres usados no scramble |
| `as` | ElementType | 'p' | Elemento HTML a ser renderizado |
| `className` | string | - | Classes CSS |
| `trigger` | boolean | true | Se true, inicia a animacao |
| `playId` | number | 0 | Incrementar para repetir a animacao |
| `onScrambleComplete` | function | - | Callback ao finalizar |

**Exemplo de uso:**

```tsx
<TextScramble
    as="h1"
    className="text-4xl"
    duration={1}
    speed={0.03}
    trigger={true}
>
    {"Texto que sera animado"}
</TextScramble>
```

**Para repetir a animacao (ex: no hover):**

```tsx
const [playId, setPlayId] = useState(0);

const handleHover = () => {
    setPlayId(prev => prev + 1);
};

<TextScramble playId={playId} trigger={true}>
    {"Texto"}
</TextScramble>
```

---

#### Timeline.tsx

**Localizacao:** `components/ui/Timeline.tsx`

**Descricao:** Timeline vertical animada que reage ao scroll.

**Props:**

```tsx
interface TimelineEntry {
    title: string;           // Titulo (ex: "2023")
    content: React.ReactNode; // Conteudo JSX
}

{ data: TimelineEntry[] }
```

**Exemplo de uso:**

```tsx
const data = [
    {
        title: "2023",
        content: <div>Conteudo de 2023</div>
    },
    {
        title: "2024",
        content: <div>Conteudo de 2024</div>
    }
];

<Timeline data={data} />
```

---

#### Button.tsx

**Localizacao:** `components/ui/Button.tsx`

**Descricao:** Botao customizado usando class-variance-authority para variantes.

**Variantes disponiveis:**

- `default`: Fundo primario
- `destructive`: Fundo vermelho
- `outline`: Apenas borda
- `secondary`: Fundo secundario
- `ghost`: Transparente, cor no hover
- `link`: Estilo de link

**Tamanhos:**

- `default`: Altura 40px
- `sm`: Altura 36px
- `lg`: Altura 44px
- `icon`: 40x40px

---

#### GlassBackground.tsx

**Localizacao:** `components/GlassBackground.tsx`

**Descricao:** Wrapper que aplica efeito glass-morphism em seu conteudo.

**Props:**

| Prop | Tipo | Descricao |
|------|------|-----------|
| `children` | ReactNode | Conteudo interno |
| `cn` | string | Classes CSS adicionais |

**Efeitos aplicados:**

- Background semi-transparente (`bg-white/5`)
- Borda sutil (`border-white/10`)
- Blur no backdrop (`backdrop-blur-[1.5px]`)
- Sombra interna glass (`--shadow-inner-glass`)

---

#### HeroParallax.tsx

**Localizacao:** `components/ui/HeroParallax.tsx`

**Descricao:** Parallax horizontal em tres linhas para cases, com modal de detalhe via portal.

**Dependencias:**

- Framer Motion
- TextScramble

---

#### CompaniesCarousel.tsx

**Localizacao:** `components/CompaniesCarousel.tsx`

**Descricao:** Carrossel de logos com autoplay condicionado a visibilidade (IntersectionObserver).

---

#### ContactModal.tsx

**Localizacao:** `components/ContactModal.tsx`

**Descricao:** Modal reutilizavel de contato com validacao (email ou telefone) e animacoes Framer Motion.

---

#### SmoothScrolling.tsx

**Localizacao:** `components/SmoothScrolling.tsx`

**Descricao:** Provider Lenis habilitado apenas em desktop; mobile preserva scroll nativo.

---

#### AppLoaderShell.tsx

**Localizacao:** `components/AppLoaderShell.tsx`

**Descricao:** Gate de carregamento que exibe `Loading` ate DOM completo + fim da animacao; expõe contexto com estado do loader.

---

#### LazyMotionProvider.tsx

**Localizacao:** `components/LazyMotionProvider.tsx`

**Descricao:** Wrapper do Framer Motion usando `domAnimation` para reduzir bundle.

---

#### ClientCursor.tsx

**Localizacao:** `components/ClientCursor.tsx`

**Descricao:** Habilita Cursor apenas em desktop via `useIsMobile`, carregando dinamicamente para proteger o LCP.

---

#### ImpactCard.tsx

**Localizacao:** `components/ui/ImpactCard.tsx`

**Descricao:** Card de metricas/impacto com animacao de entrada (whileInView) e destaques em hover.

---

#### TechCard.tsx

**Localizacao:** `components/ui/TechCard.tsx`

**Descricao:** Card de tecnologias com borda SVG e estado hover, usado para stacks e destaques tecnicos.

---

#### ProfileCardTestimonialCarousel.tsx

**Localizacao:** `components/ProfileCardTestimonialCarousel.tsx`

**Descricao:** Carrossel de depoimentos em cards de perfil (fora da home atual, reutilizável para outras páginas).

---

### Componentes de Animacao

#### Cursor.tsx (BlobCursor)

**Localizacao:** `components/Cursor.tsx`

**Descricao:** Cursor personalizado que segue o mouse com efeito de trail.

**Props principais:**

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `blobType` | 'circle' ou 'square' | 'circle' | Formato do cursor |
| `fillColor` | string | '#5227FF' | Cor do cursor |
| `trailCount` | number | 3 | Quantidade de elementos no trail |
| `sizes` | number[] | [60, 125, 75] | Tamanhos de cada blob |
| `fastDuration` | number | 0.1 | Velocidade do blob principal |
| `slowDuration` | number | 0.5 | Velocidade dos blobs de trail |

**Configuracao atual no projeto:**

```tsx
<BlobCursor
    blobType="square"
    fillColor="#ff2d20"
    trailCount={3}
    sizes={[18, 34, 20]}
    innerSizes={[6, 10, 6]}
    innerColor="rgba(255, 134, 85, 0.7)"
    opacities={[0.98, 0.85, 0.7]}
    fastDuration={0.02}
    slowDuration={0.7}
/>
```

---

#### ZoomParallax.tsx

**Localizacao:** `components/ZoomParallax.tsx`

**Descricao:** Efeito de parallax com zoom em imagens baseado no scroll.

**Props:**

```tsx
interface Image {
    src: string;
    alt?: string;
    date?: string;
    description?: string;
}

{ images: Image[] }  // Maximo 7 imagens
```

**Como funciona:**

- Cada imagem tem uma escala diferente baseada no scroll
- Conforme o usuario rola, as imagens "zoomam" em velocidades diferentes
- Cria efeito de profundidade e dinamismo

---

#### SmoothScrolling.tsx

**Localizacao:** `components/SmoothScrolling.tsx`

**Descricao:** Provider que aplica scroll suave em toda a aplicacao usando Lenis.

**Configuracao:**

```tsx
<ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
    {children}
</ReactLenis>
```

- `lerp`: Linear interpolation (0.1 = mais suave)
- `duration`: Duracao da interpolacao

---

#### AppLoaderShell.tsx

**Localizacao:** `components/AppLoaderShell.tsx`

**Descricao:** Gerencia o estado de carregamento inicial da aplicacao.

**Funcionalidades:**

- Exibe componente Loading ate que:
  1. O documento esteja completamente carregado
  2. A animacao de loading tenha terminado
- Fornece contexto para outros componentes saberem o estado de loading

---

#### Loading (Loading.tsx + Loading.css)

**Localizacao:** `components/loading/`

**Descricao:** Tela de carregamento exibida ao iniciar a aplicacao.

**Funcionalidades:**

- Logo 3D animado (hexagono com edges brilhantes)
- Texto simulando terminal com linhas sendo "digitadas"
- Duracao total: aproximadamente 4.2 segundos

---

### Componentes 3D

#### AuroraFlow.tsx

**Localizacao:** `components/AuroraFlow.tsx`

**Descricao:** Background 3D com efeito de aurora boreal usando shaders.

**Dependencias:** Three.js, React Three Fiber

**Nota:** Componente de alto custo de processamento. Usar com moderacao.

---

#### ImageStructure3D.jsx

**Localizacao:** `components/ImageStructure3D.jsx`

**Descricao:** Estrutura 3D geometrica que pode ser rotacionada pelo usuario.

**Funcionalidades:**

- Rotacao automatica quando idle
- Rotacao manual com drag
- Renderizacao otimizada com IntersectionObserver

---

## Estilos e Design System

### Variaveis CSS (globals.css)

As variaveis CSS estao definidas no bloco `@theme inline` do `globals.css`.

#### Cores principais

| Variavel | Valor | Uso |
|----------|-------|-----|
| `--primary` | #FF4D3A | Cor principal (vermelho Inteli) |
| `--primary-foreground` | #FFFFFF | Texto sobre primary |
| `--background` | #09090b | Fundo da pagina |
| `--foreground` | #fafafa | Texto principal |
| `--muted` | #27272a | Elementos secundarios |
| `--muted-foreground` | #a1a1aa | Texto secundario |

#### Sombras internas (Glass Effect)

| Variavel | Uso |
|----------|-----|
| `--shadow-inner-glass` | Cards com efeito glass sutil |
| `--shadow-inner-primary` | Cards com destaque em vermelho |
| `--shadow-inner-glass-premium` | Efeito glass mais elaborado |
| `--shadow-inner-primary-premium` | Destaque vermelho intenso |
| `--shadow-inner-button` | Botoes CTA |
| `--shadow-inner-button-hover` | Botoes CTA no hover |

**Exemplo de uso:**

```tsx
<div className="shadow-(--shadow-inner-glass)">
    Conteudo com efeito glass
</div>
```

#### Animacoes

| Variavel | Valor | Uso |
|----------|-------|-----|
| `--animate-marquee` | marquee 45s linear infinite | Carrossel de logos |

### Classes utilitarias importantes

#### Glass-morphism

```css
bg-white/5                    /* Background transparente */
backdrop-blur-[1.5px]         /* Blur no fundo */
border border-white/10        /* Borda sutil */
shadow-(--shadow-inner-glass)  /* Brilho interno */
```

#### Hover em cards

```css
transition-all duration-300
hover:border-primary/30
hover:bg-white/10
group-hover:scale-105
```

---

## Animacoes

### Tipos de animacao no projeto

#### 1. CSS Puro (Tailwind)

- Transicoes de hover
- Animacao do carrossel (marquee)

#### 2. Framer Motion

- Animacoes de entrada/saida
- Animacoes baseadas em scroll
- Transicoes de estado

#### 3. GSAP

- Header auto-hide
- Animacoes complexas de timeline
- Cursor blob

### Padrao para animacoes de entrada

```tsx
import { motion } from 'framer-motion';

<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
>
    Conteudo
</motion.div>
```

### Padrao para animacoes baseadas em scroll

```tsx
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
});

const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
```

---

## Guia de Manutencao

### Adicionando uma nova secao

1. Crie o arquivo em `components/sections/NovaSectionSection.tsx`
2. Importe no `app/page.tsx`
3. Adicione na ordem desejada dentro do `<main>`

**Template basico:**

```tsx
'use client';
import React from 'react';
import { TextScramble } from '../ui/textScramble';

export default function NovaSection() {
    return (
        <section className="relative w-full py-32 overflow-hidden">
            <div className="mx-auto px-24">
                {/* Conteudo */}
            </div>
        </section>
    );
}
```

### Adicionando empresa no carrossel

Edite o array `companies` em `SecondSection.tsx`:

```tsx
const companies = [
    // ... empresas existentes
    { 
        name: "Nova Empresa", 
        logo: "URL_DO_LOGO", 
        className: "h-10"  // Ajuste a altura conforme necessario
    },
];
```

### Alterando cores do tema

Edite as variaveis no arquivo `globals.css`, na secao `:root`:

```css
:root {
    --primary: #FF4D3A;  /* Altere aqui */
}
```

### Alterando a fonte

1. Importe a nova fonte em `layout.tsx`:

```tsx
import { NovaFonte } from 'next/font/google';

const novaFonte = NovaFonte({
    variable: "--font-nova-fonte",
    subsets: ["latin"],
});
```

2. Atualize a variavel em `globals.css`:

```css
--font-sans: var(--font-nova-fonte);
--font-mono: var(--font-nova-fonte);
```

### Adicionando item no menu

Edite o array `NAV_ITEMS` em `Header.tsx`:

```tsx
const NAV_ITEMS = [
    // ... itens existentes
    { label: "NOVO ITEM", href: "#nova-secao" },
];
```

### Debug de animacoes

Para desabilitar temporariamente o scroll suave:

```tsx
// Em SmoothScrolling.tsx
<ReactLenis root options={{ lerp: 1, duration: 0 }}>
```

Para desabilitar o cursor personalizado:

```tsx
// Em layout.tsx, remova ou comente:
// <BlobCursor ... />

// E remova cursor-none do body:
<body className={`${jetBrainsMono.variable} antialiased`}>
```

---

## Problemas Conhecidos e Solucoes

### Backdrop-blur nao funciona

**Causa:** Z-index conflitante.

**Solucao:** Certifique-se de que o elemento pai nao tenha `z-index` maior que o elemento com blur.

### Cursor nao aparece

**Causa:** Elemento com z-index maior sobrepondo.

**Solucao:** O cursor deve ter `z-index: 9999` ou superior.

### Animacao de texto nao dispara

**Causa:** `trigger` esta `false` ou `playId` nao foi incrementado.

**Solucao:** Use IntersectionObserver para setar `trigger={true}` quando visivel:

```tsx
const [hasTriggered, setHasTriggered] = useState(false);

useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setHasTriggered(true);
            }
        },
        { threshold: 0.3 }
    );
    
    observer.observe(elementRef.current);
    return () => observer.disconnect();
}, []);
```

---
