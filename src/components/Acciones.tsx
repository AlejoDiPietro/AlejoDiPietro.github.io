import Link from "next/link";
import type { Proyecto } from "@/lib/content";

/**
 * Que se puede hacer con un proyecto: leer el caso, abrirlo, ver el codigo.
 *
 * Existe porque antes cada tarjeta tenia un solo link y cada una iba a otra
 * cosa: el ERP a un caso de estudio, el juego al juego, el cotizador al codigo.
 * Al hacer click no sabias que te ibas a encontrar, y lo que un proyecto NO
 * tenia era invisible.
 *
 * Ahora los tres destinos se nombran. Y cuando falta el codigo porque es
 * privado, se dice: una ausencia explicada no parece un olvido.
 */
export function Acciones({ p }: { p: Proyecto }) {
  const externo = { target: "_blank", rel: "noreferrer" } as const;

  return (
    <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
      {p.caso && (
        <Link href={p.caso} className="link-accion">
          Ver el caso <Flecha>→</Flecha>
        </Link>
      )}

      {p.demo && (
        <a href={p.demo} {...externo} className="link-accion">
          Abrir <Flecha>↗</Flecha>
        </a>
      )}

      {p.repo && (
        <a href={p.repo} {...externo} className="link-accion">
          Código <Flecha>↗</Flecha>
        </a>
      )}

      {p.sinRepo && (
        <span className="font-mono text-[11px] text-muted">{p.sinRepo}</span>
      )}
    </div>
  );
}

/** La flecha no se anuncia: el texto del link ya dice a donde va. */
function Flecha({ children }: { children: string }) {
  return (
    <span aria-hidden="true" className="inline-block transition-transform">
      {children}
    </span>
  );
}
