"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filtros, proyectos } from "@/lib/content";
import { Revelar } from "./Revelar";

function Etiquetas({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full bg-acento-suave px-2.5 py-1 font-mono text-[11px] text-acento-texto"
        >
          {t}
        </li>
      ))}
    </ul>
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
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                seleccionado
                  ? "border-transparent bg-foreground text-background"
                  : "border-line text-muted hover:border-acento hover:text-acento-texto"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2">
        {visibles.map((p, i) => {
          const externo = p.href?.startsWith("http");

          const cuerpo = (
            <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-acento/40 hover:shadow-lg hover:shadow-acento/5">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden="true" className="text-2xl">
                  {p.emoji}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {p.periodo}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold leading-snug">
                {p.nombre}
                {p.href && (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                )}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.resumen}
              </p>
              <Etiquetas items={p.stack} />
            </article>
          );

          return (
            <li key={p.slug} className={p.destacado ? "sm:col-span-2" : ""}>
              <Revelar delay={i * 70} className="h-full">
                {p.href ? (
                  externo ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full"
                    >
                      {cuerpo}
                    </a>
                  ) : (
                    <Link href={p.href} className="block h-full">
                      {cuerpo}
                    </Link>
                  )
                ) : (
                  cuerpo
                )}
              </Revelar>
            </li>
          );
        })}
      </ul>

      {visibles.length === 0 && (
        <p className="text-muted">No hay proyectos con esa tecnología.</p>
      )}
    </>
  );
}
