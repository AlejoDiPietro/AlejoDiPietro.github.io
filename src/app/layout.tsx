import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { TemaToggle } from "@/components/TemaToggle";
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
  description: perfil.heroDetalle,
  openGraph: {
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: perfil.heroDetalle,
    url: SITIO,
    siteName: perfil.nombre,
    locale: "es_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * Corre antes de pintar: si hay un tema guardado lo aplica al <html>.
 * Sin esto, el sitio arranca con el tema del sistema y salta al elegido
 * cuando hidrata React — un flash blanco molesto en modo oscuro.
 */
const SCRIPT_TEMA = `try{var t=localStorage.getItem("tema");if(t)document.documentElement.dataset.tema=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Ir al contenido
        </a>

        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6">
          <header className="sticky top-0 z-40 -mx-6 flex items-center justify-between border-b border-line/60 bg-background/80 px-6 py-4 backdrop-blur">
            <Link href="/" className="group flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-gradient-to-br from-acento to-acento-2 transition-transform group-hover:scale-125" />
              <span className="font-mono text-sm">alejo di pietro</span>
            </Link>

            <nav className="flex items-center gap-4 text-sm text-muted">
              <Link
                href="/#proyectos"
                className="hidden transition-colors hover:text-foreground sm:block"
              >
                Proyectos
              </Link>
              <Link
                href="/#sobre-mi"
                className="hidden transition-colors hover:text-foreground sm:block"
              >
                Sobre mí
              </Link>
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <TemaToggle />
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
                className="underline decoration-line underline-offset-4 transition-colors hover:text-acento-texto"
              >
                {perfil.email}
              </a>
            </p>
            <p className="mt-2 font-mono text-xs">
              Hecho con Next.js y Tailwind ·{" "}
              <a
                href="https://github.com/AlejoDiPietro/AlejoDiPietro.github.io"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 transition-colors hover:text-acento-texto"
              >
                código del sitio
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
