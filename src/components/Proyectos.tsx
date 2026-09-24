"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { destinoPrincipal, filtros, proyectos, type Proyecto } from "@/lib/content";
import { Acciones, ACCIONES_ES, type TextosAcciones } from "./Acciones";
import { Captura } from "./Captura";
import { Revelar } from "./Revelar";

/**
 * El titulo es el link, y su `::after` cubre la tarjeta entera.
 *
 * Es la unica forma de que toda la tarjeta sea clickeable y que ADEMAS haya
 * links adentro: un `<a>` dentro de otro `<a>` es HTML invalido, y el navegador
 * lo desarma como quiere. Asi hay un solo link real para la tarjeta y los de
 * `Acciones` quedan por encima con `z-10`.
 */
function Titulo({ p }: { p: Proyecto }) {
  const destino = destinoPrincipal(p);
  const flecha = (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
    >
      →
    </span>
  );

  if (!destino) return <>{p.nombre}</>;

  if (destino.startsWith("http")) {
    return (
      <a
        href={destino}
        target="_blank"
        rel="noreferrer"
        className="after:absolute after:inset-0 after:content-['']"
      >
        {p.nombre}
        {flecha}
      </a>
    );
  }

  return (
    <Link href={destino} className="after:absolute after:inset-0 after:content-['']">
      {p.nombre}
      {flecha}
    </Link>
  );
}

/**
 * Una tarjeta de la grilla.
 *
 * El proyecto destacado ocupa dos tercios del ancho y muestra su captura
 * grande; el resto son tarjetas de un tercio. Las que tienen captura la
 * muestran arriba; las que no, llevan el índice y el año en una franja, así
 * la grilla no queda con huecos de distinto peso.
 */
function Tarjeta({
  p,
  indice,
  textos,
}: {
  p: Proyecto;
  indice: number;
  textos: TextosAcciones;
}) {
  const destacado = p.destacado === true;
  const conImagen = Boolean(p.captura || p.capturaPendiente);

  return (
    <article className="marco marco-hover group relative flex w-full flex-col">
      {conImagen ? (
        <Captura
          src={p.captura}
          alt={p.capturaAlt ?? ""}
          pendiente={p.capturaPendiente}
          transicion={`captura-${p.slug}`}
          ratio={destacado ? (p.capturaRatio ?? "16 / 9") : "16 / 10"}
          chrome={p.capturaChrome ?? true}
          plano
        />
      ) : (
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="etiqueta text-muted">
            {String(indice + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] text-muted">{p.periodo}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-medium leading-snug ${destacado ? "text-lg" : ""}`}>
            <Titulo p={p} />
          </h3>
          {conImagen && (
            <span className="shrink-0 font-mono text-[11px] text-muted">
              {p.periodo}
            </span>
          )}
        </div>

        <p
          className={`mt-2.5 text-sm leading-relaxed text-muted ${
            destacado ? "" : "recorte-5"
          }`}
        >
          {p.resumen}
        </p>

        <p className="mt-auto pt-4 font-mono text-[11px] leading-relaxed text-muted">
          {p.stack.join(" · ")}
        </p>
        <Acciones p={p} textos={textos} />
      </div>
    </article>
  );
}

/** La grilla sola, para la home y para /en. */
export function Grilla({
  items,
  textos = ACCIONES_ES,
}: {
  items: Proyecto[];
  textos?: TextosAcciones;
}) {
  // items-start: cada tarjeta mide lo que su contenido pide. Estiradas a la
  // fila, las de texto quedaban con medio panel vacío al lado de una captura.
  return (
    <ul className="grid gap-5 lg:grid-cols-6 lg:items-start">
      {items.map((p, i) => (
        <li
          key={p.slug}
          className={`flex ${p.destacado ? "lg:col-span-4" : "lg:col-span-2"}`}
        >
          <Revelar delay={(i % 3) * 80} className="flex w-full">
            <Tarjeta p={p} indice={i} textos={textos} />
          </Revelar>
        </li>
      ))}
    </ul>
  );
}

/** La home en español: la grilla con el filtro por tecnología arriba. */
export function Proyectos() {
  const [activo, setActivo] = useState<string>("Todos");

  const visibles = useMemo(
    () =>
      activo === "Todos"
        ? proyectos
        : proyectos.filter((p) => p.stack.includes(activo)),
    [activo],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar proyectos por tecnología"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filtros.map((f) => {
          const seleccionado = activo === f;
          return (
            <button
              key={f}
              onClick={() => setActivo(f)}
              aria-pressed={seleccionado}
              className={`chip ${
                seleccionado
                  ? "border-acento! bg-acento-suave! text-acento-texto!"
                  : "text-muted"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <Grilla items={visibles} />

      {visibles.length === 0 && (
        <p className="text-muted">No hay proyectos con esa tecnología.</p>
      )}
    </>
  );
}
