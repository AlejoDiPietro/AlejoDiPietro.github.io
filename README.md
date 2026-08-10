# alejodipietro.github.io

Mi sitio personal: presentación, experiencia y un case study del ERP que diseñé
y llevé a producción.

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
├── lib/content.ts          → todo el contenido (perfil, experiencia, stack)
├── app/layout.tsx          → estructura, metadata y tipografías
├── app/page.tsx            → home
└── app/proyectos/sgc/      → case study
```

El contenido vive separado de la maqueta a propósito: para actualizar un puesto
o sumar un proyecto se edita `content.ts` y no hay que tocar los componentes.

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

## Decisiones

**Export estático en lugar de servidor.** El sitio no tiene nada dinámico: no
hay base de datos, ni autenticación, ni contenido que cambie por request.
Renderizarlo en cada visita sería pagar un costo sin recibir nada a cambio.
Como HTML estático se sirve desde CDN y no hay servidor que mantener.

**El tema sigue al sistema operativo.** Los colores se definen como variables
CSS y `prefers-color-scheme` las reemplaza en modo oscuro. Sin JavaScript de
por medio y sin el parpadeo de tema que aparece cuando se resuelve en el
cliente.

**Accesibilidad.** Enlace de salto al contenido, foco visible en la navegación
por teclado, jerarquía real de encabezados y `prefers-reduced-motion`
respetado.
