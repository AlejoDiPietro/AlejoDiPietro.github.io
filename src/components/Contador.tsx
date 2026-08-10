"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta de 0 al valor final cuando el número entra en pantalla.
 *
 * Usa requestAnimationFrame con una curva easeOut: un setInterval daría saltos
 * y no se adapta a la frecuencia de refresco de la pantalla.
 * Si el sistema pide menos movimiento, muestra el número final y no anima.
 */
export function Contador({
  valor,
  prefijo = "",
  sufijo = "",
  duracion = 1400,
}: {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sinMovimiento || typeof IntersectionObserver === "undefined") {
      setActual(valor);
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();

        const inicio = performance.now();
        const animar = (ahora: number) => {
          const t = Math.min((ahora - inicio) / duracion, 1);
          const suavizado = 1 - Math.pow(1 - t, 3);
          setActual(Math.round(valor * suavizado));
          if (t < 1) frame = requestAnimationFrame(animar);
        };
        frame = requestAnimationFrame(animar);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [valor, duracion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {actual}
      {sufijo}
    </span>
  );
}
