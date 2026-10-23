import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGO 17º GBM | Corpo de Bombeiros Militar de Itacoatiara",
  description: "Sistema Integrado de Gestão Operacional e Administrativa - CBMAM 17º GBM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-red-600 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
