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
        Las vendedoras necesitaban el módulo comercial entero para trabajar:
        clientes, presupuestos, remitos, ventas. Todo menos una cosa, los saldos
        deudores. Quién debe cuánto es información que en esa empresa mira el
        dueño, no el mostrador. Con roles eso no se puede expresar: o sos
        &laquo;comercial&raquo; y ves todo el módulo, o no lo sos y no ves nada.
      </P>
      <P>
        El segundo caso es el mismo problema una capa más abajo. Mover stock
        entre depósitos y ajustar el stock a mano son dos cosas distintas: la
        primera es operativa y la hace el depósito todos los días, la segunda
        corrige la realidad y deja a la contabilidad mintiendo si se usa mal.
        Las dos viven en la misma pantalla. Un rol no puede separarlas.
      </P>
      <P>
        El reflejo automático es inventar roles nuevos. &laquo;Cajera&raquo;.
        &laquo;Depósito&raquo;. &laquo;Comercial sin deudores&raquo;. Es la
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
        <Codigo>comercial.stock.transferir</Codigo>,{" "}
        <Codigo>comercial.deudores.ver</Codigo>,{" "}
        <Codigo>finanzas.facturas.editar</Codigo>.
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

      <H2>El permiso que no era una capacidad</H2>
      <P>
        El caso que más me hizo pensar apareció después, y no lo vi venir. En
        una sucursal hay una PC fija en el mostrador que comparten dos
        vendedoras. Esa máquina no tiene dueño: si quedaba logueada con la
        cuenta de una, todas las ventas de la otra se le atribuían a ella. Y de
        esa atribución sale la comisión que cada una cobra a fin de mes.
      </P>
      <P>
        La solución fue un usuario propio de la terminal y un permiso que hace
        que el presupuestador pregunte quién cerró la venta. Hasta ahí, bien. El
        problema fue dónde terminó ese permiso: el rol comercial se armaba
        barriendo <em>todos</em> los permisos del módulo, así que se lo llevó
        puesto. Resultado: a las vendedoras entrando con su propio usuario el
        sistema les preguntaba quién había vendido — que es exactamente lo que
        no hay que preguntarle a alguien que ya se identificó.
      </P>
      <Aparte>
        Ese permiso no describe lo que la persona puede hacer. Describe la
        máquina desde la que entra. Es una propiedad del contexto disfrazada de
        capacidad, y por eso ningún barrido automático la iba a ubicar bien.
      </Aparte>
      <P>
        La lección no fue sobre permisos sino sobre los atajos para asignarlos.
        Un &laquo;todos los del módulo menos estos tres&raquo; es cómodo y es
        justo donde se cuelan las cosas que no encajan en la categoría. Hoy esas
        tres exclusiones están escritas con el motivo al lado, porque dentro de
        un año la lista sin explicación es indistinguible de un error.
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
