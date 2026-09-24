import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { Comandos } from "@/components/Comandos";
import { Idioma } from "@/components/Idioma";
import { Paleta } from "@/components/Paleta";
import { TemaToggle } from "@/components/TemaToggle";
import { perfil } from "@/lib/content";
import "./globals.css";

/*
 * Tres familias con tres trabajos: Geist para la interfaz, Geist Mono para
 * todo lo que sea dato (números, etiquetas, fechas, stack) y una serif solo
 * para los títulos con voz editorial. Ver la regla en globals.css.
 */
const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITIO = "https://alejodipietro.github.io";

const DESCRIPCION =
  "Analista de Sistemas. Diseñé y puse en producción el sistema de gestión que corre una empresa entera, y trabajo con la dirección sobre los datos que genera: resultados, rentabilidad y pérdidas.";

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
    "sistemas de gestión",
    "análisis de datos",
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
 * 1. Fija tema y paleta en el <html>: los guardados, o los de por defecto.
 *    El sitio arranca OSCURO aunque el sistema esté en claro: el diseño se
 *    pensó sobre grafito y el claro es una opción, no el punto de partida.
 *    Sin esto el sitio arranca con un color y salta al elegido cuando hidrata
 *    React —un flash molesto—. Que queden SIEMPRE escritos convierte a los
 *    atributos en la única fuente de verdad, y TemaToggle y Paleta solo los
 *    leen.
 *
 * 2. Marca que hay IntersectionObserver. Las animaciones de entrada se activan
 *    desde esa clase (ver .io en globals.css), asi que si el navegador no lo
 *    soporta —o si no hay JavaScript— el contenido se ve, en lugar de quedar
 *    invisible esperando un observer que nunca va a correr.
 */
const SCRIPT_INICIO = `try{var d=document.documentElement;d.dataset.tema=localStorage.getItem("tema")||"oscuro";d.dataset.paleta=localStorage.getItem("paleta")||"cobre";if(window.IntersectionObserver)d.classList.add("io")}catch(e){}`;

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
        className={`${sans.variable} ${mono.variable} ${display.variable} font-sans`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Ir al contenido
        </a>

        {/*
          El contenedor deja aire a la izquierda en escritorio para el
          espinazo de la home (ver .flujo en globals.css). Las páginas de
          lectura (notas y casos) se angostan solas con `max-w-2xl`: un
          párrafo de 1100px de ancho es ilegible.
        */}
        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 lg:px-10">
          <header className="sticky top-0 z-40 -mx-6 flex items-center justify-between px-6 py-4 backdrop-blur-md lg:-mx-10 lg:px-10 [background:linear-gradient(to_bottom,var(--background)_60%,transparent)]">
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-mono text-sm tracking-tight transition-colors hover:text-acento-texto"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-acento transition-transform duration-500 group-hover:scale-125"
              />
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
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
              <p>
                {perfil.ubicacion} ·{" "}
                <a
                  href={`mailto:${perfil.email}`}
                  className="link-sutil text-foreground"
                >
                  {perfil.email}
                </a>
              </p>
              <p className="font-mono text-xs">
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
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
