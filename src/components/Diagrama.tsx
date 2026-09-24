/**
 * El diagrama del hero: lo que entra, el sistema, lo que sale.
 *
 * Es la frase del sitio dibujada. A la izquierda las fuentes de datos de la
 * empresa, en el medio el sistema que las junta, a la derecha lo que la
 * dirección obtiene. Los cables se dibujan al cargar, y por cada uno viaja
 * un punto en loop: datos circulando por un sistema que está andando.
 *
 * Todo el movimiento es CSS y <animateMotion>: nada corre en JavaScript, y
 * con prefers-reduced-motion los puntos desaparecen y los cables ya están.
 */

export type TextosDiagrama = {
  entradas: string[];
  nucleo: string;
  nucleoDetalle: string;
  salidas: string[];
  rotuloEntrada: string;
  rotuloSalida: string;
};

export const DIAGRAMA_ES: TextosDiagrama = {
  entradas: ["Ventas", "Stock", "Compras", "Finanzas", "Facturación ARCA"],
  nucleo: "SGC",
  nucleoDetalle: "6 módulos · 127 entidades",
  salidas: ["Estados de resultados", "Rentabilidad", "Decisiones"],
  rotuloEntrada: "entra",
  rotuloSalida: "sale",
};

export const DIAGRAMA_EN: TextosDiagrama = {
  entradas: ["Sales", "Inventory", "Purchasing", "Finance", "E-invoicing"],
  nucleo: "SGC",
  nucleoDetalle: "6 modules · 127 entities",
  salidas: ["Income statements", "Profitability", "Decisions"],
  rotuloEntrada: "in",
  rotuloSalida: "out",
};

const ANCHO = 560;
const ALTO = 360;
const CAJA_W = 132;
const CAJA_H = 38;
const X_ENTRADA = 18;
const X_SALIDA = ANCHO - CAJA_W - 18;
/* Ancho suficiente para "6 módulos · 127 entidades" en mono de 8.5px. */
const NUCLEO = { x: 200, y: 128, w: 160, h: 104 };

/** Cable de una caja (borde derecho) al núcleo (borde izquierdo), o al revés. */
function cable(x1: number, y1: number, x2: number, y2: number) {
  const c = (x2 - x1) * 0.55;
  return `M${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
}

/** Reparte n cajas verticalmente, centradas en el alto del diagrama. */
function filas(n: number) {
  const paso = 58;
  const inicio = ALTO / 2 - ((n - 1) * paso) / 2;
  return Array.from({ length: n }, (_, i) => inicio + i * paso);
}

export function Diagrama({ textos }: { textos: TextosDiagrama }) {
  const yEntradas = filas(textos.entradas.length);
  const ySalidas = filas(textos.salidas.length);
  const yNucleo = NUCLEO.y + NUCLEO.h / 2;

  const cablesEntrada = yEntradas.map((y, i) => ({
    id: `ce${i}`,
    d: cable(X_ENTRADA + CAJA_W, y, NUCLEO.x, yNucleo - 24 + i * 12),
  }));
  const cablesSalida = ySalidas.map((y, i) => ({
    id: `cs${i}`,
    d: cable(NUCLEO.x + NUCLEO.w, yNucleo - 16 + i * 16, X_SALIDA, y),
  }));

  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${textos.entradas.join(", ")} → ${textos.nucleo} → ${textos.salidas.join(", ")}`}
    >
      <defs>
        {[...cablesEntrada, ...cablesSalida].map((c) => (
          <path key={c.id} id={c.id} d={c.d} />
        ))}
      </defs>

      {/* Rótulos de columna. */}
      <text
        x={X_ENTRADA}
        y={yEntradas[0] - CAJA_H / 2 - 12}
        className="fill-muted font-mono text-[10px] uppercase"
        style={{ letterSpacing: "0.16em" }}
      >
        {textos.rotuloEntrada}
      </text>
      <text
        x={X_SALIDA}
        y={ySalidas[0] - CAJA_H / 2 - 12}
        className="fill-muted font-mono text-[10px] uppercase"
        style={{ letterSpacing: "0.16em" }}
      >
        {textos.rotuloSalida}
      </text>

      {/* Cables, con su punto viajando. */}
      {[...cablesEntrada, ...cablesSalida].map((c, i) => (
        <g key={c.id}>
          <use
            href={`#${c.id}`}
            className="cable"
            style={{ "--retraso": `${0.15 + i * 0.12}s` } as React.CSSProperties}
          />
          <circle r={2.6} className="punto">
            <animateMotion
              dur={`${3.2 + (i % 4) * 0.6}s`}
              begin={`${-i * 0.9}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#${c.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Entradas. */}
      {textos.entradas.map((t, i) => (
        <g
          key={t}
          className="caja"
          style={{ "--retraso": `${0.4 + i * 0.08}s` } as React.CSSProperties}
        >
          <rect
            x={X_ENTRADA}
            y={yEntradas[i] - CAJA_H / 2}
            width={CAJA_W}
            height={CAJA_H}
            rx={6}
            className="fill-surface stroke-line"
          />
          <text
            x={X_ENTRADA + 14}
            y={yEntradas[i] + 4}
            className="fill-foreground text-[12.5px]"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Núcleo. */}
      <g className="caja" style={{ "--retraso": "0.9s" } as React.CSSProperties}>
        <rect
          x={NUCLEO.x}
          y={NUCLEO.y}
          width={NUCLEO.w}
          height={NUCLEO.h}
          rx={10}
          className="fill-surface stroke-acento"
          strokeWidth={1.5}
        />
        <rect
          x={NUCLEO.x + 8}
          y={NUCLEO.y + 8}
          width={NUCLEO.w - 16}
          height={NUCLEO.h - 16}
          rx={6}
          className="nucleo fill-acento-suave"
        />
        <text
          x={NUCLEO.x + NUCLEO.w / 2}
          y={NUCLEO.y + 52}
          textAnchor="middle"
          className="fill-foreground font-mono text-[22px] font-medium"
        >
          {textos.nucleo}
        </text>
        <text
          x={NUCLEO.x + NUCLEO.w / 2}
          y={NUCLEO.y + 74}
          textAnchor="middle"
          className="fill-muted font-mono text-[8.5px]"
        >
          {textos.nucleoDetalle}
        </text>
      </g>

      {/* Salidas. */}
      {textos.salidas.map((t, i) => (
        <g
          key={t}
          className="caja"
          style={{ "--retraso": `${1.2 + i * 0.1}s` } as React.CSSProperties}
        >
          <rect
            x={X_SALIDA}
            y={ySalidas[i] - CAJA_H / 2}
            width={CAJA_W}
            height={CAJA_H}
            rx={6}
            className="fill-surface stroke-line"
          />
          <text
            x={X_SALIDA + 14}
            y={ySalidas[i] + 4}
            className="fill-foreground text-[12.5px]"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}
