import Image from "next/image";
import { ViewTransition } from "react";

type Props = {
  src?: string;
  alt?: string;
  /** Que va a ir aca cuando exista la imagen. Se muestra en el marco vacio. */
  pendiente?: string;
  /** Relacion de aspecto del marco. Las capturas de pantalla suelen ser 16/10. */
  ratio?: string;
  /** El cromo de ventana suma en un caso de estudio y estorba en una tarjeta. */
  chrome?: boolean;
  /**
   * Nombre compartido entre la tarjeta de la home y el encabezado del caso.
   * Con el mismo nombre en las dos rutas, el navegador anima una hacia la otra
   * en lugar de cortar: se entiende que es la misma cosa y no un reemplazo.
   * Sin soporte del navegador, la navegación es la de siempre.
   */
  transicion?: string;
  /**
   * Sin borde ni fondo propios: para cuando ya vive dentro de un marco (la
   * tarjeta de proyecto) y un segundo borde sería una caja dentro de otra.
   */
  plano?: boolean;
  className?: string;
};

/**
 * Marco para las capturas de los proyectos.
 *
 * Mientras no haya imagen dibuja un placeholder con la leyenda de lo que va a
 * ir: el hueco se ve deliberado y no roto, y el dia que aparezca el archivo
 * alcanza con setear `captura` en content.ts.
 */
export function Captura({
  src,
  alt = "",
  pendiente,
  ratio = "16 / 10",
  chrome = false,
  transicion,
  plano = false,
  className = "",
}: Props) {
  const marco = (
    <figure
      className={`overflow-hidden ${
        plano ? "border-b border-line" : "marco"
      } ${className}`}
    >
      {chrome && (
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5"
        >
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </div>
      )}

      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--curva)] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-acento-suave/60 p-4">
            {/* Trama diagonal: dice "esto va a tener contenido" sin gritar. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 9px)",
              }}
            />
            <p className="relative text-center font-mono text-[11px] leading-relaxed tracking-wide text-muted">
              {pendiente ?? "Captura"}
            </p>
          </div>
        )}
      </div>
    </figure>
  );

  if (!transicion) return marco;
  return <ViewTransition name={transicion}>{marco}</ViewTransition>;
}
