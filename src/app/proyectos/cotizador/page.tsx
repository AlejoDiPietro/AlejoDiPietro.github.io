import type { Metadata } from "next";
import { Captura } from "@/components/Captura";
import { Aparte, Bloque, Codigo, Datos, H2, P, Titulo, Volver } from "@/components/Prosa";

export const metadata: Metadata = {
  title: "Cotizador de cercos",
  description:
    "Un cotizador donde la cuenta se puede probar, los precios se editan sin romper el cálculo, y un presupuesto ya enviado no cambia nunca. Next.js, tRPC, Prisma y Vitest.",
};

const numeros = [
  { valor: "34", etiqueta: "tests sobre la cuenta" },
  { valor: "12", etiqueta: "materiales en la lista de precios" },
  { valor: "0", etiqueta: "librerías de PDF y de formularios" },
  { valor: "2", etiqueta: "líneas para pasar a Postgres" },
];

export default function Cotizador() {
  return (
    <article className="mx-auto max-w-2xl py-12">
      <Volver href="/#proyectos" texto="proyectos" />

      <Titulo
        meta="Caso de estudio · 2026"
        bajada="Entran los metros de cada lado de un terreno y sale la lista de materiales, la mano de obra y el total con IVA. La cotización se guarda, queda en un link para mandar por WhatsApp, y se imprime como PDF."
      >
        Cotizador de cercos
      </Titulo>

      <Datos items={numeros} />

      <Captura
        transicion="captura-cotizador"
        src="/capturas/cotizador.webp"
        ratio="1536 / 930"
        alt="Pieza de presentación del cotizador: el título y las cuatro cosas que hace a la izquierda, y a la derecha la app con el cerco dibujado a escala, el formulario de tramos y el total con IVA."
        className="mt-12"
      />

      <Bloque>
        <strong className="text-foreground">Probalo:</strong>{" "}
        <a
          href="https://cotizador-cercos.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="link-accion"
        >
          cotizador-cercos.vercel.app
        </a>
        . Cargá unos metros y mirá el total. Si querés ver la decisión que ordena
        todo el proyecto: cambiá el precio del tejido en{" "}
        <a
          href="https://cotizador-cercos.vercel.app/productos"
          target="_blank"
          rel="noreferrer"
          className="link-accion"
        >
          /productos
        </a>{" "}
        y después abrí{" "}
        <a
          href="https://cotizador-cercos.vercel.app/c/K7M2QX"
          target="_blank"
          rel="noreferrer"
          className="link-accion"
        >
          una cotización ya guardada
        </a>
        : el total nuevo cambió y el viejo no, como una factura. Hay un botón para
        devolver la lista de precios a su lugar.
      </Bloque>

      <H2>Por qué lo hice</H2>
      <P>
        Mi trabajo más grande —el ERP que corre una empresa— es privado, y va a
        seguir siéndolo: tiene sueldos, CUITs y datos de clientes. Eso me dejaba
        con un problema: el stack que digo que escribo no tenía un solo repositorio
        público donde alguien pudiera leerlo.
      </P>
      <P>
        Así que busqué un problema chico y real, de un rubro que conozco. Cotizar
        un cerco parece trivial y no lo es: la parte difícil no es la pantalla, es
        que la cuenta esté bien y que un presupuesto que ya se mandó no cambie
        después.
      </P>

      <H2>La cuenta es una función pura, y es lo único con tests</H2>
      <P>
        El cálculo no toca la base, no sabe que existe React y no lee la hora.
        Entran un pedido y una lista de precios, sale un presupuesto. Eso me
        habilita las dos cosas que importan.
      </P>
      <P>
        <strong>Corre en los dos lados.</strong> El navegador la ejecuta mientras
        se escribe, así el número cambia sin esperar una request. El servidor la
        vuelve a ejecutar al guardar y <strong>descarta los totales que manda el
        cliente</strong>: si el total viajara desde el navegador, cualquiera
        podría guardar 200 m de cerco con un total de $1 y venir a reclamarlo. No
        es código duplicado, es el mismo módulo importado dos veces.
      </P>
      <P>
        <strong>Se puede probar de verdad.</strong> Los 34 tests no verifican que
        el código corra: verifican la cuenta. Cada caso es un error que se comete
        cotizando a mano.
      </P>

      <Bloque>
        <p className="font-mono text-[12px] leading-relaxed">
          ✓ un tramo de 30 m lleva 9 intermedios, no 10
          <br />✓ un cerco justo de 30 m necesita 4 rollos por el solape
          <br />✓ un perímetro cerrado no tiene terminales: todas las puntas son
          esquineros
          <br />✓ el portón no lleva tejido: le resta metros al rollo
          <br />✓ la columna de subtotales suma exactamente el total de abajo
          <br />✓ cambiar el precio de un material que no se usa no mueve el total
        </p>
      </Bloque>

      <H2>Los precios son datos, no constantes</H2>
      <P>
        Los precios cambian todas las semanas; las reglas de obra, casi nunca. Son
        dos cosas distintas y las separé: los postes cada 3 m, los rollos de 10 m
        y el 3% de solape viven en el código, y los precios viven en la base y se
        editan desde la app.
      </P>
      <P>
        Por eso el cálculo <strong>recibe la lista de precios como argumento</strong>{" "}
        en vez de importarla. Es lo que permite que los precios cambien sin que
        deje de ser una función pura: la misma entrada da siempre la misma salida,
        y cuando sube el tejido, lo que cambia es la entrada. Si en cambio leyera
        la base, se termina el poder probarlo.
      </P>
      <P>
        La lista guarda el <strong>costo</strong> además del precio de venta. El
        costo no sale impreso en ninguna cotización: existe para que la pantalla
        pueda decir cuánto deja el trabajo. Un cotizador que no sabe el costo
        puede cerrar una obra a pérdida y no enterarse hasta que hay que pagar los
        materiales. Y el margen se mide sobre el precio de venta, no sobre el
        costo: vender a $100 lo que costó $70 es 30% de margen y 43% de recargo, y
        confundirlos es como se termina vendiendo más barato de lo que uno cree.
      </P>

      <H2>Una cotización guardada no se recalcula</H2>
      <P>
        Guarda el pedido, pero también cada renglón y cada precio del día en que
        se hizo. Si mañana sube el tejido, el link que le mandé al cliente la
        semana pasada tiene que seguir diciendo lo mismo: es una oferta con la que
        el cliente puede venir a reclamar.
      </P>
      <P>
        Es la misma razón por la que una factura no consulta la lista de precios,
        la congela. Un cotizador que recalcula al abrir el link es un cotizador que
        le cambia el precio al cliente sin avisarle. Por eso el código del material
        en un renglón guardado es un <Codigo>String</Codigo> y no una relación al
        catálogo: si mañana se deja de vender un artículo, el renglón de una
        cotización vieja tiene que seguir existiendo igual.
      </P>

      <Aparte>
        Se comprueba en dos minutos: anotá el total, cambiá el precio del tejido en
        la lista, y volvé. El total nuevo cambió; el link de la cotización que ya
        habías guardado sigue diciendo exactamente lo mismo.
      </Aparte>

      <H2>La plata son enteros de centavos</H2>
      <P>
        En pesos, <Codigo>0.1 + 0.2</Codigo> no da <Codigo>0.3</Codigo>, y ese
        error se arrastra hasta el último dígito del total. Todos los precios son
        enteros en centavos y recién se dividen para mostrarlos, en un solo lugar.
      </P>
      <P>
        Y todo lo que se imprime se redondea al peso, no al centavo. La hoja se
        muestra sin centavos, así que si un renglón los tuviera, lo que suma el
        cliente con la calculadora no daría el total impreso. Un presupuesto cuyos
        renglones no suman el total es un presupuesto que no se firma.
      </P>

      <H2>El dibujo explica la cuenta</H2>
      <P>
        La pantalla dibuja el cerco a escala: los postes donde van a estar, los
        hilos de tensión que se cobran, el rombo del tejido elegido, y lo que queda
        enterrado bajo la línea de tierra —que es por qué un poste de un cerco de
        1,80 m se paga como si midiera 2,40 m—. Es un alzado desarrollado y no un
        plano: los ángulos del terreno no los sabe nadie, y dibujarlos sería
        inventar.
      </P>
      <P>
        Es SVG escrito a mano, sin librería de gráficos. Es también la única parte
        de la pantalla que se entiende sin leer nada.
      </P>

      <H2>Lo que decidí no usar</H2>
      <P>
        <strong>No hay librería de PDF.</strong> El PDF es la página impresa por el
        navegador, maquetada con <Codigo>@media print</Codigo>. Un presupuesto es
        una hoja con una tabla y un total: pagar cientos de kB para volver a
        dibujar lo que el navegador ya dibuja sería al revés. Al imprimir, los
        colores se fuerzan a claro aunque el navegador esté en tema oscuro.
      </P>
      <P>
        <strong>No hay librería de formularios.</strong> El pedido es un objeto en
        estado y el mismo schema de Zod valida el formulario y la request. El
        navegador se puede saltear; el servidor, no.
      </P>
      <P>
        <strong>No hay sistema de usuarios.</strong> Cambiar precios pide un PIN,
        comparado en el servidor por un middleware y no por cada operación —la que
        se olvide de chequear queda abierta—. No pretende ser más que eso: la
        diferencia con no tener nada es que el límite existe y está en un solo
        lugar.
      </P>

      <H2>Se clona y corre</H2>
      <P>
        La base de desarrollo es un archivo SQLite, y un comando deja la lista de
        precios cargada y tres cotizaciones de ejemplo para abrir. Un proyecto que
        solo arranca si primero te creás una cuenta en la nube y esperás que te den
        una connection string es un proyecto que nadie clona.
      </P>
      <P>
        Que eso sea posible no es suerte, es una restricción de diseño: el modelo
        no usa un solo tipo propio de un motor. Pasar a PostgreSQL son dos líneas y
        ningún cambio en el resto de la app.
      </P>

      <H2>Lo que falta, y no lo escondo</H2>
      <P>
        <strong>Una cotización guardada no recuerda su costo</strong>, solo lo que
        se cobró. Se ve el margen mientras se cotiza, pero no se puede volver a una
        obra cerrada y preguntar a qué margen se cerró. Falta guardar el costo por
        renglón y una pantalla propia para verlo — en el link que recibe el cliente
        no va nunca.
      </P>
      <P>
        Y las reglas de obra son plausibles pero mías: hay que sentarse con alguien
        que arme cercos y corregirlas. Están todas juntas en un archivo, separadas
        del cálculo, justamente para que eso se pueda hacer sin tocar nada más.
      </P>

      <Bloque>
        Los precios y las reglas de este proyecto son <strong>inventados</strong>.
        Es una demostración pública: no lleva la lista de precios ni los criterios
        de obra de ninguna empresa.
      </Bloque>
    </article>
  );
}
