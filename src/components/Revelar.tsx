"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muestra a sus hijos con una transición cuando entran en pantalla.
 *
 * Es IntersectionObserver directo en lugar de una librería de animación: son
 * treinta líneas, no agrega peso al bundle y el navegador hace el trabajo.
 * Se desconecta apenas revela, así no queda observando de por vida.
 */
export function Revelar({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin soporte, mostrar directamente en lugar de dejarlo invisible.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar ${visible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
