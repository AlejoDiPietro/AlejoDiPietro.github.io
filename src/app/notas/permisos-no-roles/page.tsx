import type { Metadata } from "next";
import { Aparte, Codigo, H2, P, Titulo, Volver } from "@/components/Prosa";
import { notas } from "@/lib/content";

const nota = notas.find((n) => n.slug === "permisos-no-roles")!;

export const metadata: Metadata = {
  title: nota.titulo,
  description: nota.resumen,
  openGraph: { type: "article", publishedTime: nota.fecha },
};

export default function PermisosNoRoles() {
  return (
    <article className="mx-auto max-w-2xl py-12">
      <Volver href="/notas" texto="notas" />

      <Titulo meta={`${nota.fechaTexto} · ${nota.minutos} min de lectura`}>
        {nota.titulo}
      </Titulo>

      <P>
        Cuando armé el control de acceso del ERP que hoy corre la empresa donde
        trabajo, hice lo que hace todo el mundo la primera vez: cinco roles.
        Admin, comercial, finanzas, tesorería, lectura. Cada pantalla preguntaba
        por el rol del usuario y decidía si se dibujaba o no.
      </P>
      <P>
        Duró exactamente hasta la primera semana de uso real.
      </P>

      <H2>El caso que lo rompió</H2>
      <P>
        La cajera necesitaba ver los precios de venta para cobrar. No podía ver
        los costos, porque el costo de compra es información sensible y no es
        parte de su trabajo. Con roles, eso no se puede expresar: o es
        &laquo;comercial&raquo; y ve todo el módulo, o no lo es y no ve nada.
      </P>
      <P>
        El segundo caso llegó al día siguiente. El encargado de depósito tenía
        que mover stock entre depósitos, que vive dentro del módulo comercial,
        pero no debía tocar facturación, que vive en el mismo módulo. Otra vez:
        el rol es demasiado grueso para la pregunta que le estoy haciendo.
      </P>
      <P>
        El reflejo automático es inventar roles nuevos. &laquo;Cajera&raquo;.
        &laquo;Depósito&raquo;. &laquo;Comercial sin costos&raquo;. Es la
        trampa: cada excepción del negocio agrega un rol, los roles empiezan a
        solaparse, y a los seis meses hay veinte roles que nadie puede explicar
        y que se copian entre sí a mano cuando entra alguien nuevo.
      </P>

      <Aparte>
        El problema de fondo: un rol describe <em>quién es</em> una persona, y
        lo que el sistema necesita saber es <em>qué puede hacer</em>. No son la
        misma pregunta, y confundirlas se paga cuando el negocio cambia.
      </Aparte>

      <H2>Darlo vuelta</H2>
      <P>
        Lo rehice al revés. La unidad mínima dejó de ser el rol y pasó a ser el
        permiso: una acción concreta sobre una parte concreta del sistema, con
        la forma <Codigo>módulo.sección.acción</Codigo>. Por ejemplo{" "}
        <Codigo>comercial.productos.ver_costo</Codigo>,{" "}
        <Codigo>comercial.stock.mover</Codigo>,{" "}
        <Codigo>finanzas.facturas.emitir</Codigo>.
      </P>
      <P>
        Terminaron siendo 114. Suena a mucho hasta que se ve de dónde salen: no
        los inventé de arriba hacia abajo, salieron de recorrer el sistema
        pantalla por pantalla y anotar cada cosa que un usuario puede hacer. Si
        una acción existe en la interfaz, tiene su permiso. Ese catálogo es la
        única fuente de verdad; no hay permisos implícitos ni casos especiales
        escondidos en un <Codigo>if</Codigo>.
      </P>
      <P>
        Los roles no desaparecieron, pero cambiaron de naturaleza: pasaron a ser
        etiquetas que agrupan permisos, no una jerarquía. &laquo;Cajera&raquo; es
        un nombre para un conjunto. Si mañana la cajera necesita ver costos, se
        le agrega un permiso y no se toca una línea de código. Antes eso era un
        deploy.
      </P>

      <H2>Dónde se aplica, y por qué en dos lados</H2>
      <P>
        Cada permiso se chequea en dos lugares distintos, y la distinción
        importa más de lo que parece:
      </P>
      <P>
        <strong>En el procedimiento del servidor.</strong> Este es el que
        protege de verdad. Nada llega a la base de datos sin pasar por ahí, y
        asume que el cliente puede estar mintiendo, porque puede.
      </P>
      <P>
        <strong>En la interfaz.</strong> Este no protege nada — cualquiera puede
        abrir las herramientas del navegador. Su único trabajo es no mostrarle a
        alguien un botón que va a fallar. Es cortesía, no seguridad.
      </P>
      <P>
        Escribirlo así, con los dos roles explícitos, evita el error más común
        de este diseño: creer que esconder el botón alcanza. He visto sistemas
        donde el endpoint está abierto y lo único que lo tapa es que el menú no
        lo muestra.
      </P>

      <H2>Lo que me costó</H2>
      <P>
        La parte incómoda es que los dos chequeos se pueden desincronizar. El
        servidor exige un permiso, la interfaz mira otro, y aparece un botón que
        siempre da error. Lo resolví haciendo que ambos lean del mismo catálogo
        tipado: si escribo mal el nombre de un permiso, no compila. Es la misma
        idea que uso en todo el sistema —que el compilador atrape lo que un test
        no va a atrapar— aplicada al control de acceso.
      </P>
      <P>
        Lo otro que subestimé fue la administración. Con 114 permisos hace falta
        una pantalla decente para asignarlos, agrupada por módulo y con los
        conjuntos armados de antemano. Un checkbox por permiso en una lista
        plana de 114 filas es inusable, y si la herramienta es inusable el
        sistema termina con todo el mundo en admin, que es exactamente el
        problema que se quería evitar.
      </P>

      <H2>Cuándo no haría esto</H2>
      <P>
        Si el sistema tiene dos tipos de usuario y no se espera que eso cambie,
        cinco roles están bien y esto es sobreingeniería. La señal de que hace
        falta granularidad no es el tamaño del sistema: es escuchar por primera
        vez la frase &laquo;pero esta persona necesita ver esto y no aquello&raquo;.
        Si la escuchaste una vez, la vas a escuchar diez.
      </P>
      <P>
        En mi caso la escuché en la primera semana. Preferí pagar el rediseño
        ahí, con el sistema recién puesto en producción y diez usuarios, que dos
        años después con datos históricos y gente que ya se acostumbró a lo que
        había.
      </P>
    </article>
  );
}
