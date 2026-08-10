import Link from "next/link";
import { experiencia, perfil, proyectos, stack } from "@/lib/content";

function Seccion({
  id,
  titulo,
  children,
}: {
  id: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-line py-12">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="py-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {perfil.nombre}
        </h1>
        <p className="mt-3 text-lg text-muted">
          {perfil.titulo} · {perfil.stackPrincipal}
        </p>

        <p className="mt-8 leading-relaxed">{perfil.presentacion}</p>
        <p className="mt-4 leading-relaxed text-muted">{perfil.buscando}</p>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href={`mailto:${perfil.email}`}
            className="underline decoration-line underline-offset-4 hover:decoration-foreground"
          >
            Escribime
          </a>
          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
          <a
            href={perfil.github}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line underline-offset-4 hover:decoration-foreground"
          >
            GitHub
          </a>
          <a
            href={perfil.cv}
            className="underline decoration-line underline-offset-4 hover:decoration-foreground"
          >
            Descargar CV
          </a>
        </div>
      </section>

      <Seccion id="proyectos" titulo="Proyectos">
        <ul className="space-y-8">
          {proyectos.map((p) => {
            const externo = p.href.startsWith("http");
            const enlace =
              "underline decoration-line underline-offset-4 hover:decoration-foreground";
            return (
              <li key={p.slug}>
                <h3 className="text-lg font-medium">
                  {externo ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className={enlace}
                    >
                      {p.nombre}
                    </a>
                  ) : (
                    <Link href={p.href} className={enlace}>
                      {p.nombre}
                    </Link>
                  )}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{p.resumen}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Seccion>

      <Seccion id="experiencia" titulo="Experiencia">
        <ol className="space-y-8">
          {experiencia.map((e) => (
            <li key={`${e.puesto}-${e.periodo}`}>
              <h3 className="font-medium">{e.puesto}</h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {e.empresa} · {e.periodo}
              </p>
              <p className="mt-2 leading-relaxed text-muted">{e.descripcion}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      <Seccion id="stack" titulo="Stack">
        <dl className="space-y-5">
          {stack.map((g) => (
            <div key={g.area} className="sm:flex sm:gap-6">
              <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted sm:w-44 sm:pt-1">
                {g.area}
              </dt>
              <dd className="mt-1 sm:mt-0">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Seccion>

      <Seccion id="formacion" titulo="Formación">
        <p className="leading-relaxed">
          <strong className="font-medium">Analista de Sistemas</strong> —
          Universidad del Salvador (2023–2026, graduado).
        </p>
        <p className="mt-2 leading-relaxed">
          <strong className="font-medium">Ingeniería en Informática</strong> —
          Universidad del Salvador (2023–2027, en curso).
        </p>
        <p className="mt-2 leading-relaxed text-muted">
          Certificado Profesional de Ciberseguridad — Google. Inglés avanzado.
        </p>
      </Seccion>
    </>
  );
}
