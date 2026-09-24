import Image from "next/image";
import { perfil } from "@/lib/content";
import { Diagrama, type TextosDiagrama } from "./Diagrama";

type Props = {
  etiqueta: string;
  titulo: string;
  detalle: string;
  diagrama: TextosDiagrama;
  ctaPrincipal: { href: string; texto: string };
  ctaSecundaria: { href: string; texto: string };
  ubicacion: string;
  altFoto: string;
};

/**
 * La apertura: texto a la izquierda, el diagrama del flujo a la derecha.
 *
 * Todo entra escalonado con animaciones CSS (`.entrada`), sin observer:
 * ya está en pantalla cuando carga. En mobile el diagrama va debajo del
 * texto y se escala solo, porque es un SVG con viewBox.
 */
export function Hero(p: Props) {
  const retraso = (s: number) => ({ "--retraso": `${s}s` }) as React.CSSProperties;

  return (
    <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
      <div>
        <div className="entrada flex items-center gap-4" style={retraso(0)}>
          {/*
            La versión chica de la foto (224px, WebP). Sin optimizador de
            imágenes en un export estático, `perfil.foto` serviría el PNG de
            500 KB para un círculo de 56px y se comería el LCP en móvil.
          */}
          <Image
            src={perfil.fotoChica}
            alt={p.altFoto}
            width={112}
            height={112}
            priority
            className="size-14 rounded-full object-cover ring-1 ring-line"
          />
          <div>
            <p className="etiqueta text-acento-texto">{p.etiqueta}</p>
            <p className="mt-1 font-mono text-xs text-muted">{p.ubicacion}</p>
          </div>
        </div>

        <h1
          className="display entrada mt-9 text-[2.9rem] sm:text-6xl lg:text-[4.1rem]"
          style={retraso(0.1)}
        >
          {p.titulo}
        </h1>

        <p
          className="entrada mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted"
          style={retraso(0.22)}
        >
          {p.detalle}
        </p>

        <div
          className="entrada mt-9 flex flex-wrap items-center gap-3"
          style={retraso(0.34)}
        >
          <a href={p.ctaPrincipal.href} className="boton">
            {p.ctaPrincipal.texto}
            <span aria-hidden="true">↓</span>
          </a>
          <a href={p.ctaSecundaria.href} className="boton-borde">
            {p.ctaSecundaria.texto}
          </a>
        </div>
      </div>

      <div className="entrada marco p-3 sm:p-5" style={retraso(0.3)}>
        <Diagrama textos={p.diagrama} />
      </div>
    </div>
  );
}
