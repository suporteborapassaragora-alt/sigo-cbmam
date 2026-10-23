import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGO-CBMAM | Comando Itacoatiara",
  description: "Sistema Integrado de Gestão Operacional e Administrativa - Corpo de Bombeiros Militar de Itacoatiara - AM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
