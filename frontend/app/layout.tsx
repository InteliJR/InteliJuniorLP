import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FallingPattern } from "@/components/falling-pattern";
import Header from "@/components/ui/header";
import AppLoaderShell from "@/components/AppLoaderShell";
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inteli Junior",
  description: "Criando soluções como futuramente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${jetBrainsMono.variable} antialiased`}>
        <AppLoaderShell>
          <>
            <FallingPattern className="fixed inset-0 -z-10" />
            <div className="pointer-events-none fixed inset-y-0 left-0 z-[-5] w-72 max-w-32 bg-linear-to-r from-black via-black/80 to-transparent opacity-95 blur-[80px]" />
            <div className="pointer-events-none fixed inset-y-0 right-0 z-[-5] w-72 max-w-32 bg-linear-to-l from-black via-black/80 to-transparent opacity-95 blur-[80px]" />
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[-5] h-48 bg-linear-to-b from-black via-black/40 to-transparent opacity-95 blur-[80px]" />
            <Header />
            <main className="relative z-10">
              {children}
            </main>
          </>
        </AppLoaderShell>
      </body>
    </html>
  );
}
