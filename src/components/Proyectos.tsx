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
 * El proyecto destacado va solo, a todo el ancho, con la captura a la
 * izquierda y el texto a la derecha en escritorio. El resto son tarjetas de
 * columna: las que tienen captura la muestran arriba; las que no, llevan el
 * índice y el año en una franja, así ninguna arranca con un hueco.
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
    <article
      className={`marco marco-hover group relative flex w-full flex-col ${
        destacado ? "lg:grid lg:grid-cols-[3fr_2fr]" : ""
      }`}
    >
      {conImagen ? (
        <Captura
          src={p.captura}
          alt={p.capturaAlt ?? ""}
          pendiente={p.capturaPendiente}
          transicion={`captura-${p.slug}`}
          ratio={destacado ? (p.capturaRatio ?? "16 / 10") : "16 / 10"}
          chrome={p.capturaChrome ?? true}
          plano
          className={destacado ? "lg:border-b-0 lg:border-r lg:border-line" : ""}
        />
      ) : (
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="etiqueta text-muted">
            {String(indice + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] text-muted">{p.periodo}</span>
        </div>
      )}

      <div className={`flex flex-1 flex-col p-5 ${destacado ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-medium leading-snug ${destacado ? "text-xl" : ""}`}>
            <Titulo p={p} />
          </h3>
          {conImagen && (
            <span className="shrink-0 font-mono text-[11px] text-muted">
              {p.periodo}
            </span>
          )}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.resumen}</p>

        <p className={`pt-4 font-mono text-[11px] leading-relaxed text-muted ${destacado ? "" : "mt-auto"}`}>
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
  /*
    Mosaico en columnas (CSS multicol) y no una grilla de filas: en una
    grilla, la fila mide lo que mide la tarjeta más alta y las demás quedan
    con aire adentro o abajo. Con columnas cada tarjeta mide lo suyo y la
    siguiente se apoya justo debajo. El destacado va aparte, a todo el ancho,
    porque una tarjeta no puede cruzar columnas.
  */
  const destacado = items.find((p) => p.destacado);
  const resto = items.filter((p) => p !== destacado);

  return (
    <div>
      {destacado && (
        <Revelar>
          <Tarjeta p={destacado} indice={0} textos={textos} />
        </Revelar>
      )}

      <ul
        className={`gap-5 md:columns-2 lg:columns-3 ${destacado ? "mt-5" : ""}`}
      >
        {resto.map((p, i) => (
          <li key={p.slug} className="mb-5 break-inside-avoid">
            <Revelar delay={(i % 3) * 80}>
              <Tarjeta p={p} indice={i + 1} textos={textos} />
            </Revelar>
          </li>
        ))}
      </ul>
    </div>
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
