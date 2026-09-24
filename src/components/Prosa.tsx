import Link from "next/link";

/**
 * Primitivas de los textos largos (casos de estudio y notas).
 *
 * Estan aca y no repetidas en cada pagina para que el ritmo vertical sea el
 * mismo en todo el sitio: si cambia el espaciado, cambia en un solo lugar.
 */

export function Volver({ href, texto }: { href: string; texto: string }) {
  return (
    <Link
      href={href}
      className="link-sutil font-mono text-xs text-muted hover:text-foreground"
    >
      ← {texto}
    </Link>
  );
}

export function Titulo({
  children,
  meta,
  bajada,
}: {
  children: React.ReactNode;
  meta?: string;
  bajada?: string;
}) {
  return (
    <header className="entrada mt-7">
      {meta && (
        <p className="etiqueta flex items-center gap-3 text-acento-texto">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-acento" />
          {meta}
        </p>
      )}
      <h1 className="display mt-5 text-4xl sm:text-[3.4rem]">{children}</h1>
      {bajada && (
        <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">{bajada}</p>
      )}
    </header>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display mb-2 mt-16 text-[1.9rem]">{children}</h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-[1.75]">{children}</p>;
}

export function Codigo({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  );
}

/** Cita al margen: para el remate de una seccion, no para adornar. */
export function Aparte({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-8 border-l-2 border-acento pl-5 leading-relaxed text-muted">
      {children}
    </aside>
  );
}

export function Datos({
  items,
}: {
  items: { valor: string; etiqueta: string }[];
}) {
  return (
    <dl className="marco mt-10 grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-line">
      {items.map((n, i) => (
        <div
          key={n.etiqueta}
          className={`flex flex-col-reverse px-5 py-5 ${i < 2 ? "border-b border-line sm:border-b-0" : ""} ${i % 2 === 1 ? "border-l border-line sm:border-l-0" : ""}`}
        >
          <dt className="mt-2.5 text-xs leading-snug text-muted">{n.etiqueta}</dt>
          <dd className="font-mono text-2xl leading-none text-acento-texto">
            {n.valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Bloque({ children }: { children: React.ReactNode }) {
  return (
    <div className="marco mt-14 p-5 text-sm leading-relaxed text-muted">
      {children}
    </div>
  );
}
