"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filtros, proyectos, type Proyecto } from "@/lib/content";
import { Captura } from "./Captura";
import { Revelar } from "./Revelar";

function Stack({ items }: { items: string[] }) {
  return (
    <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
      {items.join(" · ")}
    </p>
  );
}

function Flecha() {
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
    >
      →
    </span>
  );
}

/** Envuelve la tarjeta en el link que corresponda, o en nada si no hay link. */
function Enlace({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (!href) return <>{children}</>;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="block">
      {children}
    </Link>
  );
}

/** Proyecto con captura: ocupa todo el ancho y muestra la pantalla. */
function ConCaptura({ p }: { p: Proyecto }) {
  return (
    <Enlace href={p.href}>
      <article className="group">
        <Captura
          src={p.captura}
          alt={p.capturaAlt ?? ""}
          pendiente={p.capturaPendiente}
          transicion={`captura-${p.slug}`}
          chrome
          className="transition-colors duration-300 group-hover:border-acento/50"
        />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-medium leading-snug">
            {p.nombre}
            {p.href && <Flecha />}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-muted">
            {p.periodo}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{p.resumen}</p>
        <Stack items={p.stack} />
      </article>
    </Enlace>
  );
}

/** Proyecto sin captura: fila compacta. */
function Fila({ p }: { p: Proyecto }) {
  return (
    <Enlace href={p.href}>
      <article className="group py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-medium leading-snug">
            {p.nombre}
            {p.href && <Flecha />}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-muted">
            {p.periodo}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{p.resumen}</p>
        <Stack items={p.stack} />
      </article>
    </Enlace>
  );
}

export function Proyectos() {
  const [activo, setActivo] = useState<string>("Todos");

  const visibles = useMemo(
    () =>
      activo === "Todos"
        ? proyectos
        : proyectos.filter((p) => p.stack.includes(activo)),
    [activo],
  );

  const destacados = visibles.filter((p) => p.captura || p.capturaPendiente);
  const resto = visibles.filter((p) => !p.captura && !p.capturaPendiente);

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar proyectos por tecnología"
        className="mb-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs"
      >
        {filtros.map((f) => {
          const seleccionado = activo === f;
          return (
            <button
              key={f}
              onClick={() => setActivo(f)}
              aria-pressed={seleccionado}
              className={`transition-colors ${
                seleccionado
                  ? "text-foreground underline decoration-acento decoration-2 underline-offset-[6px]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {destacados.length > 0 && (
        <ul className="space-y-12">
          {destacados.map((p, i) => (
            <li key={p.slug}>
              <Revelar delay={i * 70}>
                <ConCaptura p={p} />
              </Revelar>
            </li>
          ))}
        </ul>
      )}

      {resto.length > 0 && (
        <ul
          className={`divide-y divide-line border-y border-line ${
            destacados.length > 0 ? "mt-12" : ""
          }`}
        >
          {resto.map((p, i) => (
            <li key={p.slug}>
              <Revelar delay={i * 60}>
                <Fila p={p} />
              </Revelar>
            </li>
          ))}
        </ul>
      )}

      {visibles.length === 0 && (
        <p className="text-muted">No hay proyectos con esa tecnología.</p>
      )}
    </>
  );
}
