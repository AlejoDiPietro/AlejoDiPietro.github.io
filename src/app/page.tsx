import Image from "next/image";
import Link from "next/link";
import { ActividadGithub } from "@/components/ActividadGithub";
import { Contador } from "@/components/Contador";
import { Proyectos } from "@/components/Proyectos";
import { Revelar } from "@/components/Revelar";
import {
  experiencia,
  formacion,
  notas,
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
    <section id={id} className="scroll-mt-20 py-12">
      <Revelar>
        <h2 className="mb-7 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-acento-texto">
          {titulo}
          <span aria-hidden="true" className="regla-acento h-px flex-1" />
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
      <section className="py-14 sm:py-20">
        <Revelar>
          {/*
            La foto va en su propia fila y no al costado del título.
            Compartiendo el ancho, cualquier tamaño que se le diera se lo
            sacaba al titular; sola, puede ser grande sin apretar nada.
          */}
          <Image
            src={perfil.foto}
            alt={`Foto de ${perfil.nombre}`}
            width={320}
            height={320}
            priority
            className="size-32 rounded-full object-cover ring-1 ring-line sm:size-40"
          />

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-acento-texto">
            {perfil.saludo} · {perfil.ubicacion}
          </p>
          <h1 className="display mt-5 text-[2.75rem] sm:text-6xl">
            {perfil.hero}
          </h1>

          <p className="mt-7 max-w-xl leading-relaxed text-muted">
            {perfil.heroDetalle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`mailto:${perfil.email}`}
              className="rounded-full bg-acento px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-85"
            >
              Escribime
            </a>
            <a href={perfil.cv} className="link-sutil">
              CV (ES)
            </a>
            <a href={perfil.cvIngles} className="link-sutil">
              Resume (EN)
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-sutil"
            >
              LinkedIn
            </a>
          </div>
        </Revelar>
      </section>

      {/* Numeros de impacto */}
      <ul className="grid grid-cols-2 gap-x-8 gap-y-7 border-y border-line py-7 sm:grid-cols-4">
        {numeros.map((n, i) => (
          <li key={n.etiqueta}>
            <Revelar delay={i * 70}>
              <p className="font-mono text-2xl leading-none text-acento-texto">
                <Contador
                  valor={n.valor}
                  prefijo={"prefijo" in n ? n.prefijo : ""}
                  sufijo={n.sufijo}
                />
              </p>
              <p className="mt-2.5 text-xs leading-snug text-muted">
                {n.etiqueta}
              </p>
            </Revelar>
          </li>
        ))}
      </ul>

      <ActividadGithub />

      <Seccion id="proyectos" titulo="Proyectos">
        <Proyectos />
      </Seccion>

      <Seccion id="notas" titulo="Notas">
        <ul className="divide-y divide-line border-y border-line">
          {notas.map((n, i) => (
            <li key={n.slug}>
              <Revelar delay={i * 70}>
                <Link
                  href={`/notas/${n.slug}`}
                  className="group block py-5 transition-opacity hover:opacity-90"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium">
                      {n.titulo}
                      <span
                        aria-hidden="true"
                        className="ml-1.5 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </h3>
                    <span className="shrink-0 font-mono text-[11px] text-muted">
                      {n.minutos} min
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {n.resumen}
                  </p>
                </Link>
              </Revelar>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="sobre-mi" titulo="Sobre mí">
        <div className="space-y-4">
          {sobreMi.map((parrafo, i) => (
            <Revelar key={i} delay={i * 80}>
              <p className="leading-relaxed">{parrafo}</p>
            </Revelar>
          ))}
        </div>
      </Seccion>

      <Seccion id="stack" titulo="Stack">
        <dl className="space-y-5">
          {stack.map((g, i) => (
            <Revelar key={g.area} delay={i * 60}>
              <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-0.5">
                  {g.area}
                </dt>
                <dd className="text-sm leading-relaxed">{g.items.join(" · ")}</dd>
              </div>
            </Revelar>
          ))}
        </dl>
      </Seccion>

      <Seccion id="experiencia" titulo="Experiencia">
        {experiencia.map((e) => (
          <div key={e.empresa}>
            <Revelar>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium">{e.empresa}</h3>
                <span className="font-mono text-[11px] text-muted">
                  {e.periodo}
                </span>
              </div>
            </Revelar>

            {/* La línea vertical es la progresión: se entra abajo y se sube. */}
            <ol className="mt-6 space-y-7 border-l border-line pl-6">
              {e.puestos.map((p, i) => (
                <li key={p.periodo} className="relative">
                  <Revelar delay={i * 60}>
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[calc(1.5rem+4px)] top-1.5 size-[7px] rounded-full ${
                        i === 0 ? "bg-acento" : "bg-line"
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-medium">{p.puesto}</h4>
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
      </Seccion>

      <Seccion id="formacion" titulo="Formación">
        <ul className="space-y-4">
          {formacion.map((f, i) => (
            <li key={f.titulo}>
              <Revelar delay={i * 60}>
                <p className="font-medium">{f.titulo}</p>
                <p className="mt-1 font-mono text-xs text-muted">{f.detalle}</p>
              </Revelar>
            </li>
          ))}
        </ul>
      </Seccion>
    </>
  );
}
