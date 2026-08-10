import { haceCuanto, leerGithub, type DatosGithub } from "@/lib/github";
import { perfil } from "@/lib/content";

/** Lado del cuadradito y separación, en unidades del viewBox del SVG. */
const LADO = 10;
const SEPARACION = 3;

/**
 * Mapa de calor del último año, dibujado con la data real del calendario.
 *
 * Es un SVG con viewBox y ancho 100%: escala solo en pantallas chicas sin
 * media queries ni scroll horizontal. La escala de color es relativa al día
 * más cargado del año, así que se ve igual de bien con 50 contribuciones que
 * con 5000.
 */
function MapaDeCalor({ datos }: { datos: DatosGithub }) {
  const paso = LADO + SEPARACION;
  const ancho = datos.semanas.length * paso - SEPARACION;
  const alto = 7 * paso - SEPARACION;

  /** 0 = sin actividad; 1..4 = cuartos del máximo del año. */
  const nivel = (n: number) => {
    if (n <= 0) return 0;
    const proporcion = n / Math.max(datos.maximo, 1);
    if (proporcion <= 0.25) return 1;
    if (proporcion <= 0.5) return 2;
    if (proporcion <= 0.75) return 3;
    return 4;
  };

  const opacidad = [0, 0.28, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${ancho} ${alto}`}
      className="mt-4 h-auto w-full text-acento"
      role="img"
      aria-label={`Mapa de actividad del último año: ${datos.contribuciones} contribuciones repartidas en ${datos.diasActivos} días.`}
    >
      {datos.semanas.map((semana, x) =>
        semana.map((cuenta, y) => {
          const n = nivel(cuenta);
          return (
            <rect
              key={`${x}-${y}`}
              x={x * paso}
              y={y * paso}
              width={LADO}
              height={LADO}
              rx={2}
              fill={n === 0 ? "var(--line)" : "currentColor"}
              opacity={n === 0 ? 1 : opacidad[n]}
            />
          );
        }),
      )}
    </svg>
  );
}

/**
 * Tira de actividad leída de GitHub durante el build.
 *
 * Si la API no contestó —o no hay token— no se dibuja nada.
 */
export async function ActividadGithub() {
  const datos = await leerGithub();
  if (!datos) return null;

  const numero = (n: number) => n.toLocaleString("es-AR");

  const metricas = [
    {
      valor: numero(datos.contribuciones),
      etiqueta: "contribuciones en el último año",
    },
    { valor: numero(datos.ultimos30), etiqueta: "en los últimos 30 días" },
    datos.ultimoDia
      ? { valor: haceCuanto(datos.ultimoDia), etiqueta: "último commit" }
      : null,
  ].filter((m): m is { valor: string; etiqueta: string } => m !== null);

  const fecha = new Date(datos.actualizado).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  return (
    <section aria-labelledby="gh" className="mt-8">
      <div className="rounded-xl border border-line bg-surface px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="gh"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-acento-texto"
          >
            En GitHub
          </h2>
          <a
            href={perfil.github}
            target="_blank"
            rel="noreferrer"
            className="link-sutil font-mono text-[11px] text-muted"
          >
            @{perfil.usuarioGithub}
          </a>
        </div>

        <dl className="mt-3.5 flex flex-wrap gap-x-8 gap-y-3">
          {metricas.map((m) => (
            <div key={m.etiqueta}>
              <dd className="font-mono text-lg leading-none">{m.valor}</dd>
              <dt className="mt-1.5 text-xs text-muted">{m.etiqueta}</dt>
            </div>
          ))}
        </dl>

        <MapaDeCalor datos={datos} />

        {/*
          Cuando el workflow diario esté activo (necesita el scope `workflow`
          en el token), esta línea vuelve a decir "una vez por día".
        */}
        <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] leading-relaxed text-muted">
          Leído de la API de GitHub el {fecha}, incluyendo repositorios
          privados. Este bloque no lo actualizo a mano: se relee solo cada vez
          que publico el sitio.
        </p>
      </div>
    </section>
  );
}
