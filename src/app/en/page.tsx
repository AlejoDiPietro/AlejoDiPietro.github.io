import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavLateral } from "@/components/NavLateral";
import { Revelar } from "@/components/Revelar";
import { perfil } from "@/lib/content";

export const metadata: Metadata = {
  // `absolute` evita que el template del layout le pegue el nombre de nuevo
  // y quede "Alejo Di Pietro — Full-Stack Developer — Alejo Di Pietro".
  title: { absolute: "Alejo Di Pietro — Full-Stack Developer" },
  description:
    "21-year-old Systems Analyst from Buenos Aires. I designed and shipped the ERP that runs an entire company: orders, inventory, finance and electronic invoicing with the Argentine tax authority.",
  openGraph: { locale: "en_US" },
  alternates: { canonical: "/en", languages: { "es-AR": "/", "en-US": "/en" } },
};

const numbers = [
  { valor: "3 months", etiqueta: "from nothing to production" },
  { valor: "~10", etiqueta: "people use it every day" },
  { valor: "4", etiqueta: "departments on one shared model" },
  { valor: "0", etiqueta: "invoices keyed in twice since then" },
];

const work = [
  {
    nombre: "SGC — the ERP that runs a company",
    periodo: "2026",
    resumen:
      "Six modules over a 121-entity relational model: operations, sales and finance in one place, with electronic invoicing against the Argentine tax authority and a 114-permission access control layer. I designed it, built it and shipped it in three months, on my own.",
    stack: "Next.js · TypeScript · tRPC · Prisma · PostgreSQL",
    href: "/proyectos/sgc",
  },
  {
    nombre: "Migrating a public site to Next.js",
    periodo: "2026",
    resumen:
      "Ported a company's public website from PHP to Next.js App Router, starting with the product catalog. The hard part was never the framework — it was migrating without breaking URLs that were already indexed.",
    stack: "Next.js · TypeScript · Vercel",
    href: "/proyectos/web-publica",
  },
  {
    nombre: "Project management — REST over SOAP",
    periodo: "2025",
    resumen:
      "A REST API consuming a SOAP service over a JPA/Hibernate backend with HQL queries. Multi-module Maven, with the layers genuinely separated: the REST module has no dependency on the DAO, it only speaks WSDL.",
    stack: "Java · Hibernate · JAX-WS · Jersey · MySQL",
    href: "https://github.com/AlejoDiPietro/gestion-proyectos",
  },
];

/** Agrupado por empresa: la progresión es el argumento, no cada puesto suelto. */
const experience = {
  empresa: "Cambren SRL",
  periodo: "2024 — Present",
  puestos: [
    {
      puesto: "Full-Stack Developer",
      periodo: "Apr 2026 — Present",
      descripcion:
        "Designed and built end-to-end the ERP that runs the company's operations, integrated electronic invoicing with the tax authority, and added an internal AI assistant over the system's data.",
    },
    {
      puesto: "Finance & Treasury Analyst",
      periodo: "Jan — Apr 2026",
      descripcion:
        "Payroll for 30+ employees, supplier payments, invoice reconciliation and daily cash. This is where I learned the business I later modelled in software.",
    },
    {
      puesto: "E-commerce & Customer Support Lead",
      periodo: "May 2025 — Jan 2026",
      descripcion:
        "Launched the online store: catalog, payment methods, shipping and after-sales. Top revenue generator on the commercial team.",
    },
    {
      puesto: "Chatbot Developer",
      periodo: "Jul — Nov 2024",
      descripcion:
        "My first job writing code that shipped to production, at 19.",
    },
  ],
};

/** Mismas secciones que la home, con las etiquetas en inglés. */
const SECCIONES = [
  { id: "work", texto: "Work" },
  { id: "experience", texto: "Experience" },
  { id: "education", texto: "Education" },
];

export default function En() {
  return (
    <div className="lg:flex lg:gap-16 xl:gap-24">
      <header className="py-14 sm:py-20 lg:sticky lg:top-16 lg:max-h-[calc(100dvh-5rem)] lg:w-[22rem] lg:shrink-0 lg:overflow-y-auto lg:py-16 lg:sin-barra">
        <Revelar>
          <Image
            src={perfil.foto}
            alt={`Photo of ${perfil.nombre}`}
            width={320}
            height={320}
            priority
            className="size-32 rounded-full object-cover ring-1 ring-line sm:size-40"
          />

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-acento-texto">
            Alejo Di Pietro
          </p>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Buenos Aires, Argentina
          </p>
          <h1 className="display mt-5 text-[2.75rem] sm:text-5xl">
            I write software people use every day.
          </h1>

          <p className="mt-6 max-w-xl leading-relaxed text-muted lg:hidden">
            I&apos;m 21 and a Systems Analyst. I joined a company at 18
            answering customers on WhatsApp, moved through sales and treasury,
            and ended up designing and shipping the system that now runs the
            whole operation: orders, inventory, finance and electronic invoicing
            with the Argentine tax authority.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`mailto:${perfil.email}`}
              className="rounded-full bg-acento px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-85"
            >
              Get in touch
            </a>
            <a href={perfil.cvIngles} className="link-sutil">
              Resume
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-sutil"
            >
              LinkedIn
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="link-sutil"
            >
              GitHub
            </a>
          </div>

          <div className="mt-12">
            <NavLateral secciones={SECCIONES} />
          </div>
        </Revelar>
      </header>

      <div className="min-w-0 flex-1 lg:py-16">
        <p className="mb-10 hidden max-w-2xl text-lg leading-relaxed text-muted lg:block">
          I&apos;m 21 and a Systems Analyst. I joined a company at 18 answering
          customers on WhatsApp, moved through sales and treasury, and ended up
          designing and shipping the system that now runs the whole operation:
          orders, inventory, finance and electronic invoicing with the Argentine
          tax authority.
        </p>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-7 border-y border-line py-7 sm:grid-cols-4">
          {numbers.map((n) => (
            <li key={n.etiqueta}>
              <p className="font-mono text-2xl leading-none text-acento-texto">
                {n.valor}
              </p>
              <p className="mt-2.5 text-xs leading-snug text-muted">
                {n.etiqueta}
              </p>
            </li>
          ))}
        </ul>

        <h2
          id="work"
          className="mb-7 mt-16 flex scroll-mt-20 items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-acento-texto"
        >
          Selected work
          <span aria-hidden="true" className="regla-acento h-px flex-1" />
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {work.map((p) => (
            <li key={p.nombre}>
              <a
                href={p.href}
                {...(p.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group block py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">
                    {p.nombre}
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </h3>
                  <span className="shrink-0 font-mono text-[11px] text-muted">
                    {p.periodo}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.resumen}
                </p>
                <p className="mt-3 font-mono text-[11px] text-muted">
                  {p.stack}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <h2
          id="experience"
          className="mb-7 mt-16 flex scroll-mt-20 items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-acento-texto"
        >
          Experience
          <span aria-hidden="true" className="regla-acento h-px flex-1" />
        </h2>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-medium">{experience.empresa}</h3>
          <span className="font-mono text-[11px] text-muted">
            {experience.periodo}
          </span>
        </div>
        <ol className="mt-6 space-y-7 border-l border-line pl-6">
          {experience.puestos.map((p, i) => (
            <li key={p.periodo} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[calc(1.5rem+4px)] top-1.5 size-[7px] rounded-full ${
                  i === 0 ? "bg-acento" : "bg-line"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-medium">{p.puesto}</h4>
                <span className="font-mono text-[11px] text-muted">
                  {p.periodo}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.descripcion}
              </p>
            </li>
          ))}
        </ol>

        <h2
          id="education"
          className="mb-7 mt-16 flex scroll-mt-20 items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-acento-texto"
        >
          Education
          <span aria-hidden="true" className="regla-acento h-px flex-1" />
        </h2>
        <ul className="space-y-4">
          <li>
            <p className="font-medium">Systems Analyst</p>
            <p className="mt-1 font-mono text-xs text-muted">
              Universidad del Salvador · 2023–2026 · graduated
            </p>
          </li>
          <li>
            <p className="font-medium">B.Eng. Computer Engineering</p>
            <p className="mt-1 font-mono text-xs text-muted">
              Universidad del Salvador · 2023–2027 · in progress
            </p>
          </li>
          <li>
            <p className="font-medium">Google Cybersecurity Certificate</p>
            <p className="mt-1 font-mono text-xs text-muted">
              Advanced English
            </p>
          </li>
        </ul>

        <p className="mt-16 text-sm text-muted">
          The full site, including case studies and notes, is{" "}
          <Link href="/" className="link-sutil text-foreground" hrefLang="es">
            in Spanish
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
