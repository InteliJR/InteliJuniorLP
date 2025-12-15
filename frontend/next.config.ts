import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source maps desabilitados em produção para reduzir tamanho
  productionBrowserSourceMaps: false,

  output: "export",

  // Compressão agressiva
  compress: true,

  // Otimização de imagens para static export
  images: {
    // Para static export, precisamos desabilitar a otimização server-side
    // As imagens devem ser pré-otimizadas (use o script convert-images.js)
    unoptimized: true,
    // Domínios permitidos para imagens externas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
    // Formatos modernos (para referência, mas imagens devem ser pré-convertidas)
    formats: ['image/avif', 'image/webp'],
    // Tamanhos de dispositivos para responsividade
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Otimizações experimentais
  experimental: {
    // Otimiza o CSS removendo não utilizado
    optimizeCss: true,
  },

  // Turbopack config (vazio para silenciar aviso)
  turbopack: {},

  // Headers de cache para melhor performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
