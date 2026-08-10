"use client";

import { useCallback, useSyncExternalStore } from "react";

type Tema = "claro" | "oscuro";

/**
 * El tema no vive en estado de React: vive en el atributo `data-tema` del
 * <html>, que el script de layout.tsx escribe antes del primer pintado.
 *
 * Por eso esto es useSyncExternalStore y no un useState con un useEffect que
 * lo sincronice: el atributo es la fuente de verdad y el componente solo lo
 * lee. Alternar escribe el atributo, el MutationObserver avisa, y React
 * redibuja el ícono. Un dato, un dueño.
 */

function suscribir(avisar: () => void) {
  const observer = new MutationObserver(avisar);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-tema"],
  });
  return () => observer.disconnect();
}

function leer(): Tema | null {
  const t = document.documentElement.dataset.tema;
  return t === "claro" || t === "oscuro" ? t : null;
}

/** En el HTML estático todavía no se sabe qué eligió el visitante. */
function leerEnServidor(): Tema | null {
  return null;
}

export function TemaToggle() {
  const tema = useSyncExternalStore(suscribir, leer, leerEnServidor);

  const alternar = useCallback(() => {
    const nuevo: Tema = leer() === "oscuro" ? "claro" : "oscuro";
    document.documentElement.dataset.tema = nuevo;
    try {
      localStorage.setItem("tema", nuevo);
    } catch {
      // Modo incógnito con almacenamiento bloqueado: el tema igual cambia,
      // solo que no se recuerda para la próxima visita.
    }
  }, []);

  return (
    <button
      onClick={alternar}
      aria-label={
        tema === "oscuro" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
      }
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-acento hover:text-acento-texto"
    >
      {/* Hasta que hidrata no se sabe el tema: se reserva el lugar y ya. */}
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
