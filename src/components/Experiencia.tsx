import type { Experiencia as Exp } from "@/lib/content";
import { Revelar } from "./Revelar";

/**
 * La experiencia como recorrido: se entra abajo y se sube.
 *
 * Agrupada por empresa y con una línea vertical propia, un espinazo chico.
 * El nodo del puesto actual late; los anteriores están apagados. Cuatro
 * entradas seguidas de "Cambren SRL" como lista plana se leerían como
 * cuatro trabajos sueltos; así se lee lo que pasó: un solo lugar, y una
 * progresión adentro.
 */
export function Experiencia({ items }: { items: readonly Exp[] }) {
  return (
    <div className="space-y-12">
      {items.map((e) => (
        <div key={e.empresa} className="marco p-6 sm:p-8">
          <Revelar>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium">{e.empresa}</h3>
              <span className="font-mono text-[11px] text-muted">{e.periodo}</span>
            </div>
          </Revelar>

          <ol className="mt-8 space-y-8 border-l border-line pl-7">
            {e.puestos.map((p, i) => (
              <li key={p.periodo} className="relative">
                <Revelar delay={i * 70}>
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[calc(1.75rem+5px)] top-1.5 size-[9px] rounded-full ${
                      i === 0 ? "late bg-acento" : "bg-line"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className={`font-medium ${i === 0 ? "text-acento-texto" : ""}`}>
                      {p.puesto}
                    </h4>
                    <span className="font-mono text-[11px] text-muted">
                      {p.periodo}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.descripcion}
                  </p>
                </Revelar>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
