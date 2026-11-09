import { type Metadata } from "next";
import { LegalPage, MailLink, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidad · Coke Logger",
  description:
    "Cómo Coke Logger y la app Cocacolita para iPhone recopilan, usan y protegen tus datos.",
};

const sections: LegalSection[] = [
  {
    id: "quienes-somos",
    title: "Quiénes somos",
    content: (
      <>
        <p>
          Coke Logger (web en cokelogger.nedilio.dev) y su app para iPhone
          &quot;Cocacolita&quot; son un proyecto personal e independiente para
          registrar tu consumo de Coca-Cola. Ambos usan la misma cuenta y los
          mismos datos.
        </p>
        <p>
          No estamos afiliados, patrocinados ni respaldados por The Coca-Cola
          Company. Puedes contactar al responsable del servicio en <MailLink />.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Datos que recopilamos",
    content: (
      <>
        <p>Solo guardamos lo necesario para que la app funcione:</p>
        <ul>
          <li>
            <strong>Cuenta:</strong> nombre, email, nombre de usuario y, si la
            subes, una foto de perfil. Tu contraseña se guarda cifrada (hash),
            nunca en texto plano.
          </li>
          <li>
            <strong>Registros de consumo:</strong> tipo de Coca-Cola, formato,
            tamaño en ml, fecha y hora, notas opcionales, foto opcional y si el
            registro es público o privado.
          </li>
          <li>
            <strong>Relaciones sociales:</strong> los usuarios que sigues y los
            que te siguen.
          </li>
          <li>
            <strong>Sesión y seguridad:</strong> al iniciar sesión guardamos un
            token de sesión, la dirección IP y el tipo de navegador o
            dispositivo (user-agent), para mantenerte conectado y prevenir
            abusos.
          </li>
        </ul>
        <p>
          No recopilamos tu ubicación, contactos, datos de salud, identificadores
          publicitarios ni datos de pago.
        </p>
      </>
    ),
  },
  {
    id: "uso",
    title: "Para qué usamos tus datos",
    content: (
      <ul>
        <li>Crear y mantener tu cuenta e iniciar sesión.</li>
        <li>Mostrarte tus registros, estadísticas y resúmenes.</li>
        <li>Mostrar el ranking y los perfiles a quienes sigues.</li>
        <li>Proteger el servicio frente a accesos no autorizados.</li>
      </ul>
    ),
  },
  {
    id: "visibilidad",
    title: "Qué ven otros usuarios",
    content: (
      <>
        <p>
          Tus registros son <strong>privados por defecto</strong>. Otros usuarios
          solo pueden ver tu nombre de usuario, tu foto de perfil y los registros
          que marques como públicos, por ejemplo en el ranking (litros
          consumidos y tu variedad favorita).
        </p>
        <p>Puedes cambiar la visibilidad de cada registro cuando quieras.</p>
      </>
    ),
  },
  {
    id: "terceros",
    title: "Con quién compartimos datos",
    content: (
      <>
        <p>
          <strong>No vendemos ni compartimos tus datos con anunciantes.</strong>{" "}
          Usamos estos proveedores, que procesan datos solo para prestar el
          servicio:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong>: alojamiento de la web y de la API.
          </li>
          <li>
            <strong>Neon</strong>: base de datos PostgreSQL donde se guarda tu
            cuenta y tus registros.
          </li>
          <li>
            <strong>UploadThing</strong>: almacenamiento de las fotos de perfil y
            de los registros.
          </li>
        </ul>
        <p>
          Solo entregaríamos datos a una autoridad si la ley nos obliga a
          hacerlo.
        </p>
      </>
    ),
  },
  {
    id: "ios",
    title: "App para iPhone",
    content: (
      <>
        <p>
          La app &quot;Cocacolita&quot; se conecta al mismo servicio que la web.
          Tu token de sesión se guarda en el <strong>Llavero (Keychain)</strong>{" "}
          de tu iPhone.
        </p>
        <p>
          La app no incluye publicidad, ni SDKs de analítica o de terceros, y{" "}
          <strong>no te rastrea</strong> entre apps o sitios web de otras
          empresas.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "Conservación y eliminación",
    content: (
      <>
        <p>
          Guardamos tus datos mientras tengas una cuenta. Puedes{" "}
          <strong>eliminar tu cuenta</strong> desde tu Perfil en la web, desde la
          app para iPhone, o pidiéndolo a <MailLink />.
        </p>
        <p>
          Al eliminarla, borramos de forma permanente tu perfil, tus registros,
          tus sesiones y tus relaciones de seguimiento. Algunas copias de
          seguridad pueden tardar hasta 30 días en eliminarse por completo.
        </p>
      </>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos",
    content: (
      <p>
        Conforme a la Ley N° 19.628 sobre Protección de la Vida Privada de Chile,
        y a las leyes que te apliquen, puedes pedir acceso, rectificación,
        cancelación u oposición al tratamiento de tus datos. También puedes
        pedir una copia de ellos. Escríbenos a <MailLink /> y te responderemos
        lo antes posible.
      </p>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    content: (
      <p>
        El servicio no está dirigido a menores de 13 años y no recopilamos sus
        datos a sabiendas. Si crees que un menor creó una cuenta, escríbenos y
        la eliminaremos.
      </p>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad",
    content: (
      <p>
        Todas las comunicaciones usan HTTPS, las contraseñas se guardan con hash
        y cada consulta filtra los datos por tu usuario. Ningún sistema es 100%
        seguro, pero hacemos lo razonable para proteger tu información.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios a esta política",
    content: (
      <p>
        Si cambiamos esta política, actualizaremos la fecha de arriba. Si el
        cambio es importante, te avisaremos dentro de la app.
      </p>
    ),
  },
];

export default function PrivacyPage(): React.ReactElement {
  return (
    <LegalPage
      title="Política de Privacidad"
      intro={
        <p>
          Tu privacidad nos importa. Aquí te explicamos, en simple, qué datos
          guarda Coke Logger, para qué y qué control tienes sobre ellos. Esta
          política aplica tanto a la web como a la app para iPhone.
        </p>
      }
      sections={sections}
    />
  );
}
