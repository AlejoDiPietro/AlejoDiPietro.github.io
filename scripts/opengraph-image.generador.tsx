import { ImageResponse } from "next/og";

/**
 * FUENTE de src/app/opengraph-image.png. Este archivo NO corre en el build.
 *
 * Para regenerar la imagen despues de cambiar el texto:
 *   1. cp scripts/opengraph-image.generador.tsx src/app/opengraph-image.tsx
 *   2. npm run build
 *   3. cp out/opengraph-image src/app/opengraph-image.png
 *   4. rm src/app/opengraph-image.tsx
 *
 * Por que el rodeo, en lugar de dejar la ruta generandola en cada build:
 * GitHub Pages decide el Content-Type por la extension del archivo, y la ruta
 * de Next emite un archivo sin extension (`/opengraph-image`). Servido como
 * octet-stream, LinkedIn y Twitter descartan la imagen y vuelve el rectangulo
 * gris. Un .png de verdad en src/app/ no tiene ese problema.
 *
 * ---
 *
 * Imagen que se ve cuando alguien pega el link en LinkedIn, WhatsApp o Slack.
 *
 * Se genera una sola vez durante `next build` y queda como PNG estatico, asi
 * que funciona igual sobre GitHub Pages. Sin esto, cada vez que se comparte el
 * sitio aparece un rectangulo gris: es el primer contacto y conviene que no lo
 * sea.
 *
 * No carga tipografias propias a proposito: bajar un .ttf durante el build es
 * una dependencia de red mas que puede fallar, y para dos lineas de texto la
 * fuente por defecto alcanza.
 */

export const alt = "Alejo Di Pietro — Desarrollador Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Con `output: export` no hay servidor que genere la imagen a pedido: hay que
 * decir explicitamente que se resuelve en build y queda como archivo.
 */
export const dynamic = "force-static";

const TINTA = "#ebe9e4";
const FONDO = "#0c0c0b";
const COBRE = "#dd8f4f";
const APAGADO = "#918d85";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: FONDO,
          color: TINTA,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: COBRE,
            }}
          />
          <div style={{ fontSize: 26, color: APAGADO, letterSpacing: 4 }}>
            ALEJO DI PIETRO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/*
            Satori exige display:flex en cualquier div con mas de un hijo, y no
            entiende <br/>. Por eso cada renglon es su propio div.
          */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            <div>Escribo software que se</div>
            <div>usa todos los días.</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 30,
              color: APAGADO,
              lineHeight: 1.4,
            }}
          >
            <div>Analista de Sistemas · Diseñé y puse en producción</div>
            <div>el ERP que corre una empresa entera.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262523",
            paddingTop: 28,
            fontSize: 24,
            color: APAGADO,
          }}
        >
          <div style={{ display: "flex" }}>alejodipietro.github.io</div>
          <div style={{ display: "flex", color: COBRE }}>
            Next.js · TypeScript · PostgreSQL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
