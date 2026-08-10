import Image from "next/image";
import { Contador } from "@/components/Contador";
import { Proyectos } from "@/components/Proyectos";
import { Revelar } from "@/components/Revelar";
import {
  experiencia,
  numeros,
  perfil,
  sobreMi,
  stack,
} from "@/lib/content";

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
    <section id={id} className="scroll-mt-20 py-14">
      <Revelar>
        <h2 className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="h-px w-6 bg-gradient-to-r from-acento to-acento-2" />
          {titulo}
        </h2>
      </Revelar>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-14 sm:py-20">
        {/* Resplandor de fondo. aria-hidden: es decoración pura. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-acento/20 to-acento-2/20 blur-3xl"
        />

        <Revelar>
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-sm text-acento-texto">
                {perfil.saludo}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                <span className="degradado-texto">{perfil.hero}</span>
              </h1>
            </div>

            <Image
              src={perfil.foto}
              alt=""
              width={112}
              height={112}
              priority
              className="size-24 shrink-0 rounded-2xl object-cover ring-1 ring-line sm:size-28"
            />
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            {perfil.heroDetalle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${perfil.email}`}
              className="rounded-full bg-gradient-to-r from-acento to-acento-2 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Escribime
            </a>
            <a
              href={perfil.cv}
              className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-acento hover:text-acento-texto"
            >
              Descargar CV
            </a>
            <a
              href={perfil.cvIngles}
              className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-acento hover:text-acento-texto"
            >
              Resume (EN)
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-acento-texto"
            >
              LinkedIn
            </a>
          </div>
        </Revelar>
      </section>

      {/* Números */}
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {numeros.map((n, i) => (
          <li key={n.etiqueta} className="bg-surface px-5 py-6">
            <Revelar delay={i * 80}>
              <p className="degradado-texto font-mono text-3xl font-bold">
                <Contador
                  valor={n.valor}
                  prefijo={"prefijo" in n ? n.prefijo : ""}
                  sufijo={n.sufijo}
                />
              </p>
              <p className="mt-2 text-xs leading-snug text-muted">
                {n.etiqueta}
              </p>
            </Revelar>
          </li>
        ))}
      </ul>

      <Seccion id="proyectos" titulo="Proyectos">
        <Proyectos />
      </Seccion>

      <Seccion id="sobre-mi" titulo="Sobre mí">
        <div className="space-y-4">
          {sobreMi.map((parrafo, i) => (
            <Revelar key={i} delay={i * 90}>
              <p className="leading-relaxed">{parrafo}</p>
            </Revelar>
          ))}
        </div>
      </Seccion>

      <Seccion id="stack" titulo="Stack">
        <div className="grid gap-4 sm:grid-cols-2">
          {stack.map((g, i) => (
            <Revelar key={g.area} delay={i * 70}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-acento-texto">
                  {g.area}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="rounded-lg border border-line px-2.5 py-1 text-sm text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Revelar>
          ))}
        </div>
      </Seccion>

      <Seccion id="experiencia" titulo="Experiencia">
        <ol className="relative space-y-8 border-l border-line pl-6">
          {experiencia.map((e, i) => (
            <li key={`${e.puesto}-${e.periodo}`}>
              <Revelar delay={i * 70}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-gradient-to-br from-acento to-acento-2"
                />
                <h3 className="font-medium">{e.puesto}</h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {e.empresa} · {e.periodo}
                </p>
                <p className="mt-2 leading-relaxed text-muted">
                  {e.descripcion}
                </p>
              </Revelar>
            </li>
          ))}
        </ol>
      </Seccion>

      <Seccion id="formacion" titulo="Formación">
        <Revelar>
          <div className="space-y-3">
            <p className="leading-relaxed">
              <strong className="font-medium">Analista de Sistemas</strong>{" "}
              <span className="text-muted">
                — Universidad del Salvador (2023–2026, graduado)
              </span>
            </p>
            <p className="leading-relaxed">
              <strong className="font-medium">
                Ingeniería en Informática
              </strong>{" "}
              <span className="text-muted">
                — Universidad del Salvador (2023–2027, en curso)
              </span>
            </p>
            <p className="leading-relaxed text-muted">
              Certificado Profesional de Ciberseguridad — Google · Inglés
              avanzado
            </p>
          </div>
        </Revelar>
      </Seccion>
    </>
  );
}
