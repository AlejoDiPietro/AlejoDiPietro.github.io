import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio se sirve desde GitHub Pages, que solo entrega archivos estaticos:
  // `export` genera HTML plano en out/ en lugar de necesitar un servidor Node.
  output: "export",

  // El optimizador de imagenes de next/image necesita servidor. Sin el, las
  // imagenes se sirven tal cual.
  images: { unoptimized: true },

  // Cada ruta queda como carpeta con su index.html (/proyectos/sgc/index.html),
  // que es lo que Pages sabe resolver.
  trailingSlash: true,
};

export default nextConfig;
