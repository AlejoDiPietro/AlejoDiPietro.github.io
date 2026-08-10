"use client";

import { useEffect, useState } from "react";

type Tema = "claro" | "oscuro";

/**
 * Alterna claro/oscuro y lo recuerda en localStorage.
 *
 * El estado arranca en null y el botón no se dibuja hasta montar: en el HTML
 * estático no se sabe qué tema eligió el visitante, y pintar el ícono
 * equivocado para corregirlo después produce un parpadeo visible.
 * El script de layout.tsx es el que evita el flash de fondo.
 */
export function TemaToggle() {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem("tema") as Tema | null;
    const delSistema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "oscuro"
      : "claro";
    setTema(guardado ?? delSistema);
  }, []);

  function alternar() {
    const nuevo: Tema = tema === "oscuro" ? "claro" : "oscuro";
    setTema(nuevo);
    document.documentElement.dataset.tema = nuevo;
    localStorage.setItem("tema", nuevo);
  }

  return (
    <button
      onClick={alternar}
      aria-label={
        tema === "oscuro" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
      }
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-acento hover:text-acento-texto"
    >
      {tema === null ? (
        <span className="size-4" />
      ) : tema === "oscuro" ? (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
