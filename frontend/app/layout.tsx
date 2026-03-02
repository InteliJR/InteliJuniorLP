import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inteli Júnior — Engenharia para o Futuro",
  description:
    "Engenharia, design e produto na mesma mesa. Soluções com disciplina técnica, estética de ponta e velocidade de startup.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${jetBrainsMono.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
