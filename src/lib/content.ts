/**
 * Contenido del sitio en un solo lugar.
 * Editar aca y no dentro de los componentes: las paginas solo maquetan.
 */

export const perfil = {
  nombre: "Alejo Di Pietro",
  titulo: "Desarrollador Full-Stack",
  stackPrincipal: "Next.js · TypeScript",
  ubicacion: "Buenos Aires, Argentina",
  email: "alejodipietro123@gmail.com",
  linkedin: "https://www.linkedin.com/in/alejodipietro",
  github: "https://github.com/AlejoDiPietro",
  usuarioGithub: "AlejoDiPietro",
  cv: "/cv-alejo-di-pietro.pdf",
  cvIngles: "/alejo-di-pietro-resume-en.pdf",
  foto: "/alejo.png",

  // Lo primero que se lee. Tiene que sonar a persona, no a CV.
  saludo: "Alejo Di Pietro",
  hero: "Escribo software que se usa todos los días.",
  heroDetalle:
    "Tengo 21 años y soy Analista de Sistemas. Entré a una empresa a los 18 para atender clientes por WhatsApp, pasé por ventas y por tesorería, y terminé diseñando y poniendo en producción el sistema que hoy la corre entera: pedidos, stock, finanzas y facturación ante ARCA.",
} as const;

/**
 * Numeros de impacto, no de volumen.
 * "127 entidades modeladas" mide cuanto escribi; estos miden que cambio.
 */
export const numeros = [
  { valor: 3, sufijo: " meses", etiqueta: "de cero a producción" },
  { valor: 10, prefijo: "~", sufijo: "", etiqueta: "personas lo usan todos los días" },
  { valor: 4, sufijo: "", etiqueta: "áreas trabajando sobre un mismo dato" },
  { valor: 0, sufijo: "", etiqueta: "facturas cargadas dos veces desde entonces" },
] as const;

export type Proyecto = {
  slug: string;
  nombre: string;
  periodo: string;
  resumen: string;
  stack: string[];

  /**
   * Los tres destinos posibles de un proyecto, cada uno con su nombre.
   *
   * Antes habia un solo `href` y cada tarjeta iba a otra cosa: el ERP a un caso
   * de estudio, el juego al juego, el cotizador al codigo. Nadie sabia que iba a
   * encontrar al hacer click. Ahora cada proyecto declara lo que TIENE y la
   * tarjeta muestra esos links con su nombre; el que falta, falta a la vista.
   */
  /** El caso de estudio: como se penso y por que. Una ruta de este sitio. */
  caso?: string;
  /** Para abrirlo y usarlo ahora mismo. */
  demo?: string;
  /** El codigo. */
  repo?: string;

  /** Por que no hay codigo para mostrar. Sin esto, la ausencia parece un olvido. */
  sinRepo?: string;

  destacado?: boolean;
  /**
   * Captura del proyecto en public/capturas/. Mientras este vacio, la tarjeta
   * dibuja un marco con la leyenda de `capturaPendiente` en lugar de romperse.
   */
  captura?: string;
  capturaAlt?: string;
  capturaPendiente?: string;
  /**
   * El cromo de ventana dice "esto es una pantalla del producto". Una pieza
   * diseñada no es una pantalla, asi que se apaga y el marco queda limpio.
   */
  capturaChrome?: boolean;
  /** Por defecto 16/10, que es lo que mide una captura de pantalla. */
  capturaRatio?: string;
};

export const proyectos: Proyecto[] = [
  {
    slug: "sgc",
    nombre: "SGC — el ERP que corre una empresa",
    periodo: "2026",
    resumen:
      "Seis módulos sobre un modelo de 127 entidades: gestión, comercial y finanzas en un solo lugar, con facturación electrónica ante ARCA y control de acceso de 106 permisos. Lo diseñé, lo construí y lo puse en producción en 3 meses.",
    stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL"],
    caso: "/proyectos/sgc",
    sinRepo: "Código privado: es el sistema que opera la empresa",
    destacado: true,
    captura: "/capturas/sgc-home.png",
    capturaAlt:
      "Pantalla principal del SGC con los indicadores del mes, producción por tejedor y resumen comercial y de finanzas.",
  },
  {
    slug: "cotizador",
    nombre: "Cotizador de cercos",
    periodo: "2026",
    resumen:
      "Entran los metros de cada lado y sale la lista de materiales, la mano de obra y el total con IVA, con el cerco dibujado a escala. El cálculo es una función pura: corre en el navegador para el número en vivo y otra vez en el servidor al guardar, descartando los totales que manda el cliente. Los precios se editan desde la app y entran al cálculo como argumento, así que sigue siendo puro; y una cotización guardada no se recalcula, congela los precios del día como una factura.",
    stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "Vitest"],
    caso: "/proyectos/cotizador",
    demo: "https://cotizador-cercos.vercel.app",
    repo: "https://github.com/AlejoDiPietro/cotizador-cercos",
    captura: "/capturas/cotizador.webp",
    capturaChrome: false,
    // La medida del archivo. Se le recortó la franja de badges de tecnologías,
    // que decía JavaScript/HTML5/CSS3/LocalStorage: ese es el stack de Aetheria,
    // no de este proyecto, y en una app full-stack leído así la hace parecer un
    // juguete.
    capturaRatio: "1536 / 930",
    capturaAlt:
      "Pieza de presentación del Cotizador de cercos: a la izquierda el título y las cuatro cosas que hace; a la derecha una pantalla de la app con el cerco dibujado a escala, el formulario de tramos y el total con IVA de $4.183.744.",
  },
  {
    slug: "aetheria",
    nombre: "Aetheria Online — un RPG 3D en el navegador",
    periodo: "2026",
    resumen:
      "Un sandbox de combate y progresión con cinco zonas, loot por rarezas, inventario, equipamiento y jefes, escrito con Three.js en un solo index.html sin build ni framework. Es lo único de esta lista que podés abrir y usar ahora mismo, sin pedirle permiso a nadie.",
    stack: ["Three.js", "JavaScript", "WebGL"],
    demo: "https://alejodipietro.github.io/aetheria/",
    repo: "https://github.com/AlejoDiPietro/aetheria",
    captura: "/capturas/aetheria.webp",
    capturaChrome: false,
    capturaRatio: "3 / 2",
    capturaAlt:
      "Pieza de presentación de Aetheria Online: el título y la lista de características a la izquierda, una captura grande del personaje en la Pradera de Sakura a la derecha, y abajo tres pantallas del juego — inventario, combate y la tienda del mercader.",
  },
  {
    slug: "web-publica",
    nombre: "Migración de una web pública a Next.js",
    periodo: "2026",
    resumen:
      "Porté el sitio público de la empresa de PHP a Next.js con App Router, empezando por el catálogo de productos. El desafío no fue el framework: fue migrar sin romper las URLs que ya estaban indexadas.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    caso: "/proyectos/web-publica",
    sinRepo: "Código privado: es el sitio de la empresa",
    capturaPendiente: "Catálogo de productos",
  },
  {
    slug: "gestion-proyectos",
    nombre: "Gestión de proyectos — REST sobre SOAP",
    periodo: "2025",
    resumen:
      "API REST que consume un servicio SOAP sobre un backend JPA/Hibernate con consultas HQL. Maven multi-módulo, con las capas separadas en serio: el módulo REST no depende del DAO, habla solo por WSDL.",
    stack: ["Java", "Hibernate", "JAX-WS", "Jersey", "MySQL"],
    repo: "https://github.com/AlejoDiPietro/gestion-proyectos",
  },
  {
    slug: "chatbot",
    nombre: "Chatbot de atención al cliente",
    periodo: "2024",
    resumen:
      "Mi primer proyecto que usó gente de verdad. Modelé la conversación con diagramas de actividades UML antes de escribir una línea, y automatizó las consultas que respondíamos veinte veces por día.",
    stack: ["UML", "Automatización"],
  },
  {
    slug: "este-sitio",
    nombre: "Este mismo sitio",
    periodo: "2026",
    resumen:
      "Next.js con export estático sobre GitHub Pages. Las animaciones al scrollear son IntersectionObserver a mano, sin librerías: son treinta líneas y pesan cero.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "https://alejodipietro.github.io",
    repo: "https://github.com/AlejoDiPietro/AlejoDiPietro.github.io",
  },
];

/**
 * A donde va un proyecto cuando se toca su tarjeta o se lo elige en el buscador.
 *
 * El caso de estudio primero, porque es lo que explica el proyecto. Si no hay
 * caso, lo mejor es poder usarlo; y si tampoco, el codigo. Vive aca y no en cada
 * componente para que la tarjeta y el buscador no puedan discrepar.
 */
export function destinoPrincipal(p: Proyecto): string | undefined {
  return p.caso ?? p.demo ?? p.repo;
}

/** Las tecnologias que aparecen como filtro, en orden de relevancia. */
export const filtros = [
  "Todos",
  "Next.js",
  "TypeScript",
  "tRPC",
  "PostgreSQL",
  "Java",
] as const;

export type Nota = {
  slug: string;
  titulo: string;
  fecha: string;
  fechaTexto: string;
  resumen: string;
  minutos: number;
};

/**
 * Escribir es lo que separa "entrega" de "piensa". Cada nota sale de una
 * decision que ya tome en un proyecto real, no de un tutorial.
 */
export const notas: Nota[] = [
  {
    slug: "permisos-no-roles",
    titulo: "106 permisos en vez de 5 roles",
    fecha: "2026-08-10",
    fechaTexto: "10 de agosto de 2026",
    resumen:
      "Diseñé el control de acceso del ERP con cinco roles y se rompió con el primer caso real: el mostrador necesitaba todo el módulo comercial menos los saldos deudores. Por qué lo rehice con permisos granulares, y el permiso que resultó no describir a una persona sino a una máquina.",
    minutos: 7,
  },
];

export type Puesto = {
  puesto: string;
  periodo: string;
  descripcion: string;
};

export type Experiencia = {
  empresa: string;
  periodo: string;
  /** Del más reciente al más viejo. */
  puestos: Puesto[];
};

/**
 * Agrupado por empresa y no por puesto.
 *
 * Como lista plana, cuatro entradas seguidas de "Cambren SRL" se leen como
 * cuatro trabajos sueltos. Agrupadas, se lee lo que realmente pasó: entré a
 * atender clientes y terminé construyendo el sistema, sin cambiar de empresa.
 * Esa progresión es el argumento más fuerte que tengo y depende del formato.
 */
export const experiencia: Experiencia[] = [
  {
    empresa: "Cambren SRL",
    periodo: "2024 — Actualidad",
    puestos: [
      {
        puesto: "Desarrollador Full-Stack",
        periodo: "Abril 2026 — Actualidad",
        descripcion:
          "Diseñé y desarrollé end-to-end el ERP que corre la operación de la empresa, integré la facturación electrónica con ARCA y sumé un asistente interno con IA sobre los datos del sistema.",
      },
      {
        puesto: "Analista de Finanzas y Tesorería",
        periodo: "Enero — Abril 2026",
        descripcion:
          "Liquidación de sueldos de más de 30 empleados, pagos a proveedores, conciliación de facturas y caja diaria. Acá aprendí el negocio que después modelé en el sistema.",
      },
      {
        puesto: "Encargado de E-commerce y Atención al Cliente",
        periodo: "Mayo 2025 — Enero 2026",
        descripcion:
          "Puse en marcha la tienda online sobre Tienda Nube: catálogo, medios de pago, envíos y postventa. Fui el mayor generador de facturación del equipo comercial.",
      },
      {
        puesto: "Desarrollador de Chatbot",
        periodo: "Julio — Noviembre 2024",
        descripcion:
          "Mi primer trabajo escribiendo código para producción, a los 19.",
      },
    ],
  },
];

export const stack = [
  {
    area: "Lenguajes",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "SQL"],
  },
  {
    area: "Frontend",
    items: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "React Hook Form",
    ],
  },
  {
    area: "Backend y datos",
    items: [
      "Node.js",
      "tRPC",
      "Prisma",
      "Zod",
      "NextAuth",
      "PostgreSQL",
      "MySQL",
      "Hibernate",
    ],
  },
  {
    area: "Testing y herramientas",
    items: ["Vitest", "Testing Library", "ESLint", "Git", "Vercel", "Linux"],
  },
] as const;

export const formacion = [
  {
    titulo: "Analista de Sistemas",
    detalle: "Universidad del Salvador · 2023–2026 · graduado",
  },
  {
    titulo: "Ingeniería en Informática",
    detalle: "Universidad del Salvador · 2023–2027 · en curso",
  },
  {
    titulo: "Certificado Profesional de Ciberseguridad",
    detalle: "Google · Inglés avanzado",
  },
] as const;

/** El bloque personal. Sin esto la pagina podria ser de cualquiera. */
export const sobreMi = [
  "Entré a Cambren a los 18 para atender clientes por WhatsApp. Después pasé por ventas, por finanzas y por tesorería, y en el medio me recibí de Analista de Sistemas. Cuando me tocó construir el sistema de la empresa ya conocía el negocio desde adentro: sabía qué parte de cada planilla era el proceso real y qué parte era un parche que alguien había inventado para sobrevivir.",
  "Eso es lo que más me gusta del oficio: entender un problema desordenado y salir con algo que la gente usa todos los días sin pensar en que alguien lo escribió.",
  "Sigo cursando Ingeniería en Informática en la USAL. Fuera de la pantalla voy al gimnasio, juego al fútbol y al pádel con amigos, y soy bastante fanático del cine de terror.",
];
