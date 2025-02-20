import Breadcrumb from "../../components/Breadcrumb";

export default function About() {
  return (
    <>
      <div className="w-full mt-24">
        <Breadcrumb category={null} theme={null} showTitle={false} />
      </div>
      <div className="w-full px-6 sm:px-10 lg:px-24 py-12 bg-white">
        {/* Header */}
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Términos, Condiciones y Políticas de Privacidad
          </h1>
          <p className="text-sm text-gray-600 mt-2">Actualizado al 01 de febrero de 2025.</p>
        </div>

        {/* Content */}
        <div className="max-w-screen-lg mx-auto mt-4 space-y-6">
          <p className="text-base text-gray-700 leading-relaxed">
            Los presentes Términos y Condiciones (en adelante, los "Términos") regulan el uso de los activos digitales que brinda la Municipalidad de San Nicolás de los Arroyos (en adelante, la "Municipalidad") a través de sus sitios web ("Sitios") y aplicaciones relacionadas ("Aplicaciones"), denominados en su conjunto "Activos Digitales". El uso de los activos digitales implica la aceptación incondicional de estos Términos.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad se reserva el derecho de modificar estos Términos en cualquier momento sin previo aviso, comprometiéndose a publicar las modificaciones indicando la fecha de actualización. El uso continuo por parte de los usuarios significa la aceptación de dichos cambios.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Acceso y Uso de los Activos Digitales</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            El acceso a los activos digitales es libre y gratuito. Sin embargo, algunos activos digitales pueden requerir autenticación mediante usuario y contraseña. Además, ciertos servicios pueden estar sujetos a términos adicionales.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Propiedad Intelectual</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Los usuarios reconocen que todo contenido publicado en los activos digitales es propiedad de la Municipalidad o cuenta con las licencias necesarias para su uso. Salvo disposiciones específicas, los datos abiertos pueden ser utilizados, reproducidos y modificados siempre que se haga referencia a la licencia Creative Commons 4.0 correspondiente.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Privacidad y Protección de Datos Personales</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad recopila datos personales de los usuarios en cumplimiento de la Ley 25.326 de Protección de Datos Personales. Los datos proporcionados serán utilizados para mejorar la calidad de los servicios, optimizar trámites y facilitar la comunicación con los ciudadanos.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Los usuarios aceptan que sus datos puedan ser utilizados por la Municipalidad y/o transferidos dentro de su infraestructura de servidores. La Municipalidad se compromete a no compartir datos personales con terceros sin consentimiento previo, salvo disposiciones legales aplicables.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Perfil Digital del Usuario</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Al crear un Perfil Digital, el usuario proporcionará datos personales que serán almacenados en una base de datos con el fin de:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Facilitar el acceso centralizado a trámites administrativos.</li>
            <li>Recibir notificaciones sobre expedientes y solicitudes.</li>
            <li>Acceder a inscripciones a cursos y capacitaciones. </li>
            <li>Interactuar con servicios municipales.</li>
          </ul>
          <p className="text-base text-gray-700 leading-relaxed">
            La información recibida a través del Perfil Digital es confidencial y no será divulgada sin el consentimiento del usuario, salvo requerimiento de autoridad competente o disposición legal.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Seguridad de la Información</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad implementa medidas de seguridad para proteger la información almacenada en sus sistemas. Sin embargo, no garantiza que sus plataformas estén exentas de vulnerabilidades. El usuario es responsable de mantener la confidencialidad de su información de acceso y de notificar cualquier actividad sospechosa.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Limitación de Responsabilidad</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad no será responsable por daños derivados del uso de los activos digitales, incluyendo interrupciones del servicio, errores en la información publicada o acceso no autorizado a datos.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Contacto</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Para consultas sobre estos Términos y Condiciones, los usuarios pueden comunicarse con la Municipalidad de San Nicolás de los Arroyos a través de sus canales oficiales.
          </p>
        </div>
      </div>
    </>
  );
}
