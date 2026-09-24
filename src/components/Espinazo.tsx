"use client";

import { useEffect, useRef } from "react";

/**
 * La línea que recorre la home: el flujo de datos hecho visible.
 *
 * Escribe una sola variable CSS (--progreso, de 0 a 1) según cuánto del
 * contenedor ya pasó por la pantalla; el trazo se dibuja con eso vía
 * transform en globals.css. Las partículas que bajan son una animación CSS
 * pura: acá no hay ningún trabajo por cuadro, solo un listener de scroll
 * pasivo que se agrupa en un requestAnimationFrame.
 *
 * Con menos movimiento pedido, el CSS ya muestra el trazo entero y esconde
 * las partículas; este componente no tiene que saberlo.
 */
export function Espinazo({ particulas = 4 }: { particulas?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const contenedor = el?.parentElement;
    if (!el || !contenedor) return;

    let frame = 0;

    const medir = () => {
      frame = 0;
      const r = contenedor.getBoundingClientRect();
      const alto = window.innerHeight;
      // Progreso: 0 cuando el contenedor asoma por abajo, 1 cuando su final
      // cruza el 85% de la pantalla. Se termina de dibujar un poco antes de
      // llegar al pie, para que el último nodo se encienda mientras se lee.
      const recorrido = r.height - alto * 0.15;
      const avanzado = alto * 0.85 - r.top;
      const p = Math.min(1, Math.max(0, avanzado / recorrido));
      el.style.setProperty("--progreso", p.toFixed(4));
    };

    const alScrollear = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", alScrollear);
    return () => {
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", alScrollear);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="espinazo" aria-hidden="true">
      <div className="espinazo-pista" />
      <div className="espinazo-trazo" />
      {Array.from({ length: particulas }, (_, i) => (
        <span
          key={i}
          className="particula"
          style={
            {
              "--dur": `${12 + i * 3.5}s`,
              "--retraso": `${-i * 4.2}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
