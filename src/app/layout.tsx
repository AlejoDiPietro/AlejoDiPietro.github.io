import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Comandos } from "@/components/Comandos";
import { Idioma } from "@/components/Idioma";
import { Paleta } from "@/components/Paleta";
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

/** Solo para titulos. Ver la regla de uso en globals.css. */
const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITIO = "https://alejodipietro.github.io";

const DESCRIPCION =
  "Analista de Sistemas de 21 años. Diseñé y puse en producción el ERP que corre una empresa entera: pedidos, stock, finanzas y facturación electrónica ante ARCA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: `${perfil.nombre} — ${perfil.titulo}`,
    template: `%s — ${perfil.nombre}`,
  },
  description: DESCRIPCION,
  authors: [{ name: perfil.nombre, url: SITIO }],
  creator: perfil.nombre,
  keywords: [
    "desarrollador full-stack",
    "Next.js",
    "TypeScript",
    "ERP",
    "Buenos Aires",
    perfil.nombre,
  ],
  openGraph: {
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: DESCRIPCION,
    url: SITIO,
    siteName: perfil.nombre,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: DESCRIPCION,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: { "es-AR": "/", "en-US": "/en" },
  },
};

/**
 * Corre antes de pintar. Hace dos cosas:
 *
 * 1. Fija tema y paleta en el <html>: los guardados, o el del sistema y la de
 *    por defecto si no hay. Sin esto el sitio arranca con un color y salta al
 *    elegido cuando hidrata React — un flash molesto. Que queden SIEMPRE
 *    escritos convierte a los atributos en la única fuente de verdad, y
 *    TemaToggle y Paleta solo los leen.
 *
 * 2. Marca que hay IntersectionObserver. Las animaciones de entrada se activan
 *    desde esa clase (ver .io en globals.css), asi que si el navegador no lo
 *    soporta —o si no hay JavaScript— el contenido se ve, en lugar de quedar
 *    invisible esperando un observer que nunca va a correr.
 */
const SCRIPT_INICIO = `try{var d=document.documentElement;var t=localStorage.getItem("tema");d.dataset.tema=t||(matchMedia("(prefers-color-scheme: dark)").matches?"oscuro":"claro");d.dataset.paleta=localStorage.getItem("paleta")||"cobre";if(window.IntersectionObserver)d.classList.add("io")}catch(e){}`;

/**
 * Datos estructurados: es lo que lee Google para mostrar el panel de una
 * persona, y lo que cada vez mas leen los buscadores con IA.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nombre,
  url: SITIO,
  image: `${SITIO}${perfil.foto}`,
  jobTitle: perfil.titulo,
  email: `mailto:${perfil.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad del Salvador",
  },
  sameAs: [perfil.github, perfil.linkedin],
  knowsAbout: ["TypeScript", "Next.js", "PostgreSQL", "Java", "tRPC"],
};

/**
 * El header se quedó con lo mínimo. Todo lo demás —Sobre mí, GitHub, LinkedIn,
 * los CV, los colores— vive en la paleta de comandos: es más rápido de
 * alcanzar y no compite por espacio.
 */
const NAV = [
  { href: "/#proyectos", texto: "Proyectos" },
  { href: "/notas", texto: "Notas" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_INICIO }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} font-sans`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Ir al contenido
        </a>

        {/*
          El contenedor es ancho porque la home usa dos columnas en escritorio.
          Las páginas de lectura (notas y casos) se angostan solas con
          `max-w-2xl`: un párrafo de 1100px de ancho es ilegible.
        */}
        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6">
          <header className="sticky top-0 z-40 -mx-6 flex items-center justify-between border-b border-line/70 bg-background/85 px-6 py-4 backdrop-blur-md">
            <Link
              href="/"
              className="font-mono text-sm tracking-tight transition-colors hover:text-acento-texto"
            >
              alejo di pietro
            </Link>

            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-5 text-sm text-muted">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="hidden transition-colors hover:text-foreground sm:block"
                  >
                    {n.texto}
                  </Link>
                ))}
              </nav>

              {/* Controles del sitio, separados de la navegación de contenido. */}
              <div className="flex items-center gap-3 border-l border-line pl-4">
                <Idioma />
                <Paleta />
                <Comandos />
                <TemaToggle />
              </div>
            </div>
          </header>

          <main id="contenido" className="flex-1">
            {children}
          </main>

          <footer className="mt-28 border-t border-line py-10 text-sm text-muted">
            <p>
              {perfil.ubicacion} ·{" "}
              <a
                href={`mailto:${perfil.email}`}
                className="link-sutil text-foreground"
              >
                {perfil.email}
              </a>
            </p>
            <p className="mt-4 font-mono text-xs">
              Next.js y Tailwind, export estático ·{" "}
              <a
                href="https://github.com/AlejoDiPietro/AlejoDiPietro.github.io"
                target="_blank"
                rel="noreferrer"
                className="link-sutil"
              >
                código de este sitio
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
