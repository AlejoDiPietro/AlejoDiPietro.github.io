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
  telefono: "+54 11 3690 0108",
  linkedin: "https://www.linkedin.com/in/alejodipietro",
  github: "https://github.com/AlejoDiPietro",
  cv: "/cv-alejo-di-pietro.pdf",
  formacion: "Analista de Sistemas (USAL) · Ingeniería en Informática en curso",
  presentacion:
    "Desarrollador full-stack y Analista de Sistemas, con foco en TypeScript y el ecosistema Next.js. Trabajo de punta a punta: del relevamiento con las áreas de negocio al modelo de datos, el backend type-safe y la interfaz.",
  buscando:
    "Busco sumarme a un equipo de producto para crecer en arquitectura, testing y buenas prácticas.",
} as const;

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
      "Diseñé y desarrollé end-to-end el ERP que hoy corre la operación de la empresa: 6 módulos sobre un modelo relacional de 121 entidades, con facturación electrónica ARCA integrada y control de acceso granular.",
  },
  {
    puesto: "Analista de Finanzas y Tesorería",
    empresa: "Cambren SRL",
    periodo: "Enero — Abril 2026",
    descripcion:
      "Liquidación de sueldos de más de 30 empleados, pagos a proveedores, conciliación de facturas y caja diaria.",
  },
  {
    puesto: "Encargado de E-commerce y Atención al Cliente",
    empresa: "Cambren SRL",
    periodo: "Mayo 2025 — Enero 2026",
    descripcion:
      "Puesta en marcha de la tienda online sobre Tienda Nube: catálogo, medios de pago, envíos y postventa.",
  },
  {
    puesto: "Desarrollador de Chatbot",
    empresa: "Cambren SRL",
    periodo: "Julio — Noviembre 2024",
    descripcion:
      "Diseño de la interacción con diagramas de actividades UML e implementación de un chatbot que automatizó las consultas más frecuentes de clientes.",
  },
];

export type Proyecto = {
  slug: string;
  nombre: string;
  resumen: string;
  stack: string[];
  href: string;
  repo?: string;
  destacado: boolean;
};

export const proyectos: Proyecto[] = [
  {
    slug: "sgc",
    nombre: "SGC — ERP de gestión",
    resumen:
      "El sistema que hoy corre la operación de Cambren: gestión, comercial y finanzas en un solo lugar, con facturación electrónica ante ARCA.",
    stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL"],
    href: "/proyectos/sgc",
    destacado: true,
  },
  {
    slug: "gestion-proyectos",
    nombre: "Gestión de proyectos — REST sobre SOAP",
    resumen:
      "API REST que consume un servicio SOAP sobre un backend JPA/Hibernate con consultas HQL. Maven multi-módulo, con las capas estrictamente separadas.",
    stack: ["Java", "Hibernate", "JAX-WS", "Jersey", "MySQL"],
    href: "https://github.com/AlejoDiPietro/gestion-proyectos",
    repo: "https://github.com/AlejoDiPietro/gestion-proyectos",
    destacado: false,
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
    items: ["Vitest", "Testing Library", "ESLint", "Git", "Vercel", "UML"],
  },
];
