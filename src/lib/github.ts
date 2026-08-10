import { perfil } from "./content";

/**
 * Datos de GitHub, leidos en tiempo de build.
 *
 * Va por GraphQL y no por la API REST a proposito. REST solo sabe de los repos
 * publicos que son mios, y ahi no esta el trabajo: los commits del ERP viven en
 * el repo de otra cuenta y buena parte del resto es privado. Contado asi daban
 * 2 repos y 4 deploys, que es un retrato falso. `contributionsCollection` mira
 * la contribucion, no el repositorio, e incluye lo privado y lo ajeno.
 *
 * El sitio es un export estatico: no hay servidor que consulte la API cuando
 * alguien entra. Los numeros se resuelven durante `next build` y quedan en el
 * HTML; el workflow de .github/workflows/deploy.yml reconstruye una vez por dia
 * para que "al dia" sea cierto.
 *
 * Regla de oro: esto NUNCA debe romper el build. Sin token o sin respuesta, la
 * seccion sencillamente no se dibuja.
 */

const USUARIO = perfil.usuarioGithub;

export type DatosGithub = {
  /** Contribuciones en los ultimos 12 meses, publicas y privadas. */
  contribuciones: number;
  /** Contribuciones en los ultimos 30 dias. */
  ultimos30: number;
  /** Dias del ano con al menos una contribucion. */
  diasActivos: number;
  /** Fecha (YYYY-MM-DD) del ultimo dia con actividad. */
  ultimoDia: string | null;
  /** El calendario, semana por semana. Cada numero es un dia. */
  semanas: number[][];
  /** El dia mas cargado del ano: fija la escala del mapa de calor. */
  maximo: number;
  /** Cuando se leyeron estos numeros. */
  actualizado: string;
};

const CONSULTA = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

type Respuesta = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    };
  };
};

export async function leerGithub(): Promise<DatosGithub | null> {
  /*
   * GraphQL siempre pide token, incluso para datos publicos.
   *
   * Cual importa: el GITHUB_TOKEN que da Actions esta limitado a este repo y
   * devuelve solo lo publico. Para que el numero incluya lo privado hace falta
   * un token personal del propio usuario, guardado como secreto (ver el
   * workflow). Sin ninguno de los dos, no se dibuja nada.
   */
  const token = process.env.GH_CONTRIBUCIONES_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) return null;

  let json: Respuesta;
  try {
    const r = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // GitHub rechaza pedidos sin User-Agent.
        "User-Agent": "alejodipietro.github.io",
      },
      body: JSON.stringify({ query: CONSULTA, variables: { login: USUARIO } }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) return null;
    json = (await r.json()) as Respuesta;
  } catch {
    return null;
  }

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal || !Array.isArray(cal.weeks) || cal.weeks.length === 0) return null;

  const dias = cal.weeks.flatMap((s) => s.contributionDays);
  if (dias.length === 0) return null;

  // Ultimos 30 dias contados sobre el propio calendario, que ya viene ordenado:
  // usar la fecha de hoy abriria la puerta a desfasajes de huso horario.
  const ultimos30 = dias.slice(-30).reduce((a, d) => a + d.contributionCount, 0);

  const activos = dias.filter((d) => d.contributionCount > 0);

  return {
    contribuciones: cal.totalContributions,
    ultimos30,
    diasActivos: activos.length,
    ultimoDia: activos.length ? activos[activos.length - 1].date : null,
    semanas: cal.weeks.map((s) => s.contributionDays.map((d) => d.contributionCount)),
    maximo: Math.max(...dias.map((d) => d.contributionCount)),
    actualizado: new Date().toISOString(),
  };
}

/** "hace 3 días", "hoy". Se calcula en build, igual que el resto. */
export function haceCuanto(fecha: string, ahora = new Date()): string {
  // Las fechas del calendario son YYYY-MM-DD; se comparan a mediodia UTC para
  // que un cambio de huso no corra el resultado un dia entero.
  const dias = Math.floor(
    (ahora.getTime() - new Date(`${fecha}T12:00:00Z`).getTime()) / 86_400_000,
  );
  if (dias <= 0) return "hoy";
  if (dias === 1) return "ayer";
  if (dias < 30) return `hace ${dias} días`;
  const meses = Math.floor(dias / 30);
  return meses === 1 ? "hace un mes" : `hace ${meses} meses`;
}
