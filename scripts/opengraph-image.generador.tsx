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
 * Es el hero en miniatura: la frase, y a la derecha el flujo (entra → sistema
 * → sale) con las mismas formas que el sitio, el marco con esquinas incluido.
 *
 * No carga tipografias propias a proposito: bajar un .ttf durante el build es
 * una dependencia de red mas que puede fallar, y para dos lineas de texto la
 * fuente por defecto alcanza.
 */

export const alt = "Alejo Di Pietro — Líder de Sistemas y Datos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Con `output: export` no hay servidor que genere la imagen a pedido: hay que
 * decir explicitamente que se resuelve en build y queda como archivo.
 */
export const dynamic = "force-static";

const TINTA = "#ecebe6";
const FONDO = "#121211";
const SUPERFICIE = "#191917";
const LINEA = "#2a2926";
const AMBAR = "#f0a33b";
const APAGADO = "#9a968d";

/** Caja del diagrama. Satori exige display:flex en todo div con hijos. */
function Caja({ texto, ancho = 150 }: { texto: string; ancho?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: ancho,
        height: 40,
        padding: "0 14px",
        border: `1px solid ${LINEA}`,
        borderRadius: 6,
        background: SUPERFICIE,
        color: TINTA,
        fontSize: 15,
      }}
    >
      {texto}
    </div>
  );
}

function Cable({ ancho = 36 }: { ancho?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: ancho,
        height: 2,
        background: LINEA,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: AMBAR,
          marginLeft: ancho / 2 - 3,
        }}
      />
    </div>
  );
}

export default function Image() {
  const entradas = ["Ventas", "Stock", "Compras", "Finanzas"];
  const salidas = ["Resultados", "Rentabilidad", "Decisiones"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: FONDO,
          backgroundImage: `radial-gradient(${LINEA} 1px, transparent 1.2px)`,
          backgroundSize: "26px 26px",
          color: TINTA,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ width: 10, height: 10, borderRadius: 999, background: AMBAR }}
          />
          <div style={{ fontSize: 22, color: APAGADO, letterSpacing: 5 }}>
            ALEJO DI PIETRO · LÍDER DE SISTEMAS Y DATOS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 58,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              width: 520,
              flexShrink: 0,
            }}
          >
            <div>Construyo sistemas</div>
            <div>y uso sus datos</div>
            <div>para decidir.</div>
          </div>

          {/* El flujo, dentro del marco con esquinas. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "26px 24px",
              border: `1px solid ${LINEA}`,
              background: SUPERFICIE,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {entradas.map((t) => (
                <Caja key={t} texto={t} ancho={124} />
              ))}
            </div>
            <Cable />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 118,
                height: 96,
                border: `1.5px solid ${AMBAR}`,
                borderRadius: 10,
                background: "#241d12",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 600 }}>SGC</div>
              <div style={{ fontSize: 11, color: APAGADO, marginTop: 4 }}>
                6 módulos
              </div>
            </div>
            <Cable />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {salidas.map((t) => (
                <Caja key={t} texto={t} ancho={140} />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINEA}`,
            paddingTop: 26,
            fontSize: 22,
            color: APAGADO,
          }}
        >
          <div style={{ display: "flex" }}>alejodipietro.github.io</div>
          <div style={{ display: "flex", color: AMBAR }}>
            TypeScript · Next.js · PostgreSQL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
