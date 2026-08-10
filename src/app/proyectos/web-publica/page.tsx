import type { Metadata } from "next";
import { Captura } from "@/components/Captura";
import { Bloque, Codigo, H2, P, Titulo, Volver } from "@/components/Prosa";

export const metadata: Metadata = {
  title: "Migración de una web pública a Next.js",
  description:
    "Porté el sitio público de una empresa de PHP a Next.js con App Router sin perder el posicionamiento: convivencia de los dos sitios, estilos scopeados y URLs intactas.",
};

export default function WebPublica() {
  return (
    <article className="py-12">
      <Volver href="/#proyectos" texto="proyectos" />

      <Titulo
        meta="Caso de estudio · 2026"
        bajada="Migración del sitio público de Cambren SRL de PHP a Next.js, empezando por el catálogo de productos."
      >
        Migrar sin romper lo que ya estaba indexado
      </Titulo>

      <Captura
        chrome
        transicion="captura-web-publica"
        pendiente="Catálogo de productos"
        className="mt-12"
      />

      <H2>El problema no era el framework</H2>
      <P>
        El sitio público corría sobre PHP plano y funcionaba. Reescribirlo en
        Next.js es la parte fácil y la que cualquiera cuenta en un portfolio. La
        parte difícil es otra: ese sitio llevaba años indexado, y cada URL que
        cambiara de forma era tráfico que se perdía sin que nadie lo notara
        hasta el mes siguiente.
      </P>
      <P>
        Así que la restricción de diseño fue esa, y no la tecnología:{" "}
        <strong>las URLs públicas no se tocan</strong>. El usuario y Google
        tenían que ver exactamente las mismas direcciones antes y después.
      </P>

      <H2>Migrar de a pedazos, no de una</H2>
      <P>
        En vez de reescribir todo y cortar de golpe, migré por secciones y dejé
        los dos sitios conviviendo. Un prefijo de rutas define qué caminos ya
        atiende el proyecto nuevo; el resto sigue cayendo en el sitio viejo sin
        enterarse. La primera sección en cruzar fue el catálogo de productos,
        que es la que más visitas tenía y la que más ganaba con render en
        servidor.
      </P>
      <P>
        La ventaja de este orden es que cada sección se puede publicar y medir
        sola. Si algo sale mal, lo que se revierte es una ruta y no el sitio.
      </P>

      <H2>Estilos viejos que no se pisen con los nuevos</H2>
      <P>
        El CSS heredado era global y competía con Tailwind. La solución fue
        encerrarlo entero bajo una clase raíz —<Codigo>.cmb</Codigo>— para que
        cada regla vieja quedara limitada al marcado que la necesitaba. Sin eso,
        el primer componente nuevo aparece con márgenes que nadie escribió, y se
        termina peleando a fuerza de <Codigo>!important</Codigo>.
      </P>

      <H2>Qué me llevé</H2>
      <P>
        Que en una migración el trabajo interesante casi nunca está en el
        lenguaje nuevo. Está en lo que no se puede romper: las direcciones que
        alguien ya tiene guardadas, el HTML que un buscador ya leyó, el CSS que
        se escribió hace cinco años y sigue sosteniendo una página que factura.
      </P>

      <Bloque>
        <p>
          El sitio es de Cambren SRL y el repositorio es privado. Las capturas
          van con el catálogo real, que ya es público.
        </p>
      </Bloque>
    </article>
  );
}
