Quiero un rediseño total de mi portfolio personal, hecho de cero. El sitio actual está en `C:\Claudecore\portfolio` (Next.js 16 + TypeScript + Tailwind 4, export estático en GitHub Pages, en vivo en https://alejodipietro.github.io). No quiero retoques: quiero otra identidad visual, con otras formas, otra composición y otra forma de moverse.

## Quién soy (el sitio tiene que contar esto)
Soy Alejo Di Pietro, Líder de Sistemas y Datos en Cambren SRL y Analista de Sistemas (USAL). Construí el ERP que corre toda la empresa, y hoy trabajo con la dirección sobre los datos que genera: estados de resultados, rentabilidad y detección de pérdidas. Mi frase: "Construyo sistemas y uso sus datos para decidir." No soy "un desarrollador más": estoy en el cruce entre tecnología y gestión.

## Contenido
Todo el contenido sale de `src/lib/content.ts` y de las páginas de `src/app/proyectos/*`, `src/app/notas/*` y `src/app/en/page.tsx`. Usalo tal cual: no inventes números, logros ni proyectos. Si un texto necesita cambiar para el diseño nuevo, proponémelo antes.

## Dirección visual
- Estética tecnológica y de **datos**: que se sienta como un centro de control o un sistema vivo, no como un template de desarrollador. Pensá en grillas, trazos técnicos, números que se animan, líneas que conectan cosas, nodos y flujos de datos, micro-dashboards.
- Muchas animaciones, pero con intención: cada una tiene que mostrar algo (un dato que se construye, un sistema que se conecta, una sección que se arma). Nada de movimiento decorativo sin sentido.
- Tiene que seguir viéndose **profesional**: me van a mirar dueños de empresas y reclutadores, no solo devs.
- Antes de escribir código, mostrame 2 o 3 direcciones visuales distintas (concepto, paleta, tipografía, tipo de animación) y elijo yo.

## Requisitos técnicos (no negociables)
- Sigue siendo export estático (`output: "export"`) sobre GitHub Pages, y se publica con `npm run deploy`. Nada de servidor.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Rápido: Lighthouse de Performance 90 o más en mobile. Si sumás una librería de animación (Motion, GSAP, three.js, etc.), justificala.
- Responsive de verdad: la mitad de las visitas llegan desde LinkedIn en el celular.
- Mantené todas las rutas actuales (`/`, `/en`, `/notas/...`, `/proyectos/...`), los PDFs del CV en `public/` y la versión en inglés.
- Mantené la imagen de OpenGraph como `.png` estático (ver `scripts/opengraph-image.generador.tsx`: GitHub Pages sirve sin extensión como octet-stream y LinkedIn la descarta), pero rediseñala acorde.
- Leé los comentarios del código actual antes de tirarlo: documentan trampas que ya costaron tiempo (columna sticky más alta que el viewport, `.nojekyll`, `@utility` en Tailwind 4 para clases con variantes, `<a>` anidados).

## Cómo trabajar
- Todo en una rama nueva (`rediseno-total`). No toques `main` ni publiques sin mi OK.
- Cuando tengas algo navegable, levantalo en local y mandame capturas en escritorio y en celular.
