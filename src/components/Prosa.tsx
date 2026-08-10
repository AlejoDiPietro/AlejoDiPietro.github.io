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
    <header className="mt-7">
      {meta && (
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-acento-texto">
          {meta}
        </p>
      )}
      <h1 className="display mt-4 text-4xl sm:text-5xl">{children}</h1>
      {bajada && <p className="mt-5 leading-relaxed text-muted">{bajada}</p>}
    </header>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1 mt-14 text-lg font-semibold tracking-tight">
      {children}
    </h2>
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
    <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
      {items.map((n) => (
        <div key={n.etiqueta}>
          <dd className="font-mono text-xl leading-none text-acento-texto">
            {n.valor}
          </dd>
          <dt className="mt-2 text-xs leading-snug text-muted">{n.etiqueta}</dt>
        </div>
      ))}
    </dl>
  );
}

export function Bloque({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-14 rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
      {children}
    </div>
  );
}
