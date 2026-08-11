import type { Metadata } from "next";
import { Captura } from "@/components/Captura";
import {
  Aparte,
  Bloque,
  Codigo,
  Datos,
  H2,
  P,
  Titulo,
  Volver,
} from "@/components/Prosa";

export const metadata: Metadata = {
  title: "SGC — el ERP que corre una empresa",
  description:
    "Cómo diseñé y llevé a producción un ERP de 6 módulos con facturación electrónica ante ARCA, sobre Next.js, TypeScript, tRPC y Prisma.",
};

const numeros = [
  { valor: "6", etiqueta: "módulos" },
  { valor: "127", etiqueta: "entidades de datos" },
  { valor: "106", etiqueta: "permisos granulares" },
  { valor: "3", etiqueta: "meses hasta producción" },
];

export default function SGC() {
  return (
    <article className="mx-auto max-w-2xl py-12">
      <Volver href="/#proyectos" texto="proyectos" />

      <Titulo
        meta="Caso de estudio · 2026"
        bajada="Sistema de gestión integral para Cambren SRL. Diseño, desarrollo y puesta en producción, de punta a punta y en solitario."
      >
        SGC — el ERP que corre una empresa
      </Titulo>

      <Datos items={numeros} />

      <Captura
        chrome
        transicion="captura-sgc"
        src="/capturas/sgc-home.png"
        alt="Pantalla principal del SGC: indicadores de empleados activos, producción del período y adelantos pendientes, producción por tejedor, resumen comercial y de finanzas, y proyección de pagos."
        className="mt-12"
      />

      <H2>El problema</H2>
      <P>
        La empresa operaba con un sistema heredado incompleto y decenas de
        planillas sueltas. Los datos vivían en lugares distintos según el área:
        producción tenía los suyos, comercial los suyos y finanzas rehacía a
        mano lo que ya existía en otro lado. Cada informe de gestión era un
        trabajo manual de horas, y la facturación se cargaba dos veces: una en
        la planilla y otra en el sitio de ARCA.
      </P>

      <H2>El enfoque</H2>
      <P>
        Antes de escribir código relevé cómo trabajaba cada área. Venía de haber
        trabajado en finanzas, tesorería y ventas dentro de la misma empresa,
        así que conocía los procesos desde adentro: sabía qué parte de una
        planilla era el proceso real y qué parte era un parche que alguien había
        inventado para sobrevivir.
      </P>
      <P>
        De ahí salió un modelo relacional único de 127 entidades. La decisión de
        fondo fue que hubiera <strong>una sola fuente de verdad</strong> por
        dato: si el precio de un producto cambia, cambia en un lugar y se
        refleja en presupuestos, ventas y reportes sin que nadie copie nada.
      </P>

      <Captura
        ratio="16 / 9"
        pendiente="Diagrama del modelo de datos"
        className="mt-9"
      />

      <H2>Arquitectura</H2>
      <P>
        El sistema es una aplicación Next.js con App Router, tipada de punta a
        punta. La clave es que <strong>no hay una API REST tradicional</strong>:
        el cliente llama procedimientos de tRPC y TypeScript infiere los tipos
        de la respuesta desde el servidor. Si cambio el nombre de un campo en el
        backend, el frontend deja de compilar. Los errores de contrato se
        detectan al escribir, no en producción.
      </P>
      <ul className="mt-5 space-y-2.5 leading-relaxed text-muted">
        <li>
          <span className="font-medium text-foreground">Datos:</span> PostgreSQL
          con Prisma como ORM. Las migraciones son parte del repositorio.
        </li>
        <li>
          <span className="font-medium text-foreground">Validación:</span> Zod
          en el borde de cada procedimiento. Lo que entra se valida una vez y
          después el tipo es confiable.
        </li>
        <li>
          <span className="font-medium text-foreground">Autenticación:</span>{" "}
          NextAuth con sesiones y roles por área.
        </li>
        <li>
          <span className="font-medium text-foreground">Interfaz:</span> React
          con Tailwind y shadcn/ui, componentes de servidor donde no hace falta
          interactividad.
        </li>
      </ul>

      <H2>Permisos: 106 razones para no usar roles sueltos</H2>
      <P>
        El primer diseño tenía roles simples —admin, comercial, finanzas— y se
        rompió apenas apareció el primer caso real: la cajera necesitaba ver
        precios pero no costos, y el encargado de depósito necesitaba mover
        stock sin tocar la facturación. Los roles no alcanzaban.
      </P>
      <P>
        Lo rehice con un catálogo de 106 permisos con la forma{" "}
        <Codigo>módulo.sección.acción</Codigo> como única fuente de verdad. Cada
        permiso se aplica en dos lugares: en el procedimiento del servidor —que
        es el que realmente protege— y en la interfaz, para no mostrar botones
        que van a fallar. Los roles pasaron a ser simples agrupaciones de
        permisos, no una jerarquía rígida.
      </P>
      <Aparte>
        Lo conté largo en{" "}
        <a href="/notas/permisos-no-roles" className="link-sutil text-foreground">
          106 permisos en vez de 5 roles
        </a>
        .
      </Aparte>

      <H2>Facturación electrónica con ARCA</H2>
      <P>
        La integración con ARCA (ex-AFIP) fue la parte más difícil, y no por el
        protocolo. El servicio web es exigente con el formato y devuelve errores
        fiscales que hay que interpretar: un CUIT que no está en el padrón, un
        punto de venta mal configurado, un comprobante fuera de secuencia.
      </P>
      <P>
        Modelé cada error posible como un tipo, en lugar de propagar el mensaje
        crudo del servicio. El usuario final ve «el CUIT no figura en el padrón
        de ARCA» y no un código numérico. La emisión quedó como una operación
        que consulta el padrón, arma el comprobante, lo envía y guarda el CAE
        con su vencimiento. La carga manual de facturas desapareció.
      </P>

      <Captura
        chrome
        src="/capturas/sgc-facturas.png"
        alt="Listado de comprobantes fiscales emitidos: número, tipo, fecha, cliente con CUIT, neto, IVA, total y CAE, con los totales de facturado e IVA arriba."
        className="mt-9"
      />

      <H2>Testing donde importa</H2>
      <P>
        No busqué cobertura alta: busqué cubrir lo que, si falla, hace perder
        plata. Los tests unitarios con Vitest apuntan al costeo de productos, al
        fraccionamiento —vender por metro algo que se compra por rollo— y al
        cálculo de facturas con sus impuestos. Es lógica pura, sin base de
        datos, y es la que más veces cambió.
      </P>

      <H2>Resultado</H2>
      <P>
        La primera versión entró en producción en tres meses. Hoy la usan
        alrededor de diez personas de cuatro áreas, más la dirección para los
        reportes de gestión. Reemplazó al sistema heredado y a las planillas.
      </P>
      <P>
        Después sumé un asistente interno con IA (Vercel AI SDK y Claude) con
        acceso a los datos del sistema mediante tool-calling, para que la
        dirección pueda preguntar en lenguaje natural cosas que antes requerían
        pedirle un informe a alguien.
      </P>

      <Bloque>
        <p>
          <strong className="font-medium text-foreground">
            Sobre el código:
          </strong>{" "}
          el SGC es un sistema privado de Cambren SRL, así que el repositorio no
          es público y las capturas van con datos de prueba. Lo que está acá es
          el diseño y las decisiones técnicas. Si querés ver código mío, el{" "}
          <a
            href="https://github.com/AlejoDiPietro/gestion-proyectos"
            target="_blank"
            rel="noreferrer"
            className="link-sutil text-foreground"
          >
            proyecto de gestión con SOAP y Hibernate
          </a>{" "}
          está abierto, igual que{" "}
          <a
            href="https://github.com/AlejoDiPietro/AlejoDiPietro.github.io"
            target="_blank"
            rel="noreferrer"
            className="link-sutil text-foreground"
          >
            el de este sitio
          </a>
          .
        </p>
      </Bloque>
    </article>
  );
}
