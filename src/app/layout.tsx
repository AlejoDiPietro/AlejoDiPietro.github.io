import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { perfil } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITIO = "https://alejodipietro.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: `${perfil.nombre} — ${perfil.titulo}`,
    template: `%s — ${perfil.nombre}`,
  },
  description: perfil.presentacion,
  openGraph: {
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: perfil.presentacion,
    url: SITIO,
    siteName: perfil.nombre,
    locale: "es_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Ir al contenido
        </a>

        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6">
          <header className="flex items-center justify-between py-8">
            <Link
              href="/"
              className="font-mono text-sm tracking-tight hover:text-muted"
            >
              alejo di pietro
            </Link>
            <nav className="flex gap-5 text-sm text-muted">
              <Link href="/#proyectos" className="hover:text-foreground">
                Proyectos
              </Link>
              <Link href="/#experiencia" className="hover:text-foreground">
                Experiencia
              </Link>
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </nav>
          </header>

          <main id="contenido" className="flex-1">
            {children}
          </main>

          <footer className="mt-24 border-t border-line py-8 text-sm text-muted">
            <p>
              {perfil.ubicacion} ·{" "}
              <a
                href={`mailto:${perfil.email}`}
                className="underline decoration-line underline-offset-4 hover:text-foreground"
              >
                {perfil.email}
              </a>
            </p>
            <p className="mt-2 font-mono text-xs">
              Hecho con Next.js y Tailwind.{" "}
              <a
                href="https://github.com/AlejoDiPietro/AlejoDiPietro.github.io"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:text-foreground"
              >
                Código del sitio
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
