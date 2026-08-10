"use client";

import { useEffect, useState } from "react";

/**
 * Navegación de la columna izquierda, con la sección actual marcada.
 *
 * El indicador no se calcula con la posición del scroll sino con un
 * IntersectionObserver por sección: es el mismo mecanismo que ya usa el resto
 * del sitio, no dispara en cada píxel que se mueve la rueda y el navegador
 * hace el trabajo. La franja `rootMargin` marca como activa la sección que
 * cruza el tercio superior de la pantalla, que es donde la vista está mirando.
 *
 * Solo aparece en escritorio: en mobile todo es una columna y el índice sobra.
 */

const SECCIONES = [
  { id: "proyectos", texto: "Proyectos" },
  { id: "notas", texto: "Notas" },
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "stack", texto: "Stack" },
  { id: "experiencia", texto: "Experiencia" },
  { id: "formacion", texto: "Formación" },
];

export function NavLateral() {
  const [activa, setActiva] = useState<string>(SECCIONES[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    const nodos = SECCIONES.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    nodos.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Secciones" className="hidden lg:block">
      <ul className="space-y-3">
        {SECCIONES.map((s) => {
          const esActiva = activa === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={esActiva ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                {/* La rayita crece y se tiñe: dice dónde estás sin texto extra. */}
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    esActiva
                      ? "w-10 bg-acento"
                      : "w-5 bg-line group-hover:w-8 group-hover:bg-muted"
                  }`}
                />
                <span
                  className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                    esActiva
                      ? "text-foreground"
                      : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {s.texto}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
