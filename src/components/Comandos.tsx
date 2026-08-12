"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { destinoPrincipal, notas, perfil, proyectos } from "@/lib/content";
import { PALETAS } from "./Paleta";

/**
 * Paleta de comandos (⌘K / Ctrl+K).
 *
 * Sin librerías: son el filtro, la navegación por teclado y un diálogo. Meter
 * cmdk o similar para esto serían 15 kB de JavaScript en un sitio que hoy no
 * carga ninguno.
 *
 * Sirve para tres cosas a la vez: es la forma más rápida de moverse para quien
 * usa teclado, descomprime el header —los links que no entran viven acá— y es
 * lo primero que prueba alguien que sabe del oficio.
 */

type Comando = {
  id: string;
  etiqueta: string;
  grupo: string;
  /** Términos extra por los que se puede encontrar, sin mostrarse. */
  claves?: string;
  detalle?: string;
  accion: () => void;
};

/** Para que "codigo" encuentre "código" y "SGC" encuentre "sgc". */
function normalizar(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * La plataforma no cambia nunca, pero no se conoce en el HTML estático.
 * useSyncExternalStore con una suscripción vacía es la forma de leerla sin
 * provocar un desajuste de hidratación.
 */
const sinCambios = () => () => {};
const esMacEnCliente = () =>
  /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
const esMacEnServidor = () => false;

export function Comandos() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [consulta, setConsulta] = useState("");
  const [indice, setIndice] = useState(0);
  const entradaRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  const esMac = useSyncExternalStore(
    sinCambios,
    esMacEnCliente,
    esMacEnServidor,
  );

  const cerrar = useCallback(() => {
    setAbierto(false);
    setConsulta("");
    setIndice(0);
  }, []);

  const ir = useCallback(
    (href: string) => {
      cerrar();
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, href.startsWith("mailto:") ? "_self" : "_blank");
      } else {
        router.push(href);
      }
    },
    [router, cerrar],
  );

  const comandos = useMemo<Comando[]>(() => {
    const lista: Comando[] = [];

    for (const p of proyectos) {
      const destino = destinoPrincipal(p);
      if (!destino) continue;
      lista.push({
        id: `proy-${p.slug}`,
        etiqueta: p.nombre,
        grupo: "Proyectos",
        claves: p.stack.join(" "),
        detalle: p.periodo,
        accion: () => ir(destino),
      });
    }

    for (const n of notas) {
      lista.push({
        id: `nota-${n.slug}`,
        etiqueta: n.titulo,
        grupo: "Notas",
        detalle: `${n.minutos} min`,
        accion: () => ir(`/notas/${n.slug}`),
      });
    }

    lista.push(
      {
        id: "ir-proyectos",
        etiqueta: "Proyectos",
        grupo: "Ir a",
        accion: () => ir("/#proyectos"),
      },
      {
        id: "ir-notas",
        etiqueta: "Todas las notas",
        grupo: "Ir a",
        accion: () => ir("/notas"),
      },
      {
        id: "ir-sobre",
        etiqueta: "Sobre mí",
        grupo: "Ir a",
        claves: "bio quien soy",
        accion: () => ir("/#sobre-mi"),
      },
      {
        id: "ir-experiencia",
        etiqueta: "Experiencia",
        grupo: "Ir a",
        claves: "trabajo cambren",
        accion: () => ir("/#experiencia"),
      },
      {
        id: "ir-stack",
        etiqueta: "Stack",
        grupo: "Ir a",
        claves: "tecnologias herramientas",
        accion: () => ir("/#stack"),
      },
      {
        id: "ir-en",
        etiqueta: "English version",
        grupo: "Ir a",
        claves: "ingles idioma language",
        accion: () => ir("/en"),
      },
    );

    lista.push(
      {
        id: "email",
        etiqueta: "Escribirme un mail",
        grupo: "Contacto",
        claves: "contacto correo",
        detalle: perfil.email,
        accion: () => ir(`mailto:${perfil.email}`),
      },
      {
        id: "copiar-email",
        etiqueta: "Copiar mi mail",
        grupo: "Contacto",
        claves: "portapapeles clipboard",
        accion: () => {
          navigator.clipboard?.writeText(perfil.email);
          cerrar();
        },
      },
      {
        id: "linkedin",
        etiqueta: "LinkedIn",
        grupo: "Contacto",
        accion: () => ir(perfil.linkedin),
      },
      {
        id: "github",
        etiqueta: "GitHub",
        grupo: "Contacto",
        claves: "codigo repos",
        accion: () => ir(perfil.github),
      },
      {
        id: "cv",
        etiqueta: "Descargar CV (español)",
        grupo: "Contacto",
        claves: "curriculum pdf",
        accion: () => ir(perfil.cv),
      },
      {
        id: "resume",
        etiqueta: "Download resume (English)",
        grupo: "Contacto",
        claves: "cv curriculum pdf ingles",
        accion: () => ir(perfil.cvIngles),
      },
    );

    lista.push({
      id: "tema",
      etiqueta: "Cambiar entre claro y oscuro",
      grupo: "Apariencia",
      claves: "tema dark light modo noche",
      accion: () => {
        const d = document.documentElement;
        const nuevo = d.dataset.tema === "oscuro" ? "claro" : "oscuro";
        d.dataset.tema = nuevo;
        try {
          localStorage.setItem("tema", nuevo);
        } catch {
          // Almacenamiento bloqueado: cambia igual, no se recuerda.
        }
        cerrar();
      },
    });

    for (const p of PALETAS) {
      lista.push({
        id: `paleta-${p.id}`,
        etiqueta: `Paleta ${p.nombre}`,
        grupo: "Apariencia",
        claves: "color colores tema",
        accion: () => {
          document.documentElement.dataset.paleta = p.id;
          try {
            localStorage.setItem("paleta", p.id);
          } catch {
            // Igual que arriba.
          }
          cerrar();
        },
      });
    }

    return lista;
  }, [ir, cerrar]);

  const filtrados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return comandos;
    return comandos.filter((c) =>
      normalizar(`${c.etiqueta} ${c.grupo} ${c.claves ?? ""}`).includes(q),
    );
  }, [comandos, consulta]);

  /* Atajo global para abrir. */
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setAbierto((a) => !a);
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, []);

  /* Mientras está abierto, el fondo no scrollea y el foco arranca en el input. */
  useEffect(() => {
    if (!abierto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    entradaRef.current?.focus();
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [abierto]);

  /* Que el resultado activo siempre se vea, aunque se llegue con el teclado. */
  useEffect(() => {
    listaRef.current
      ?.querySelector('[data-activo="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [indice, consulta]);

  function alNavegar(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndice((i) => (filtrados.length ? (i + 1) % filtrados.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndice((i) =>
        filtrados.length ? (i - 1 + filtrados.length) % filtrados.length : 0,
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      filtrados[indice]?.accion();
    }
  }

  const atajo = esMac ? "⌘K" : "Ctrl K";

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        aria-label="Abrir la paleta de comandos"
        className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-acento hover:text-acento-texto sm:flex"
      >
        <span aria-hidden="true">{atajo}</span>
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={cerrar}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={alNavegar}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/10"
          >
            <input
              ref={entradaRef}
              value={consulta}
              onChange={(e) => {
                setConsulta(e.target.value);
                setIndice(0);
              }}
              placeholder="Buscar un proyecto, una nota, un color…"
              aria-label="Buscar"
              className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted"
            />

            <ul ref={listaRef} className="max-h-[50vh] overflow-y-auto p-1.5">
              {filtrados.map((c, i) => {
                const activo = i === indice;
                const primeroDelGrupo =
                  i === 0 || filtrados[i - 1].grupo !== c.grupo;

                return (
                  <li key={c.id}>
                    {primeroDelGrupo && (
                      <p className="px-2.5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {c.grupo}
                      </p>
                    )}
                    <button
                      data-activo={activo}
                      onClick={c.accion}
                      onMouseMove={() => setIndice(i)}
                      className={`flex w-full items-baseline justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                        activo ? "bg-acento-suave text-acento-texto" : ""
                      }`}
                    >
                      <span className="truncate">{c.etiqueta}</span>
                      {c.detalle && (
                        <span className="shrink-0 font-mono text-[10px] text-muted">
                          {c.detalle}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}

              {filtrados.length === 0 && (
                <p className="px-2.5 py-6 text-center text-sm text-muted">
                  Nada con «{consulta}».
                </p>
              )}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
              <span>↑↓ moverse</span>
              <span>⏎ abrir</span>
              <span>esc cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
