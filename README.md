# alejodipietro.github.io

Mi sitio personal: presentación, casos de estudio de sistemas que están en
producción, y notas técnicas.

**En vivo:** https://alejodipietro.github.io

## Stack

- **Next.js 16** (App Router) con export estático
- **TypeScript**
- **Tailwind CSS 4**
- Sin dependencias de runtime más allá de React: el sitio se sirve como HTML
  plano desde GitHub Pages.

## Cómo está organizado

```
src/
├── lib/content.ts              → todo el contenido (perfil, proyectos, notas…)
├── lib/github.ts               → datos de GitHub leídos en build
├── components/                 → Captura, Prosa, Proyectos, ActividadGithub…
├── app/layout.tsx              → estructura, metadata, JSON-LD y tipografías
├── app/page.tsx                → home
├── app/en/                     → versión en inglés (una sola página)
├── app/notas/                  → índice + notas técnicas
├── app/proyectos/sgc/          → caso de estudio del ERP
├── app/proyectos/web-publica/  → caso de estudio de la migración
└── app/opengraph-image.png     → imagen de preview al compartir el link
```

El contenido vive separado de la maqueta a propósito: para actualizar un puesto
o sumar un proyecto se edita `content.ts` y no hay que tocar los componentes.

## Capturas de los proyectos

Las capturas van en `public/capturas/` y se enganchan desde `content.ts`:

```ts
{
  slug: "sgc",
  captura: "/capturas/sgc-home.png",
  capturaAlt: "Pantalla principal del SGC",
  // capturaPendiente ya no hace falta
}
```

Mientras un proyecto no tenga `captura`, el componente `<Captura>` dibuja un
marco con la leyenda de `capturaPendiente`. El hueco se ve deliberado en lugar
de roto, y el día que aparezca el archivo no hay que tocar maquetado.

Relación de aspecto recomendada: **16:10** (por ejemplo 1600×1000). En los casos
de estudio hay `<Captura>` sueltos que también esperan su imagen — buscar
`pendiente=` en `app/proyectos/`.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy

```bash
npm run deploy
```

Buildea, genera `out/` y lo publica en la rama `gh-pages`. El `.nojekyll` es
necesario: sin él, GitHub Pages ignora las carpetas que empiezan con guion bajo
y Next.js pone todos los assets en `_next/`.

Además hay un workflow (`.github/workflows/deploy.yml`) que hace lo mismo solo:
en cada push a `main` y una vez por día a las 09:00 UTC.

## Decisiones

**Export estático en lugar de servidor.** El sitio no tiene nada dinámico por
request: no hay base de datos ni autenticación. Como HTML estático se sirve
desde CDN y no hay servidor que mantener.

**Los números de GitHub se leen en build, no en el navegador.** Sin servidor,
la alternativa sería pedirlos desde el cliente: eso muestra un salto de
contenido, gasta el límite del visitante y no funciona sin JavaScript. Leerlos
en `next build` y reconstruir por cron da lo mismo sin ninguno de esos costos.

**Y salen de GraphQL, no de REST.** REST solo sabe de los repos públicos
propios, y ahí no está el trabajo: los commits del ERP viven en el repo de otra
cuenta y buena parte del resto es privado. Contado así daban 2 repos y 4
deploys, un retrato falso. `contributionsCollection` mira la contribución y no
el repositorio: 1.079 en el último año.

Eso necesita un token. Para ver el bloque **en local**:

```bash
GH_CONTRIBUCIONES_TOKEN=$(gh auth token) npm run build
```

o dejarlo fijo en `.env.local` (está en `.gitignore`). Sin token la sección no
se dibuja y el build sigue andando igual. Para el deploy automático hay que
cargar el mismo token como secreto `GH_CONTRIBUCIONES_TOKEN` del repo — el
`GITHUB_TOKEN` que da Actions alcanza para no fallar, pero solo ve lo público.

**La imagen de preview es un `.png` estático y no una ruta generada.** GitHub
Pages decide el `Content-Type` por la extensión del archivo, y la ruta de Next
emite uno sin extensión. Servido como `octet-stream`, LinkedIn y Twitter
descartan la imagen. La fuente para regenerarla está en
`scripts/opengraph-image.generador.tsx` con las instrucciones adentro.

**El color son dos ejes, no uno.** `data-tema` (claro/oscuro) y `data-paleta`
(cobre/violeta/índigo/verde), los dos como atributos del `<html>` que el script
de `layout.tsx` escribe antes de pintar. Ningún componente nombra un color:
piden `--acento` y no se enteran de cuál es. Agregar una paleta son dos bloques
en `globals.css` y una entrada en `PALETAS` (`components/Paleta.tsx`).

Para fijar una y sacar el selector: cambiar el `"cobre"` del script de inicio
por la elegida, borrar `<Paleta />` del header y las paletas que sobren.

**Una serif solo para títulos.** La tipografía display aparece en el hero y en
los títulos de notas y casos; la UI se queda en sans. Mezclarlas sin una regla
es lo que hace que un sitio parezca plantilla.

**El tema sigue al sistema operativo**, con override manual guardado en
`localStorage` y aplicado antes de pintar para que no haya parpadeo.

**Accesibilidad.** Enlace de salto al contenido, foco visible en la navegación
por teclado, jerarquía real de encabezados y `prefers-reduced-motion` respetado.
