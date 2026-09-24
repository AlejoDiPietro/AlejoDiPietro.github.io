import { Contador } from "./Contador";
import { Revelar } from "./Revelar";

export type Numero = {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  etiqueta: string;
};

/**
 * La tira de números, como panel de lectura.
 *
 * Cuatro celdas dentro de un marco, separadas por líneas finas. Cada número
 * cuenta desde cero al entrar en pantalla (Contador) y la etiqueta lo
 * explica en una línea.
 *
 * El <dt> va antes que el <dd>, como pide el HTML, y el número queda arriba
 * con flex-col-reverse: el orden del documento y el visual no tienen que ser
 * el mismo.
 */
export function Numeros({ items }: { items: readonly Numero[] }) {
  return (
    <Revelar>
      <dl className="marco grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
        {items.map((n, i) => (
          <div
            key={n.etiqueta}
            className={`flex flex-col-reverse px-5 py-6 sm:px-6 ${i < 2 ? "border-b border-line sm:border-b-0" : ""} ${i % 2 === 1 ? "border-l border-line sm:border-l-0" : ""}`}
          >
            <dt className="mt-3 text-xs leading-snug text-muted">{n.etiqueta}</dt>
            <dd className="font-mono text-3xl leading-none text-acento-texto">
              <Contador
                valor={n.valor}
                prefijo={n.prefijo ?? ""}
                sufijo={n.sufijo ?? ""}
              />
            </dd>
          </div>
        ))}
      </dl>
    </Revelar>
  );
}
