import Breadcrumb from "../../components/Breadcrumb";

export default function About() {
  return (
    <>
      <div className="w-full mt-24">
        <Breadcrumb
          category={null} // No se necesita categoría para este caso
          theme={null} // Tampoco hay tema
          showTitle={false} // Solo mostramos la flecha para regresar
        />
      </div>
      <div className="w-full px-6 sm:px-10 lg:px-24 py-12 bg-white">
        {/* Header */}
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Términos, condiciones y políticas de privacidad
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Actualizado al 24 de diciembre de 2021.{" "}
            <span className="underline select-none" rel="noopener noreferrer">
              Decreto Nº 2098. ANEXO II
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="max-w-screen-lg mx-auto mt-8 space-y-6">
          {/* Section 1 */}
          <p className="text-base text-gray-700 leading-relaxed">
            Los presentes Términos y Condiciones (en adelante, los Términos)
            regulan el uso de los activos digitales que brinda la Municipalidad
            de Rosario, sus entes autárquicos, empresas, sociedades y demás
            organismos descentralizados (en adelante, la “Municipalidad”) a
            través de sus sitios web (Sitios) y aplicaciones relacionadas
            (Aplicaciones), denominados en su conjunto “Activos Digitales”. El
            uso de los activos digitales indica la aceptación incondicional de
            estos Términos.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad se reserva el derecho de cambiar o modificar partes
            de estos Términos en cualquier momento, sin comunicación previa,
            comprometiéndose a publicar las modificaciones indicando la fecha en
            que fueron actualizados. Su uso continuo por parte de los Usuarios
            significa la aceptación de esos cambios.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            El acceso a los activos digitales es libre y gratuito. Sin embargo,
            otros activos digitales requieren un ingreso con usuario o registro.
            Además, al usar ciertos Activos Digitales, el usuario puede estar
            sujeto a Términos adicionales.
          </p>

          {/* Section 2 */}
          <h3 className="text-xl font-semibold text-gray-800 mt-8">
            Propiedad intelectual
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Los usuarios reconocen que todo contenido que se encuentra publicado
            en los activos digitales es de propiedad de la Municipalidad,
            pudiendo hacer uso de los mismos, reproducirlos, y/o modificarlos
            siempre y cuando hagan referencia a la licencia Creative Commons 4.0
            especificada en cada Activo Digital.
          </p>

          {/* Section 3 */}
          <h3 className="text-xl font-semibold text-gray-800 mt-8">
            Privacidad - Protección de Datos Personales
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Cuando los usuarios interactúan con la Municipalidad a través de los
            activos digitales pueden proporcionar Datos personales. En dichos
            casos, la Municipalidad actúa bajo el cumplimiento de la Ley 25.326
            de Protección de Datos Personales.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            Al proporcionar Datos Personales, los Usuarios reconocen y aceptan
            que dichos datos puedan ser utilizados por la Municipalidad y/o
            transferidos desde su ubicación actual a las oficinas y/o servidores
            de la Municipalidad. La Municipalidad proporciona a los Usuarios los
            recursos técnicos adecuados para que tomen conocimiento de las
            presentes Políticas de Privacidad.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad no recopila ni trata ningún tipo de información
            personal por parte de los Usuarios sin que la misma sea
            explícitamente provista voluntariamente.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            La Municipalidad, mantiene absoluta confidencialidad acerca de los
            Datos Personales que recopila y puede utilizar esta información para
            comunicarse con los Usuarios para informarle sobre servicios y/o
            trámites que considera de interés. En estos casos, el usuario tendrá
            disponible la opción de dejar de recibir dicha comunicación.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            Al crear su Perfil Digital el Usuario deberá consignar sus datos
            personales en un formulario que contiene campos obligatorios y
            campos opcionales. Los datos solicitados serán utilizados para su
            inclusión en una base de datos de Perfil Digital a fin de satisfacer
            y optimizar los servicios prestados por la Municipalidad al
            ciudadano; permitir al Usuario acceder de una manera centralizada a
            los trámites en curso, a los expedientes administrativos, a las
            solicitudes que deban tramitarse ante la Municipalidad, a las
            notificaciones de sus trámites, inscripciones a capacitaciones y/o
            cursos y todo aquél acto administrativo en el cual el ciudadano deba
            interactuar con la Municipalidad.
          </p>

          <p className="text-base text-gray-700 leading-relaxed">
            Toda información que sea recibida a través del Perfil Digital,
            determinada por ley y referida a los Usuarios, es confidencial y no
            puede hacerse pública sin el consentimiento previo de aquellos,
            salvo que sea requerida por la autoridad competente, cumpliendo con
            las normas y recaudos establecidos para la protección de datos
            personales o en en virtud de una disposición legal que así lo
            establezca.
          </p>
        </div>
      </div>
    </>
  );
}
