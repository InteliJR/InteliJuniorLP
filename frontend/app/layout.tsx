
import "./globals.css";
import type { Metadata } from "next";
import AppLoaderShell from "@/components/AppLoaderShell";
import SmoothScrolling from "@/components/SmoothScrolling";
import LazyMotionProvider from "@/components/LazyMotionProvider";

const TITLE =
  "Inteli Junior | Desenvolvemos automações, sites e consultoria em dados";
const DESCRIPTION =
  "A Inteli Junior desenvolve sites, automações e soluções em dados para empresas que querem crescer com tecnologia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://intelijunior.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "tecnologia",
    "automação",
    "inteligência artificial",
    "IA",
    "desenvolvimento web",
    "dashboard",
    "consultoria em dados",
    "análise de dados",
    "landing page",
    "empresa júnior",
    "Inteli Junior",
  ],
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://intelijunior.com",
    siteName: "Inteli Junior",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 900,
        alt: "Time da Inteli Junior",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inteli Junior",
  url: "https://intelijunior.com",
  logo: "https://intelijunior.com/images/logo.svg",
  description: DESCRIPTION,
  sameAs: [
    "https://www.instagram.com/inteli.jr/",
    "https://www.linkedin.com/company/inteli-júnior/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LazyMotionProvider>
          <SmoothScrolling>
            <AppLoaderShell>
              <main className="relative">
                {children}
              </main>
            </AppLoaderShell>
          </SmoothScrolling>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
