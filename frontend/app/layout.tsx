import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import AppLoaderShell from "@/components/AppLoaderShell";
import Header from "@/components/ui/Header";
import SmoothScrolling from "@/components/SmoothScrolling";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inteli Junior",
  description: "Criando soluções como futuramente",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${jetBrainsMono.variable} antialiased`}>
        <SmoothScrolling>
          <AppLoaderShell>
            <>
              <Header />
              <main className="relative">
                {children}
              </main>
            </>
          </AppLoaderShell>
        </SmoothScrolling>
      </body>
    </html>
  );
}
