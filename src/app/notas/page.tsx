import type { Metadata } from "next";
import Link from "next/link";
import { Revelar } from "@/components/Revelar";
import { Titulo } from "@/components/Prosa";
import { notas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notas",
  description:
    "Notas técnicas sobre decisiones que tomé en sistemas que están en producción: control de acceso, integraciones fiscales, migraciones.",
};

export default function Notas() {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <Titulo bajada="Cosas que decidí en sistemas que hoy usa gente, contadas con el razonamiento y no solo con el resultado. Escribo cuando algo me costó entenderlo.">
        Notas
      </Titulo>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {notas.map((n, i) => (
          <li key={n.slug}>
            <Revelar delay={i * 70}>
              <Link href={`/notas/${n.slug}`} className="group block py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-medium">
                    {n.titulo}
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block text-acento-texto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </h2>
                  <span className="shrink-0 font-mono text-[11px] text-muted">
                    {n.minutos} min
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{n.resumen}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">
                  {n.fechaTexto}
                </p>
              </Link>
            </Revelar>
          </li>
        ))}
      </ul>
    </div>
  );
}
