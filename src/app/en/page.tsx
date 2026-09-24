import type { Metadata } from "next";
import Link from "next/link";
import { ACCIONES_EN } from "@/components/Acciones";
import { DIAGRAMA_EN } from "@/components/Diagrama";
import { Espinazo } from "@/components/Espinazo";
import { Etapa } from "@/components/Etapa";
import { Experiencia } from "@/components/Experiencia";
import { Hero } from "@/components/Hero";
import { Numeros } from "@/components/Numeros";
import { Grilla } from "@/components/Proyectos";
import { Revelar } from "@/components/Revelar";
import { perfil, proyectos, type Proyecto } from "@/lib/content";

export const metadata: Metadata = {
  // `absolute` evita que el template del layout le pegue el nombre de nuevo
  // y quede "Alejo Di Pietro — Systems & Data Lead — Alejo Di Pietro".
  title: { absolute: "Alejo Di Pietro — Systems & Data Lead" },
  description:
    "Systems Analyst from Buenos Aires. I designed and shipped the management system that runs an entire company, and work with its leadership on the data it produces: results, profitability and losses.",
  openGraph: { locale: "en_US" },
  alternates: { canonical: "/en", languages: { "es-AR": "/", "en-US": "/en" } },
};

const INTRO =
  "I'm a Systems Analyst and I lead systems and data at Cambren SRL. I designed and shipped the management system that now runs the whole company — sales, inventory, purchasing, finance and electronic invoicing with the Argentine tax authority — and I work alongside its leadership on the information it produces: income statements, profitability analysis and spotting where money is being lost.";

const numbers = [
  { valor: 3, sufijo: " months", etiqueta: "from nothing to production" },
  { valor: 10, prefijo: "~", etiqueta: "people use it every day" },
  { valor: 4, etiqueta: "departments on one shared model" },
  { valor: 6, etiqueta: "modules in production" },
];

/**
 * Los proyectos en inglés: mismo orden y mismos destinos que la home, con el
 * texto traducido. Las capturas y los links se toman de content.ts por slug,
 * así una captura nueva aparece acá sin tocar nada.
 */
const textos: Record<string, { nombre: string; resumen: string; sinRepo?: string }> = {
  sgc: {
    nombre: "SGC — the ERP that runs a company",
    resumen:
      "Six modules over a 127-entity relational model: operations, sales and finance in one place, with electronic invoicing against the Argentine tax authority and a 106-permission access control layer. I designed it, built it and shipped it in three months, on my own.",
    sinRepo: "Private: it runs the company",
  },
  cotizador: {
    nombre: "Fence quoting tool",
    resumen:
      "Metres of each side go in; a bill of materials, labour and the VAT-inclusive total come out, with the fence drawn to scale. The calculation is a pure function: it runs in the browser for the live number and again on the server when saving, discarding whatever totals the client sends. A saved quote is never recalculated — it freezes that day's prices the way an invoice does.",
  },
  "web-publica": {
    nombre: "Migrating a public site to Next.js",
    resumen:
      "Ported a company's public website from PHP to Next.js App Router, starting with the product catalog. The hard part was never the framework — it was migrating without breaking URLs that were already indexed.",
    sinRepo: "Private: it's the company's website",
  },
  "gestion-proyectos": {
    nombre: "Project management — REST over SOAP",
    resumen:
      "A REST API consuming a SOAP service over a JPA/Hibernate backend with HQL queries. Multi-module Maven, with the layers genuinely separated: the REST module has no dependency on the DAO, it only speaks WSDL.",
  },
  chatbot: {
    nombre: "Customer service chatbot",
    resumen:
      "My first project real people used. I modelled the conversation with UML activity diagrams before writing a line, and it automated the questions we answered twenty times a day.",
  },
  aetheria: {
    nombre: "Aetheria Online — a 3D RPG in the browser",
    resumen:
      "A personal project: a combat and progression sandbox with five zones, rarity-based loot, inventory, gear and bosses, written with Three.js in a single index.html — no build step, no framework.",
  },
  "este-sitio": {
    nombre: "This very site",
    resumen:
      "Next.js with static export on GitHub Pages. The scroll-in animations are a hand-written IntersectionObserver, no libraries: thirty lines that weigh nothing.",
  },
};

const work: Proyecto[] = proyectos.map((p) => ({
  ...p,
  nombre: textos[p.slug]?.nombre ?? p.nombre,
  resumen: textos[p.slug]?.resumen ?? p.resumen,
  sinRepo: textos[p.slug]?.sinRepo,
  capturaPendiente: p.capturaPendiente ? "Product catalog" : undefined,
}));

/** Agrupado por empresa: la progresión es el argumento, no cada puesto suelto. */
const experience = [
  {
    empresa: "Cambren SRL",
    periodo: "2024 — Present",
    puestos: [
      {
        puesto: "Systems & Data Lead",
        periodo: "Apr 2026 — Present",
        descripcion:
          "Mapped the processes of every department and designed, built and shipped the ERP that runs the operation, with electronic invoicing and costs updated automatically from supplier invoices. I work with the owners, the accounting firm and external advisors: I prepare the income statements and profitability analysis, and provide the data to detect and fix operational losses.",
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
        descripcion: "My first job writing code that shipped to production, at 19.",
      },
    ],
  },
];

const education = [
  { titulo: "Systems Analyst", detalle: "Universidad del Salvador · 2023–2026 · graduated" },
  {
    titulo: "B.Eng. Computer Engineering",
    detalle: "Universidad del Salvador · 2023–2027 · in progress",
  },
  { titulo: "Google Cybersecurity Certificate", detalle: "Advanced English" },
];

export default function En() {
  return (
    <>
      <Hero
        etiqueta="Alejo Di Pietro · Systems & Data Lead"
        ubicacion="Buenos Aires, Argentina"
        altFoto={`Photo of ${perfil.nombre}`}
        titulo="I build systems and use their data to make decisions."
        detalle={INTRO}
        diagrama={DIAGRAMA_EN}
        ctaPrincipal={{ href: "#work", texto: "See the work" }}
        ctaSecundaria={{ href: `mailto:${perfil.email}`, texto: "Get in touch" }}
      />

      <div className="flujo">
        <Espinazo />

        <Numeros items={numbers} />

        <Etapa id="work" indice="01" titulo="Selected work">
          <Grilla items={work} textos={ACCIONES_EN} />
        </Etapa>

        <Etapa id="experience" indice="02" titulo="Experience">
          <Experiencia items={experience} />
        </Etapa>

        <Etapa id="education" indice="03" titulo="Education">
          <ul className="marco divide-y divide-line">
            {education.map((f, i) => (
              <li key={f.titulo}>
                <Revelar delay={i * 60}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-5 sm:px-6">
                    <p className="font-medium">{f.titulo}</p>
                    <p className="font-mono text-xs text-muted">{f.detalle}</p>
                  </div>
                </Revelar>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted">
            The full site, including case studies and notes, is{" "}
            <Link href="/" className="link-sutil text-foreground" hrefLang="es">
              in Spanish
            </Link>
            . Resume:{" "}
            <a href={perfil.cvIngles} className="link-sutil text-foreground">
              PDF (EN)
            </a>
            .
          </p>
        </Etapa>
      </div>
    </>
  );
}
