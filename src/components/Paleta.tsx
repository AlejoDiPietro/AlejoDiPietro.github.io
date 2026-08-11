"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Selector de paleta.
 *
 * Los colores reales viven en globals.css; acá solo están el nombre y una
 * muestra para el botón. Igual que el tema, la fuente de verdad es el atributo
 * del <html> y este componente solo lo lee y lo escribe.
 */
export const PALETAS = [
  { id: "cobre", nombre: "Cobre", muestra: "#c06a2a" },
  { id: "violeta", nombre: "Violeta", muestra: "#7c5cff" },
  { id: "indigo", nombre: "Índigo", muestra: "#1f9fc4" },
  { id: "verde", nombre: "Verde", muestra: "#22a06b" },
] as const;

export type PaletaId = (typeof PALETAS)[number]["id"];

const IDS = PALETAS.map((p) => p.id) as readonly string[];

function suscribir(avisar: () => void) {
  const observer = new MutationObserver(avisar);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-paleta"],
  });
  return () => observer.disconnect();
}

function leer(): PaletaId {
  const p = document.documentElement.dataset.paleta;
  return (IDS.includes(p ?? "") ? p : "cobre") as PaletaId;
}

/** En el HTML estático se asume la de por defecto. */
function leerEnServidor(): PaletaId {
  return "cobre";
}

export function Paleta() {
  const actual = useSyncExternalStore(suscribir, leer, leerEnServidor);

  const elegir = useCallback((id: PaletaId) => {
    document.documentElement.dataset.paleta = id;
    try {
      localStorage.setItem("paleta", id);
    } catch {
      // Almacenamiento bloqueado: el color cambia igual, no se recuerda.
    }
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="Paleta de colores"
      className="hidden items-center gap-1.5 sm:flex"
    >
      {PALETAS.map((p) => {
        const seleccionada = actual === p.id;
        return (
          <button
            key={p.id}
            role="radio"
            aria-checked={seleccionada}
            aria-label={p.nombre}
            title={p.nombre}
            onClick={() => elegir(p.id)}
            className={`size-3.5 rounded-full transition-transform hover:scale-110 ${
              seleccionada
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            }`}
            style={{ background: p.muestra }}
          />
        );
      })}
    </div>
  );
}
