import { type Metadata } from "next";
import Link from "next/link";
import { LegalPage, MailLink, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos de Servicio · Coke Logger",
  description: "Condiciones de uso de Coke Logger y la app Cocacolita para iPhone.",
};

const sections: LegalSection[] = [
  {
    id: "aceptacion",
    title: "Aceptación",
    content: (
      <p>
        Al crear una cuenta o usar Coke Logger, en la web o en la app
        &quot;Cocacolita&quot; para iPhone, aceptas estos Términos y nuestra{" "}
        <Link href="/privacy">Política de Privacidad</Link>. Si no estás de
        acuerdo, no uses el servicio.
      </p>
    ),
  },
  {
    id: "servicio",
    title: "El servicio",
    content: (
      <p>
        Coke Logger es una herramienta gratuita para registrar tu consumo de
        Coca-Cola, ver estadísticas y compararte con otros usuarios. Es un
        proyecto personal y se ofrece &quot;tal cual&quot;, sin garantías de
        disponibilidad continua. Podemos cambiar, pausar o discontinuar
        funciones en cualquier momento.
      </p>
    ),
  },
  {
    id: "cuenta",
    title: "Tu cuenta",
    content: (
      <ul>
        <li>Debes tener al menos 13 años para usar el servicio.</li>
        <li>Debes dar información verdadera y mantener segura tu contraseña.</li>
        <li>Eres responsable de lo que se haga desde tu cuenta.</li>
        <li>
          Tu nombre de usuario no puede suplantar a otra persona ni ser
          ofensivo.
        </li>
      </ul>
    ),
  },
  {
    id: "contenido",
    title: "Tu contenido",
    content: (
      <>
        <p>
          Los registros, notas y fotos que subes siguen siendo tuyos. Nos das
          permiso para guardarlos y mostrarlos solo con el fin de prestarte el
          servicio. Por ejemplo, mostramos tus registros públicos en el
          ranking.
        </p>
        <p>
          No subas contenido ilegal, ofensivo, sexual, violento, que infrinja
          derechos de terceros o que incluya datos personales de otras
          personas. Podemos eliminar ese contenido o suspender la cuenta que lo
          publique.
        </p>
      </>
    ),
  },
  {
    id: "uso-aceptable",
    title: "Uso aceptable",
    content: (
      <ul>
        <li>No intentes acceder a cuentas o datos de otras personas.</li>
        <li>
          No uses bots, scraping ni cargas masivas que afecten el servicio.
        </li>
        <li>No manipules el ranking con registros falsos de forma abusiva.</li>
        <li>No acoses a otros usuarios.</li>
      </ul>
    ),
  },
  {
    id: "salud",
    title: "No es consejo médico",
    content: (
      <p>
        Las estadísticas son solo informativas y de entretenimiento. Coke Logger
        no da consejos médicos ni nutricionales. Si te preocupa tu consumo de
        azúcar o cafeína, consulta a un profesional de la salud.
      </p>
    ),
  },
  {
    id: "marcas",
    title: "Marcas",
    content: (
      <p>
        &quot;Coca-Cola&quot;, &quot;Coca-Cola Zero&quot; y &quot;Coca-Cola
        Light&quot; son marcas registradas de The Coca-Cola Company. Coke Logger
        no está afiliado, patrocinado ni respaldado por The Coca-Cola Company, y
        menciona estas marcas solo para describir lo que registras.
      </p>
    ),
  },
  {
    id: "terminacion",
    title: "Eliminación de la cuenta",
    content: (
      <p>
        Puedes eliminar tu cuenta cuando quieras desde tu Perfil en la web, desde
        la app para iPhone, o escribiendo a <MailLink />. Al hacerlo se borran tus datos, como explica
        la <Link href="/privacy">Política de Privacidad</Link>. Podemos
        suspender o cerrar cuentas que incumplan estos Términos.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Limitación de responsabilidad",
    content: (
      <p>
        En la medida que la ley lo permita, no somos responsables por pérdidas
        de datos, interrupciones del servicio ni daños indirectos derivados del
        uso de la app. Te recomendamos no usarla como único registro de
        información importante.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios a estos términos",
    content: (
      <p>
        Podemos actualizar estos Términos. Cuando lo hagamos, cambiaremos la
        fecha de arriba. Si sigues usando el servicio después de un cambio,
        aceptas la nueva versión.
      </p>
    ),
  },
  {
    id: "ley",
    title: "Ley aplicable",
    content: (
      <p>
        Estos Términos se rigen por las leyes de la República de Chile, sin
        perjuicio de los derechos que te otorguen las leyes de protección al
        consumidor de tu país de residencia.
      </p>
    ),
  },
];

export default function TermsPage(): React.ReactElement {
  return (
    <LegalPage
      title="Términos de Servicio"
      intro={
        <p>
          Estas son las reglas para usar Coke Logger. Las escribimos en simple:
          léelas, son cortas.
        </p>
      }
      sections={sections}
    />
  );
}
