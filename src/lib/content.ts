/**
 * Contenido del sitio en un solo lugar.
 * Editar acá y no dentro de los componentes: las páginas solo maquetan.
 */

export const perfil = {
  nombre: "Alejo Di Pietro",
  titulo: "Desarrollador Full-Stack",
  stackPrincipal: "Next.js · TypeScript",
  ubicacion: "Buenos Aires, Argentina",
  email: "alejodipietro123@gmail.com",
  linkedin: "https://www.linkedin.com/in/alejodipietro",
  github: "https://github.com/AlejoDiPietro",
  cv: "/cv-alejo-di-pietro.pdf",
  cvIngles: "/alejo-di-pietro-resume-en.pdf",
  foto: "/alejo.png",

  // Lo primero que se lee. Tiene que sonar a persona, no a CV.
  saludo: "Hola, soy Alejo.",
  hero: "Escribo software que se usa todos los días.",
  heroDetalle:
    "Tengo 21 años y soy Analista de Sistemas. Diseñé y puse en producción el sistema que hoy corre una empresa entera: pedidos, stock, finanzas y facturación ante ARCA.",
} as const;

export const numeros = [
  { valor: 121, sufijo: "", etiqueta: "entidades de datos modeladas" },
  { valor: 6, sufijo: "", etiqueta: "módulos en producción" },
  { valor: 10, prefijo: "~", sufijo: "", etiqueta: "personas lo usan a diario" },
  { valor: 3, sufijo: " meses", etiqueta: "de cero a producción" },
] as const;

export type Proyecto = {
  slug: string;
  nombre: string;
  periodo: string;
  resumen: string;
  stack: string[];
  href?: string;
  repo?: string;
  destacado?: boolean;
  emoji: string;
};

export const proyectos: Proyecto[] = [
  {
    slug: "sgc",
    nombre: "SGC — el ERP que corre una empresa",
    periodo: "2026",
    resumen:
      "Seis módulos sobre un modelo de 121 entidades: gestión, comercial y finanzas en un solo lugar, con facturación electrónica ante ARCA y control de acceso de 114 permisos. Lo diseñé, lo construí y lo puse en producción en 3 meses.",
    stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL"],
    href: "/proyectos/sgc",
    destacado: true,
    emoji: "🏭",
  },
  {
    slug: "web-publica",
    nombre: "Migración de una web pública a Next.js",
    periodo: "2026",
    resumen:
      "Porté el sitio público de la empresa de PHP a Next.js con App Router, empezando por el catálogo de productos, y lo desplegué en Vercel. El desafío no fue el framework: fue migrar sin romper las URLs que ya estaban indexadas.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    emoji: "🌐",
  },
  {
    slug: "gestion-proyectos",
    nombre: "Gestión de proyectos — REST sobre SOAP",
    periodo: "2025",
    resumen:
      "API REST que consume un servicio SOAP sobre un backend JPA/Hibernate con consultas HQL. Maven multi-módulo, con las capas separadas en serio: el módulo REST no depende del DAO, habla solo por WSDL.",
    stack: ["Java", "Hibernate", "JAX-WS", "Jersey", "MySQL"],
    href: "https://github.com/AlejoDiPietro/gestion-proyectos",
    repo: "https://github.com/AlejoDiPietro/gestion-proyectos",
    emoji: "☕",
  },
  {
    slug: "chatbot",
    nombre: "Chatbot de atención al cliente",
    periodo: "2024",
    resumen:
      "Mi primer proyecto que usó gente de verdad. Modelé la conversación con diagramas de actividades UML antes de escribir una línea, y automatizó las consultas que respondíamos veinte veces por día.",
    stack: ["UML", "Automatización"],
    emoji: "💬",
  },
  {
    slug: "este-sitio",
    nombre: "Este mismo sitio",
    periodo: "2026",
    resumen:
      "Next.js con export estático sobre GitHub Pages. Las animaciones al scrollear son IntersectionObserver a mano, sin librerías: son treinta líneas y pesan cero.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/AlejoDiPietro/AlejoDiPietro.github.io",
    repo: "https://github.com/AlejoDiPietro/AlejoDiPietro.github.io",
    emoji: "✦",
  },
];

/** Las tecnologías que aparecen como filtro, en orden de relevancia. */
export const filtros = [
  "Todos",
  "Next.js",
  "TypeScript",
  "tRPC",
  "PostgreSQL",
  "Java",
] as const;

export type Experiencia = {
  puesto: string;
  empresa: string;
  periodo: string;
  descripcion: string;
};

export const experiencia: Experiencia[] = [
  {
    puesto: "Desarrollador Full-Stack",
    empresa: "Cambren SRL",
    periodo: "Abril 2026 — Actualidad",
    descripcion:
      "Diseñé y desarrollé end-to-end el ERP que corre la operación de la empresa, integré la facturación electrónica con ARCA y sumé un asistente interno con IA sobre los datos del sistema.",
  },
  {
    puesto: "Analista de Finanzas y Tesorería",
    empresa: "Cambren SRL",
    periodo: "Enero — Abril 2026",
    descripcion:
      "Liquidación de sueldos de más de 30 empleados, pagos a proveedores, conciliación de facturas y caja diaria. Acá aprendí el negocio que después modelé en el sistema.",
  },
  {
    puesto: "Encargado de E-commerce y Atención al Cliente",
    empresa: "Cambren SRL",
    periodo: "Mayo 2025 — Enero 2026",
    descripcion:
      "Puse en marcha la tienda online sobre Tienda Nube: catálogo, medios de pago, envíos y postventa. Fui el mayor generador de facturación del equipo comercial.",
  },
  {
    puesto: "Desarrollador de Chatbot",
    empresa: "Cambren SRL",
    periodo: "Julio — Noviembre 2024",
    descripcion:
      "Mi primer trabajo escribiendo código para producción, a los 19.",
  },
];

export const stack = [
  {
    area: "Lenguajes",
    icono: "code",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "SQL"],
  },
  {
    area: "Frontend",
    icono: "layout",
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
    icono: "database",
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
    icono: "tools",
    items: ["Vitest", "Testing Library", "ESLint", "Git", "Vercel", "Linux"],
  },
] as const;

/** El bloque personal. Sin esto la página podría ser de cualquiera. */
export const sobreMi = [
  "Entré a Cambren a los 18 para atender clientes por WhatsApp. Después pasé por ventas, por finanzas y por tesorería, y en el medio me recibí de Analista de Sistemas. Cuando me tocó construir el sistema de la empresa ya conocía el negocio desde adentro: sabía qué parte de cada planilla era el proceso real y qué parte era un parche que alguien había inventado para sobrevivir.",
  "Eso es lo que más me gusta del oficio: entender un problema desordenado y salir con algo que la gente usa todos los días sin pensar en que alguien lo escribió.",
  "Sigo cursando Ingeniería en Informática en la USAL. Fuera de la pantalla voy al gimnasio, juego al fútbol y al pádel con amigos, y soy bastante fanático del cine de terror.",
];
