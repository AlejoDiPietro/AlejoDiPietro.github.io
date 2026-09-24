import Link from "next/link";
import { ActividadGithub } from "@/components/ActividadGithub";
import { DIAGRAMA_ES } from "@/components/Diagrama";
import { Espinazo } from "@/components/Espinazo";
import { Etapa } from "@/components/Etapa";
import { Experiencia } from "@/components/Experiencia";
import { Hero } from "@/components/Hero";
import { Numeros } from "@/components/Numeros";
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

/*
  La home es un flujo: arriba el hero con el diagrama (lo que entra, el
  sistema, lo que sale) y desde ahí un espinazo baja por la izquierda
  atravesando cada etapa. Las etapas son las secciones de siempre, numeradas,
  y cada una tiene su nodo que se enciende al pasar.
*/
export default function Home() {
  return (
    <>
      <Hero
        etiqueta={`${perfil.nombre} · ${perfil.titulo}`}
        ubicacion={perfil.ubicacion}
        altFoto={`Foto de ${perfil.nombre}`}
        titulo={perfil.hero}
        detalle={perfil.heroDetalle}
        diagrama={DIAGRAMA_ES}
        ctaPrincipal={{ href: "#proyectos", texto: "Ver el trabajo" }}
        ctaSecundaria={{ href: `mailto:${perfil.email}`, texto: "Escribime" }}
      />

      <div className="flujo">
        <Espinazo />

        <Numeros items={numeros} />

        <ActividadGithub />

        <Etapa id="proyectos" indice="01" titulo="Proyectos">
          <Proyectos />
        </Etapa>

        <Etapa id="notas" indice="02" titulo="Notas">
          <ul className="grid gap-5 lg:grid-cols-2">
            {notas.map((n, i) => (
              <li key={n.slug} className="flex">
                <Revelar delay={i * 70} className="flex w-full">
                  <Link
                    href={`/notas/${n.slug}`}
                    className="marco marco-hover group flex w-full flex-col p-6"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="etiqueta text-muted">{n.fechaTexto}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted">
                        {n.minutos} min
                      </span>
                    </div>
                    <h3 className="display mt-4 text-2xl">
                      {n.titulo}
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {n.resumen}
                    </p>
                  </Link>
                </Revelar>
              </li>
            ))}
          </ul>
        </Etapa>

        <Etapa id="sobre-mi" indice="03" titulo="Sobre mí">
          <div className="max-w-2xl space-y-5 text-[1.02rem] leading-relaxed">
            {sobreMi.map((parrafo, i) => (
              <Revelar key={i} delay={i * 80}>
                <p>{parrafo}</p>
              </Revelar>
            ))}
          </div>
        </Etapa>

        <Etapa id="stack" indice="04" titulo="Stack">
          <dl className="marco divide-y divide-line">
            {stack.map((g, i) => (
              <Revelar key={g.area} delay={i * 60}>
                <div className="grid gap-3 px-5 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:px-6">
                  <dt className="etiqueta pt-1.5 text-muted">{g.area}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </Revelar>
            ))}
          </dl>
        </Etapa>

        <Etapa id="experiencia" indice="05" titulo="Experiencia">
          <Experiencia items={experiencia} />
        </Etapa>

        <Etapa id="formacion" indice="06" titulo="Formación">
          <ul className="marco divide-y divide-line">
            {formacion.map((f, i) => (
              <li key={f.titulo}>
                <Revelar delay={i * 60}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-5 sm:px-6">
                    <p className="font-medium">{f.titulo}</p>
                    <p className="font-mono text-xs text-muted">{f.detalle}</p>
                  </div>
                </Revelar>
              </li>
            ))}
          </ul>
        </Etapa>
      </div>
    </>
  );
}
