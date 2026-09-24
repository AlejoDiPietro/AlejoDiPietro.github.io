"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Una sección de la home, como etapa del flujo.
 *
 * Lleva su nodo sobre el espinazo, un índice en mono ("01") y el título. El
 * nodo se enciende cuando la etapa cruza el tercio superior de la pantalla,
 * con un IntersectionObserver por sección: el mismo mecanismo que ya usa el
 * resto del sitio, sin escuchar cada píxel de scroll.
 */
export function Etapa({
  id,
  indice,
  titulo,
  children,
}: {
  id: string;
  indice: string;
  titulo: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [activa, setActiva] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entrada]) => setActiva(entrada.isIntersecting),
      { rootMargin: "-25% 0px -60% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-activa={activa}
      className="etapa relative scroll-mt-24 py-14 sm:py-16"
    >
      <span className="nodo" aria-hidden="true" />
      <header className="mb-8 flex items-baseline gap-4">
        <span className="etiqueta text-acento-texto">{indice}</span>
        <h2 className="display text-3xl sm:text-4xl">{titulo}</h2>
        <span
          aria-hidden="true"
          className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block"
        />
      </header>
      {children}
    </section>
  );
}
