"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Cambio de idioma, en el header y en los dos sentidos.
 *
 * Estaba solo al pie del /en, que es como no ponerlo: quien entra en inglés
 * tiene que scrollear hasta el fondo para volver. El idioma activo se marca
 * pero no es un link a sí mismo.
 */
export function Idioma() {
  const ruta = usePathname() ?? "/";
  const enIngles = ruta.startsWith("/en");

  const base =
    "font-mono text-xs transition-colors";
  const activo = "text-foreground";
  const inactivo = "text-muted hover:text-foreground";

  return (
    <div className="flex items-center gap-1 text-xs" aria-label="Idioma">
      {enIngles ? (
        <Link href="/" className={`${base} ${inactivo}`} hrefLang="es">
          ES
        </Link>
      ) : (
        <span className={`${base} ${activo}`} aria-current="true">
          ES
        </span>
      )}

      <span aria-hidden="true" className="text-line">
        /
      </span>

      {enIngles ? (
        <span className={`${base} ${activo}`} aria-current="true">
          EN
        </span>
      ) : (
        <Link href="/en" className={`${base} ${inactivo}`} hrefLang="en">
          EN
        </Link>
      )}
    </div>
  );
}
