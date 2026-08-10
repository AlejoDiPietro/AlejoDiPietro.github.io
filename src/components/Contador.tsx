"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * useLayoutEffect corre antes de que el navegador pinte, pero no existe en el
 * render del servidor y React avisa si se lo llama ahi. Este alias elige el
 * que corresponde segun donde este corriendo.
 */
const useEfectoPrevioAPintar =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Cuenta de 0 al valor final cuando el número entra en pantalla.
 *
 * Dos decisiones que no se ven:
 *
 * El HTML se genera con el número FINAL, no con cero. Así el valor correcto
 * está en el documento para quien no tenga JavaScript y para cualquier cosa
 * que lea la página sin ejecutarla. Recién antes de pintar, si se va a animar,
 * se lo pone en cero — por eso useLayoutEffect y no useEffect: con este último
 * se vería un cuadro con el número final antes del salto a cero.
 *
 * La animación escribe directo en el nodo en lugar de pasar por estado. Un
 * setState por cuadro son sesenta renders por segundo por cada número de la
 * página para algo que ni siquiera cambia el árbol: solo cambia un texto.
 *
 * Si el sistema pide menos movimiento, no anima y el número ya está bien.
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

  const animable =
    typeof window !== "undefined" &&
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEfectoPrevioAPintar(() => {
    if (!animable) return;
    const el = ref.current;
    if (el) el.textContent = "0";
  }, [animable]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animable) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();

        const inicio = performance.now();
        const animar = (ahora: number) => {
          const t = Math.min((ahora - inicio) / duracion, 1);
          const suavizado = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(valor * suavizado));
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
  }, [valor, duracion, animable]);

  return (
    <span className="tabular-nums">
      {prefijo}
      <span ref={ref}>{valor}</span>
      {sufijo}
    </span>
  );
}
