import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './Condiciones.css';

// Text dictionary of each legal section for counting search matches
const SECTION_TEXTS = {
  'gen-1': 'I. Envío Se entenderá por tal, todo sobre, bulto o valija asociado a una Orden de Flete (en adelante OF). Para efectos de emisión se considerará sobre todo envío en embalaje flexible, cuyas medidas máximas sean largo 35cm, ancho 20cm, alto 5cm y cuyo peso no exceda de 300 gramos. Todo envío que exceda las dimensiones y peso anteriormente indicado será considerado bulto o valija.',
  'gen-2': 'II. Restricciones del Servicio STARKEN no transportará: dinero; documentos valorados, tales como vale vista, cheques, boletas de garantía; joyas en general, obras de arte, especies suntuosas; armas; sustancias peligrosas tales como explosivos, corrosivos, inflamables sólidos o líquidos, gases comprimidos; sustancias tóxicas e infecciosas; muestras y exámenes médicos; animales vivos o muertos; restos biológicos; restos mortales; drogas y estupefacientes cuya comercialización se encuentre prohibida; elementos radiactivos, nucleares; mercaderías declaradas y catalogadas como peligrosas; productos perecibles, entendiéndose por tales los que requieren condiciones especiales de conservación o cadenas de frío, como carnes, pescados y mariscos, y en general especies que requieran de condiciones especiales de transporte. Cargas consideradas legalmente peligrosas de acuerdo a las normas chilenas 382 Of 89 y NCh 2120/1 al 9 Of 89, y DSL 298, las normas sobre transporte aéreo y las que dicten la Dirección General de Aeronáutica Civil, la Organización de Aviación Civil Internacional (OACI) y la International Air Transport Association (IATA). Inspección y control: STARKEN se reserva el derecho de inspeccionar el envío y realizar denuncias ante las autoridades pertinentes cuando haya indicios o sospechas de que el envío pueda afectar a terceros o la seguridad pública. Ambos, remitente y destinatario, declaran conocer eventuales responsabilidades civiles y/o penales por el contenido del envío.',
  'gen-3': 'III. Emisión de la Orden de Flete (OF) El Remitente deberá proporcionar al momento de la emisión aquella información necesaria, completa y suficiente para que STARKEN cumpla con su cometido. En vista de lo anterior, serán de su exclusiva responsabilidad los errores u omisiones respecto de: Nombre, domicilio, RUT y medio de contacto del Remitente (teléfono, correo electrónico). Declaración de contenido del envío. Valor declarado del envío y documentos de respaldo. Nombre, domicilio, RUT y medio de contacto del Destinatario (teléfono, correo electrónico). Corresponderá al Remitente proporcionar a STARKEN toda aquella documentación legalmente necesaria para el libre tránsito de la carga. En consecuencia, son de su exclusiva responsabilidad los comisos, multas y, en general, cualquier perjuicio que sufra STARKEN por estar desprovisto de los documentos antes señalados.',
  'gen-4': 'IV. Determinación del Precio y Pago del Servicio Para calcular el precio del envío se utilizará el mayor valor entre el peso físico and el peso volumétrico del envío. Este último se calcula multiplicando largo/ancho/alto en centímetros y dividiendo su resultado por 4000. Lo anterior representa una tarifa equivalente a 250 kilogramos por metro cúbico. El precio determinado en la forma precedentemente indicada no considera aranceles, impuestos, tasas u otras sumas de dinero que el Remitente deba cancelar con ocasión del envío. Por regla general, el pago corresponderá al Remitente, sin perjuicio de contratar el servicio "por pagar" con cargo al Destinatario.',
  'gen-5': 'V. Declaración de Contenido y Valor Respecto de los envíos catalogados como bulto o valija cuyo valor a declarar exceda los $50.000.- (cincuenta mil pesos) deberá el Remitente respaldar dicha declaración con documentación que tenga validez legal para ello (boletas, facturas o guías de despacho valoradas, sus copias o número de referencia). El monto máximo a declarar por OF será de $3.000.000.- Importante: Para el caso de persistir en el envío sin contar con la documentación de respaldo del valor que se pretende declarar, solo podrá valorar este como máximo en $50.000.- STARKEN se reserva el derecho a inspeccionar el envío previo a la emisión para comprobar su estado, especialmente en celulares, notebooks y artículos tecnológicos en general. Respecto a envíos catalogados como sobre, reconoce el Remitente que los documentos enviados no tienen valor intrínseco ni valor de emisión, y en vista de lo anterior, el monto máximo a declarar será de $5.000.- Cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión.',
  'gen-6': 'VI. Embalaje STARKEN recibe los envíos sellados y embalados por el Remitente, por lo que no participa de esta labor. Sin perjuicio de ello, se reserva el derecho de no transportar cualquier envío que no cumpla con un embalaje adecuado acorde con el contenido declarado. La admisión del envío en caso alguno constituye aceptación de que este se encuentre embalado en condiciones óptimas, aceptando el Remitente que cualquier daño debido a la deficiencia del embalaje será de su exclusiva responsabilidad. STARKEN no proporciona tratamiento especial para envíos signados como "frágil" o con marcas similares, por lo que el embalaje del remitente deberá considerar esta circunstancia.',
  'gen-7': 'VII. Prestación del Servicio STARKEN transportará el envío hasta entregarlo a su Destinatario o a la persona adulta que se encuentre en el domicilio de destino indicado en la respectiva OF. Para áreas comunes de recepción (portería, recepción de edificios), la entrega se verificará en dicho lugar. Nuestro servicio finaliza con la entrega conforme. Si la primera entrega en domicilio resultara frustrada por causa ajena a STARKEN, realizaremos un segundo intento de forma gratuita. Para los retiros en sucursal por un tercero distinto del destinatario, será necesario presentar una carta poder simple, copia de la cédula del destinatario y la OF correspondiente.',
  'gen-8': 'VIII. Imposibilidad de Entrega, No Retiro y Abandono de la Carga Cuando el Destinatario se niegue a recibir la carga, o posterior a dos intentos fallidos de entrega a domicilio, o bien, no se retire el envío desde la sucursal de destino, se procederá del modo siguiente: El envío permanecerá en poder de STARKEN por un plazo de 10 días hábiles. STARKEN contactará al Remitente o Destinatario para informarlo, siendo su responsabilidad instruir a STARKEN sobre el destino del envío. Transcurrido dicho plazo sin instrucciones, el envío se entenderá abandonado legalmente y se destinará a bodegas de rezago. Para recuperar una carga en bodegas de rezago, el cliente deberá pagar previamente 0,1 UF por kilo por cada día de bodegaje transcurrido. Transcurridos 6 meses desde el aviso sin reclamos, de acuerdo con el Art. 230 del Código de Comercio, se procederá al remate de la carga.',
  'gen-9': 'IX. Nuestra Responsabilidad Desde la recepción del envío y emisión de la OF, STARKEN es responsable por el transporte y entrega conforme de la carga. Sin embargo, STARKEN no responderá por envíos que infrinjan las prohibiciones del numeral II, o en situaciones de fuerza mayor, caso fortuito, factores climáticos severos, vandalismo, o actos de autoridad que impidan el libre tránsito. Nuestra responsabilidad estará limitada siempre por el valor declarado en la respectiva OF, y en caso alguno considerará valores comerciales intangibles o ganancias esperadas.',
  'gen-10': 'X. Reclamos Todo reclamo originado con ocasión de la prestación del servicio deberá materializarse a través de nuestro formulario en línea o formularios físicos disponibles en nuestras sucursales a lo largo del país. Su tramitación observará las normas de nuestro Procedimiento de Reclamos.',
  'gen-11': 'XI. Declaración Remitente y Destinatario declaran conocer y aceptan que la OF constituye para todos los efectos legales la materialización del Contrato de Transporte de Carga, por lo que los efectos de este se regularán teniendo a la vista siempre las declaraciones y documentos acompañados al momento de la emisión.',
  'gen-12': 'XII. Datos Personales STARKEN asegura la confidencialidad de los datos personales de los consumidores necesarios para la prestación del servicio (nombre, RUT, teléfono, correo electrónico y dirección). Ha adoptado todas las medidas técnicas de seguridad para cuidar los datos de acuerdo a la Ley N° 19.628. El titular podrá en todo momento solicitar la información, rectificación, eliminación o cancelación de sus datos de nuestros registros.',
  'gen-13': 'XIII. Normativa Aplicable Sin perjuicio de las presentes condiciones, son aplicables además a los servicios ofrecidos por STARKEN la normativa del Código de Comercio relativa a Transporte de Carga Terrestre, Ley de Protección de los Derechos del Consumidor y demás normativa que resultara aplicable.',
  'gen-14': 'XIV. Vigencia Las presentes condiciones entraron en vigencia a contar del 20 de junio de 2022. Se mantendrán publicadas de forma permanente en nuestro sitio web y copias físicas estarán a disposición de los clientes en todas las sucursales del país.',
  'rec-1': 'I. Ingreso del Reclamo Al momento de ingresar el reclamo, el cliente deberá aportar los siguientes antecedentes indispensables: Número de Orden de Flete (OF). Correo electrónico y teléfono de contacto. Indicar calidad del reclamante (Remitente o Destinatario). Para envíos declarados sobre $50.000.-, adjuntar copia del documento de respaldo (boleta, factura o guía de despacho valorada). Especificar detalladamente la causa del reclamo (daño, merma o pérdida).',
  'rec-2': 'II. Recepción y Plazos de Resolución Una vez recibido el reclamo, se asignará un número de folio que será informado al reclamante. A partir de esa fecha, comenzará a regir el plazo de 20 días hábiles para emitir una resolución formal (de lunes a viernes, excluyendo feriados). Solicitud de antecedentes adicionales: Durante la tramitación, STARKEN podrá solicitar antecedentes complementarios (como fotografías o facturas). Si el reclamante no los proporciona en un plazo de 5 días hábiles desde la solicitud, el reclamo se cerrará por abandono.',
  'rec-3': 'III. Resolución y Finiquito Posterior a la revisión, STARKEN notificará si el reclamo es "ACOGE" o "RECHAZA". En caso de rechazo, se adjuntará una carta fundamentada explicando las razones. Si es acogido, se procederá a la firma de un finiquito digital mediante firma electrónica simple proporcionada por STARKEN. El abono del monto acordado se transferirá a la cuenta bancaria del reclamante dentro de los 5 días hábiles siguientes a la firma del finiquito.',
  'rec-4': 'IV. Reconsideración El reclamante podrá solicitar la reconsideración de la resolución dentro de los 3 días hábiles siguientes a su notificación. Esta solicitud será resuelta por STARKEN en un plazo máximo de 5 días hábiles adicionales, notificando su decisión final ("ACOGE" o "RECHAZA") y dando por cerrado el proceso.',
  'ind-1': 'I. Montos por Extravíos o Mermas en Bultos y Valijas La indemnización se calcula según la existencia de la documentación de respaldo: I.I. Envíos con valor declarado hasta $50.000 (Sin Documento) Se indemnizará el valor declarado por el remitente en la OF (con un tope máximo de $50.000.-) más el costo total del flete pagado en origen. En caso de mermas parciales, se pagará un monto proporcional. I.II. Envíos con valor declarado mayor a $50.000 (Con Documento de Respaldo) Se indemnizará el valor neto reflejado en la documentación tributaria válida (boleta o factura) correspondiente a las especies, aplicando la escala de depreciación por antigüedad antes descrita, más el costo total del flete pagado.',
  'ind-2': 'II. Indemnizaciones por Daños o Desperfectos Si la especie transportada sufre daños físicos que no se encuentren excluidos por las condiciones generales: Daño Total (Objeto inservible): Se indemnizará conforme a las reglas de extravío (valor de boleta/factura con depreciación). La especie dañada pasará a ser propiedad de STARKEN y debe ser entregada en nuestras bodegas antes de cursar el pago. Daño Parcial (Objeto reparable): Se indemnizarán únicamente los costos acreditados de reparación o servicio técnico formal, los cuales en ningún caso podrán exceder el valor declarado en la respectiva OF.',
  'ind-3': 'III. Extravío, Daño o Merma en Sobres De acuerdo con lo establecido en las condiciones generales, los sobres transportan documentos que no tienen valor intrínseco. Por ende, la indemnización máxima aplicable a sobres extraviados o dañados está topada en $5.000.- (cinco mil pesos), más la devolución del valor de flete pagado en origen.',
  'ind-4': 'IV. Consideraciones Específicas sobre Deterioros o Faltantes Conforme al artículo 184 del Código de Comercio, si el faltante o deterioro es visible externamente al momento de la entrega, el cliente está obligado a abrir la encomienda y efectuar la reserva por escrito en el acta de recepción en ese mismo acto. STARKEN no responderá por reclamos posteriores si el paquete fue recibido conforme sin haber dejado constancia escrita de las anomalías externas del embalaje.'
};

const MENU_ITEMS = {
  generales: [
    { id: 'gen-1', label: 'I. Envío' },
    { id: 'gen-2', label: 'II. Restricciones del Servicio' },
    { id: 'gen-3', label: 'III. Emisión de la OF' },
    { id: 'gen-4', label: 'IV. Precio y Pago' },
    { id: 'gen-5', label: 'V. Declaración y Valor' },
    { id: 'gen-6', label: 'VI. Embalaje' },
    { id: 'gen-7', label: 'VII. Prestación del Servicio' },
    { id: 'gen-8', label: 'VIII. Imposibilidad de Entrega' },
    { id: 'gen-9', label: 'IX. Nuestra Responsabilidad' },
    { id: 'gen-10', label: 'X. Reclamos' },
    { id: 'gen-11', label: 'XI. Declaración Contrato' },
    { id: 'gen-12', label: 'XII. Datos Personales' },
    { id: 'gen-13', label: 'XIII. Normativa Aplicable' },
    { id: 'gen-14', label: 'XIV. Vigencia' }
  ],
  reclamos: [
    { id: 'rec-1', label: 'I. Ingreso de Reclamos' },
    { id: 'rec-2', label: 'II. Recepción y Plazos' },
    { id: 'rec-3', label: 'III. Resolución' },
    { id: 'rec-4', label: 'IV. Reconsideración' }
  ],
  indemnizaciones: [
    { id: 'ind-1', label: 'I. Extravíos o Mermas' },
    { id: 'ind-2', label: 'II. Daños o Desperfectos' },
    { id: 'ind-3', label: 'III. Extravío de Sobres' },
    { id: 'ind-4', label: 'IV. Deterioro o Faltante' }
  ]
};

const Condiciones = () => {
  const [activeTab, setActiveTab] = useState('generales');
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll height to show/hide the back-to-top button
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  // Match counter helper
  const countMatches = (sectionId, query) => {
    if (!query || !SECTION_TEXTS[sectionId]) return 0;
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === '') return 0;
    
    const text = SECTION_TEXTS[sectionId].toLowerCase();
    try {
      const escapedQuery = normalizedQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'g');
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  };

  const getMatchCount = (sectionId) => {
    return countMatches(sectionId, searchQuery);
  };

  const getTabTotalMatches = () => {
    if (!searchQuery) return 0;
    return MENU_ITEMS[activeTab].reduce((acc, item) => acc + getMatchCount(item.id), 0);
  };

  // DOM Highlight effect whenever query or active tab changes
  useEffect(() => {
    const container = document.querySelector('.condiciones-text-content');
    if (!container) return;

    // Remove existing highlights
    const marks = container.querySelectorAll('mark.search-highlight');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });

    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    
    const highlightNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(query);
        if (index >= 0) {
          const parent = node.parentNode;
          if (parent.tagName === 'MARK' || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;

          const matchLength = query.length;
          const matchText = text.substring(index, index + matchLength);
          const beforeText = text.substring(0, index);
          const afterText = text.substring(index + matchLength);

          const fragment = document.createDocumentFragment();
          if (beforeText) fragment.appendChild(document.createTextNode(beforeText));

          const mark = document.createElement('mark');
          mark.className = 'search-highlight';
          mark.textContent = matchText;
          fragment.appendChild(mark);

          if (afterText) {
            const remainingTextNode = document.createTextNode(afterText);
            fragment.appendChild(remainingTextNode);
            highlightNode(remainingTextNode); // recursive call for subsequent matches in same text node
          }

          parent.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length > 0) {
        const children = Array.from(node.childNodes);
        children.forEach(highlightNode);
      }
    };

    highlightNode(container);
  }, [searchQuery, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveSection('');
    
    const tabsElement = document.querySelector('.condiciones-tabs-nav');
    if (tabsElement) {
      const offset = 140; // Height of sticky navbar + spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const tabsRect = tabsElement.getBoundingClientRect().top;
      const tabsPosition = tabsRect - bodyRect;
      window.scrollTo({ top: tabsPosition - offset, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Height of sticky navbar + a bit of spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="condiciones-page">
      {/* Hero Banner Section */}
      <section className="condiciones-hero">
        <div className="condiciones-hero-overlay"></div>
        <div className="condiciones-hero-container">
          <h1 className="condiciones-hero-title">Condiciones de Servicio</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="condiciones-main-container">
        {/* Page Intro Section on Grey Background */}
        <div className="condiciones-page-intro">
          <p className="condiciones-intro-subtitle">
            Transparencia y claridad en cada envío. Consulta nuestros términos legales,<br />
            políticas de reclamos e indemnizaciones vigentes.
          </p>
          <div className="condiciones-intro-meta">
            Última actualización: 20 de Junio de 2022
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="condiciones-tabs-nav">
          <button 
            className={`tab-nav-btn ${activeTab === 'generales' ? 'active' : ''}`}
            onClick={() => handleTabChange('generales')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Condiciones Generales</span>
              <span className="tab-desc">De Servicio y Transporte</span>
            </div>
          </button>

          <button 
            className={`tab-nav-btn ${activeTab === 'reclamos' ? 'active' : ''}`}
            onClick={() => handleTabChange('reclamos')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Procedimiento de Reclamos</span>
              <span className="tab-desc">Ingreso, plazos y resolución</span>
            </div>
          </button>

          <button 
            className={`tab-nav-btn ${activeTab === 'indemnizaciones' ? 'active' : ''}`}
            onClick={() => handleTabChange('indemnizaciones')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Políticas de Indemnización</span>
              <span className="tab-desc">Bultos, sobres y mermas</span>
            </div>
          </button>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="condiciones-grid">
          {/* Sidebar Column */}
          <aside className="condiciones-sidebar-column">
            {/* Promo Help Card (Static, above contents) */}
            <div className="sidebar-promo">
              <h4>¿Necesitas ayuda?</h4>
              <p>Si tienes dudas con tu envío o quieres ingresar una solicitud formal, puedes contactarnos en sucursales o en nuestro sitio.</p>
              <a href="#" className="sidebar-promo-btn">Centro de Ayuda</a>
            </div>

            {/* Sticky Sidebar Navigation */}
            <div className="condiciones-sidebar">
              <div className="sidebar-inner">
                <h3 className="sidebar-title">Contenidos</h3>
                
                {/* Sidebar Search Bar Input */}
                <div className="sidebar-search-container">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Buscador por palabra"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sidebar-search-input"
                  />
                  {searchQuery && (
                    <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="sidebar-divider"></div>
                
                <ul className="sidebar-menu">
                  {MENU_ITEMS[activeTab].map((item) => {
                    const matchCount = getMatchCount(item.id);
                    return (
                      <li key={item.id}>
                        <button 
                          onClick={() => scrollToElement(item.id)} 
                          className={`${activeSection === item.id ? 'active' : ''} ${searchQuery && matchCount === 0 ? 'no-match' : ''}`}
                        >
                          <span className="menu-item-label">{item.label}</span>
                          {searchQuery && matchCount > 0 && (
                            <span className="sidebar-match-badge">{matchCount}</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <main className="condiciones-text-content">
            {searchQuery && getTabTotalMatches() === 0 ? (
              <div className="search-no-results animate-fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h4>No se encontraron coincidencias</h4>
                <p>No hay resultados para "{searchQuery}" en la sección actual. Intenta buscar otra palabra o cambia de pestaña.</p>
              </div>
            ) : (
              <>
                {activeTab === 'generales' && (
              <div className="content-tab-panel animate-fade-in">
                <div className="section-intro">
                  <h2>Condiciones Generales de Servicios</h2>
                  <p className="intro-text">
                    Las presentes condiciones generales son aplicables al segmento natural, MIPYME y PYME de STARKEN. Excluyen expresamente el segmento de cuenta corriente corporativa. Al contratar nuestros servicios, aceptas estos términos, los cuales regulan el transporte de tus encomiendas a lo largo de todo Chile.
                  </p>
                </div>

                <div className="legal-blocks-list">
                  <div className="legal-item" id="gen-1">
                    <h3>I. Envío</h3>
                    <p>
                      Se entenderá por tal, todo sobre, bulto o valija asociado a una Orden de Flete (en adelante OF). Para efectos de emisión se considerará sobre todo envío en embalaje flexible, cuyas medidas máximas sean largo 35cm, ancho 20cm, alto 5cm y cuyo peso no exceda de 300 gramos. Todo envío que exceda las dimensiones y peso anteriormente indicado será considerado bulto o valija.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-2">
                    <h3>II. Restricciones del Servicio</h3>
                    <p>
                      STARKEN no transportará: dinero; documentos valorados, tales como vale vista, cheques, boletas de garantía; joyas en general, obras de arte, especies suntuosas; armas; sustancias peligrosas tales como explosivos, corrosivos, inflamables sólidos o líquidos, gases comprimidos; sustancias tóxicas e infecciosas; muestras y exámenes médicos; animales vivos o muertos; restos biológicos; restos mortales; drogas y estupefacientes cuya comercialización se encuentre prohibida; elementos radiactivos, nucleares; mercaderías declaradas y catalogadas como peligrosas; productos perecibles, entendiéndose por tales los que requieren condiciones especiales de conservación o cadenas de frío, como carnes, pescados y mariscos, y en general especies que requieran de condiciones especiales de transporte. Cargas consideradas legalmente peligrosas de acuerdo a las normas chilenas 382 Of 89 y NCh 2120/1 al 9 Of 89, y DSL 298, las normas sobre transporte aéreo y las que dicten la Dirección General de Aeronáutica Civil, la Organización de Aviación Civil Internacional (OACI) y la International Air Transport Association (IATA).
                    </p>
                    <div className="info-callout warning">
                      <strong>Inspección y control:</strong> STARKEN se reserva el derecho de inspeccionar el envío y realizar denuncias ante las autoridades pertinentes cuando haya indicios o sospechas de que el envío pueda afectar a terceros o la seguridad pública. Ambos, remitente y destinatario, declaran conocer eventuales responsabilidades civiles y/o penales por el contenido del envío.
                    </div>
                  </div>

                  <div className="legal-item" id="gen-3">
                    <h3>III. Emisión de la Orden de Flete (OF)</h3>
                    <p>
                      El Remitente deberá proporcionar al momento de la emisión aquella información necesaria, completa y suficiente para que STARKEN cumpla con su cometido. En vista de lo anterior, serán de su exclusiva responsabilidad los errores u omisiones respecto de:
                    </p>
                    <ul>
                      <li>Nombre, domicilio, RUT y medio de contacto del Remitente (teléfono, correo electrónico).</li>
                      <li>Declaración de contenido del envío.</li>
                      <li>Valor declarado del envío y documentos de respaldo.</li>
                      <li>Nombre, domicilio, RUT y medio de contacto del Destinatario (teléfono, correo electrónico).</li>
                    </ul>
                    <p>
                      Corresponderá al Remitente proporcionar a STARKEN toda aquella documentación legalmente necesaria para el libre tránsito de la carga. En consecuencia, son de su exclusiva responsabilidad los comisos, multas y, en general, cualquier perjuicio que sufra STARKEN por estar desprovisto de los documentos antes señalados.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-4">
                    <h3>IV. Determinación del Precio y Pago del Servicio</h3>
                    <p>
                      Para calcular el precio del envío se utilizará el mayor valor entre el peso físico y el peso volumétrico del envío. Este último se calcula multiplicando largo/ancho/alto en centímetros y dividiendo su resultado por 4000. Lo anterior representa una tarifa equivalente a 250 kilogramos por metro cúbico.
                    </p>
                    <p>
                      El precio determinado en la forma precedentemente indicada no considera aranceles, impuestos, tasas u otras sumas de dinero que el Remitente deba cancelar con ocasión del envío. Por regla general, el pago corresponderá al Remitente, sin perjuicio de contratar el servicio "por pagar" con cargo al Destinatario.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-5">
                    <h3>V. Declaración de Contenido y Valor</h3>
                    <p>
                      Respecto de los envíos catalogados como bulto o valija cuyo valor a declarar exceda los $50.000.- (cincuenta mil pesos) deberá el Remitente respaldar dicha declaración con documentación que tenga validez legal para ello (boletas, facturas o guías de despacho valoradas, sus copias o número de referencia). El monto máximo a declarar por OF será de $3.000.000.-
                    </p>
                    <div className="info-callout highlight">
                      <strong>Importante:</strong> Para el caso de persistir en el envío sin contar con la documentación de respaldo del valor que se pretende declarar, solo podrá valorar este como máximo en $50.000.- STARKEN se reserva el derecho a inspeccionar el envío previo a la emisión para comprobar su estado, especialmente en celulares, notebooks y artículos tecnológicos en general.
                    </div>
                    <p>
                      Respecto a envíos catalogados como sobre, reconoce el Remitente que los documentos enviados no tienen valor intrínseco ni valor de emisión, y en vista de lo anterior, el monto máximo a declarar será de $5.000.- Cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-6">
                    <h3>VI. Embalaje</h3>
                    <p>
                      STARKEN recibe los envíos sellados y embalados por el Remitente, por lo que no participa de esta labor. Sin perjuicio de ello, se reserva el derecho de no transportar cualquier envío que no cumpla con un embalaje adecuado acorde con el contenido declarado.
                    </p>
                    <p>
                      La admisión del envío en caso alguno constituye aceptación de que este se encuentre embalado en condiciones óptimas, aceptando el Remitente que cualquier daño debido a la deficiencia del embalaje será de su exclusiva responsabilidad. STARKEN no proporciona tratamiento especial para envíos signados como "frágil" o con marcas similares, por lo que el embalaje del remitente deberá considerar esta circunstancia.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-7">
                    <h3>VII. Prestación del Servicio</h3>
                    <p>
                      STARKEN transportará el envío hasta entregarlo a su Destinatario o a la persona adulta que se encuentre en el domicilio de destino indicado en la respectiva OF. Para áreas comunes de recepción (portería, recepción de edificios), la entrega se verificará en dicho lugar.
                    </p>
                    <p>
                      Nuestro servicio finaliza con la entrega conforme. Si la primera entrega en domicilio resultara frustrada por causa ajena a STARKEN, realizaremos un segundo intento de forma gratuita. Para los retiros en sucursal por un tercero distinto del destinatario, será necesario presentar una carta poder simple, copia de la cédula del destinatario y la OF correspondiente.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-8">
                    <h3>VIII. Imposibilidad de Entrega, No Retiro y Abandono de la Carga</h3>
                    <p>
                      Cuando el Destinatario se niegue a recibir la carga, o posterior a dos intentos fallidos de entrega a domicilio, o bien, no se retire el envío desde la sucursal de destino, se procederá del modo siguiente:
                    </p>
                    <ol>
                      <li>El envío permanecerá en poder de STARKEN por un plazo de 10 días hábiles.</li>
                      <li>STARKEN contactará al Remitente o Destinatario para informarlo, siendo su responsabilidad instruir a STARKEN sobre el destino del envío.</li>
                      <li>Transcurrido dicho plazo sin instrucciones, el envío se entenderá abandonado legalmente y se destinará a bodegas de rezago.</li>
                      <li>Para recuperar una carga en bodegas de rezago, el cliente deberá pagar previamente 0,1 UF por kilo por cada día de bodegaje transcurrido.</li>
                      <li>Transcurridos 6 meses desde el aviso sin reclamos, de acuerdo con el Art. 230 del Código de Comercio, se procederá al remate de la carga.</li>
                    </ol>
                  </div>

                  <div className="legal-item" id="gen-9">
                    <h3>IX. Nuestra Responsabilidad</h3>
                    <p>
                      Desde la recepción del envío y emisión de la OF, STARKEN es responsable por el transporte y entrega conforme de la carga. Sin embargo, STARKEN no responderá por envíos que infrinjan las prohibiciones del numeral II, o en situaciones de fuerza mayor, caso fortuito, factores climáticos severos, vandalismo, o actos de autoridad que impidan el libre tránsito.
                    </p>
                    <p>
                      Nuestra responsabilidad estará limitada siempre por el valor declarado en la respectiva OF, y en caso alguno considerará valores comerciales intangibles o ganancias esperadas.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-10">
                    <h3>X. Reclamos</h3>
                    <p>
                      Todo reclamo originado con ocasión de la prestación del servicio deberá materializarse a través de nuestro formulario en línea o formularios físicos disponibles en nuestras sucursales a lo largo del país. Su tramitación observará las normas de nuestro Procedimiento de Reclamos.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-11">
                    <h3>XI. Declaración</h3>
                    <p>
                      Remitente y Destinatario declaran conocer y aceptan que la OF constituye para todos los efectos legales la materialización del Contrato de Transporte de Carga, por lo que los efectos de este se regularán teniendo a la vista siempre las declaraciones y documentos acompañados al momento de la emisión.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-12">
                    <h3>XII. Datos Personales</h3>
                    <p>
                      STARKEN asegura la confidencialidad de los datos personales de los consumidores necesarios para la prestación del servicio (nombre, RUT, teléfono, correo electrónico y dirección). Ha adoptado todas las medidas técnicas de seguridad para cuidar los datos de acuerdo a la Ley N° 19.628. El titular podrá en todo momento solicitar la información, rectificación, eliminación o cancelación de sus datos de nuestros registros.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-13">
                    <h3>XIII. Normativa Aplicable</h3>
                    <p>
                      Sin perjuicio de las presentes condiciones, son aplicables además a los servicios ofrecidos por STARKEN la normativa del Código de Comercio relativa a Transporte de Carga Terrestre, Ley de Protección de los Derechos del Consumidor y demás normativa que resultara aplicable.
                    </p>
                  </div>

                  <div className="legal-item" id="gen-14">
                    <h3>XIV. Vigencia</h3>
                    <p>
                      Las presentes condiciones entraron en vigencia a contar del 20 de junio de 2022. Se mantendrán publicadas de forma permanente en nuestro sitio web y copias físicas estarán a disposición de los clientes en todas las sucursales del país.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reclamos' && (
              <div className="content-tab-panel animate-fade-in">
                <div className="section-intro">
                  <h2>Procedimiento de Reclamos</h2>
                  <p className="intro-text">
                    En STARKEN nos esforzamos por dar una rápida resolución a tus inconvenientes. A continuación, te presentamos de forma detallada el proceso y los plazos aplicables para la tramitación de reclamos formales por pérdidas, mermas o daños en el transporte.
                  </p>
                </div>

                {/* Claims Timeline Widget */}
                <div className="reclamos-timeline">
                  <div className="timeline-step">
                    <div className="step-number">1</div>
                    <div className="step-info">
                      <h4>Ingreso</h4>
                      <p>Envío de datos del reclamo en web o sucursal.</p>
                    </div>
                  </div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-step">
                    <div className="step-number">2</div>
                    <div className="step-info">
                      <h4>Recepción</h4>
                      <p>Asignación de folio e inicio del plazo de resolución.</p>
                    </div>
                  </div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-step">
                    <div className="step-number">3</div>
                    <div className="step-info">
                      <h4>Resolución</h4>
                      <p>Notificación de acogida o rechazo en 20 días hábiles.</p>
                    </div>
                  </div>
                </div>

                <div className="legal-blocks-list">
                  <div className="legal-item" id="rec-1">
                    <h3>I. Ingreso del Reclamo</h3>
                    <p>
                      Al momento de ingresar el reclamo, el cliente deberá aportar los siguientes antecedentes indispensables:
                    </p>
                    <ul>
                      <li>Número de Orden de Flete (OF).</li>
                      <li>Correo electrónico y teléfono de contacto.</li>
                      <li>Indicar calidad del reclamante (Remitente o Destinatario).</li>
                      <li>Para envíos declarados sobre $50.000.-, adjuntar copia del documento de respaldo (boleta, factura o guía de despacho valorada).</li>
                      <li>Especificar detalladamente la causa del reclamo (daño, merma o pérdida).</li>
                    </ul>
                  </div>

                  <div className="legal-item" id="rec-2">
                    <h3>II. Recepción y Plazos de Resolución</h3>
                    <p>
                      Una vez recibido el reclamo, se asignará un número de folio que será informado al reclamante. A partir de esa fecha, comenzará a regir el plazo de <strong>20 días hábiles</strong> para emitir una resolución formal (de lunes a viernes, excluyendo feriados).
                    </p>
                    <div className="info-callout warning">
                      <strong>Solicitud de antecedentes adicionales:</strong> Durante la tramitación, STARKEN podrá solicitar antecedentes complementarios (como fotografías o facturas). Si el reclamante no los proporciona en un plazo de 5 días hábiles desde la solicitud, el reclamo se cerrará por abandono.
                    </div>
                  </div>

                  <div className="legal-item" id="rec-3">
                    <h3>III. Resolución y Finiquito</h3>
                    <p>
                      Posterior a la revisión, STARKEN notificará si el reclamo es "ACOGE" o "RECHAZA". En caso de rechazo, se adjuntará una carta fundamentada explicando las razones.
                    </p>
                    <p>
                      Si es acogido, se procederá a la firma de un finiquito digital mediante firma electrónica simple proporcionada por STARKEN. El abono del monto acordado se transferirá a la cuenta bancaria del reclamante dentro de los <strong>5 días hábiles</strong> siguientes a la firma del finiquito.
                    </p>
                  </div>

                  <div className="legal-item" id="rec-4">
                    <h3>IV. Reconsideración</h3>
                    <p>
                      El reclamante podrá solicitar la reconsideración de la resolución dentro de los 3 días hábiles siguientes a su notificación. Esta solicitud será resuelta por STARKEN en un plazo máximo de 5 días hábiles adicionales, notificando su decisión final ("ACOGE" o "RECHAZA") y dando por cerrado el proceso.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'indemnizaciones' && (
              <div className="content-tab-panel animate-fade-in">
                <div className="section-intro">
                  <h2>Política de Indemnizaciones</h2>
                  <p className="intro-text">
                    La siguiente política regula la determinación de los montos que STARKEN reembolsará en caso de siniestros imputables a nuestra operación. Los montos se calculan sobre el valor declarado neto, más la devolución de los costos de flete correspondientes.
                  </p>
                </div>

                {/* Document Age Table Widget */}
                <div className="indemnizaciones-widget">
                  <h4>Tabla de Depreciación por Antigüedad del Respaldo</h4>
                  <p className="widget-desc">La antigüedad del documento tributario presentado (boleta/factura) determina el porcentaje máximo sobre el valor declarado que se indemnizará:</p>
                  <div className="table-responsive">
                    <table className="indemnizacion-tabla">
                      <thead>
                        <tr>
                          <th>Antigüedad de la Boleta o Factura</th>
                          <th>Cobertura Máxima Autorizada</th>
                          <th>Ejemplo (Declarado $100.000)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Hasta 6 meses</strong></td>
                          <td className="coverage-high">100% del valor declarado</td>
                          <td>$100.000 + flete</td>
                        </tr>
                        <tr>
                          <td><strong>Entre 6 y 12 meses</strong></td>
                          <td className="coverage-medium">75% del valor declarado</td>
                          <td>$75.000 + flete</td>
                        </tr>
                        <tr>
                          <td><strong>Más de 1 año</strong></td>
                          <td className="coverage-low">50% del valor declarado</td>
                          <td>$50.000 + flete</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="legal-blocks-list">
                  <div className="legal-item" id="ind-1">
                    <h3>I. Montos por Extravíos o Mermas en Bultos y Valijas</h3>
                    <p>
                      La indemnización se calcula según la existencia de la documentación de respaldo:
                    </p>
                    <div className="ind-sub-item">
                      <h5>I.I. Envíos con valor declarado hasta $50.000 (Sin Documento)</h5>
                      <p>
                        Se indemnizará el valor declarado por el remitente en la OF (con un tope máximo de $50.000.-) más el costo total del flete pagado en origen. En caso de mermas parciales, se pagará un monto proporcional.
                      </p>
                    </div>
                    <div className="ind-sub-item">
                      <h5>I.II. Envíos con valor declarado mayor a $50.000 (Con Documento de Respaldo)</h5>
                      <p>
                        Se indemnizará el valor neto reflejado en la documentación tributaria válida (boleta o factura) correspondiente a las especies, aplicando la escala de depreciación por antigüedad antes descrita, más el costo total del flete pagado.
                      </p>
                    </div>
                  </div>

                  <div className="legal-item" id="ind-2">
                    <h3>II. Indemnizaciones por Daños o Desperfectos</h3>
                    <p>
                      Si la especie transportada sufre daños físicos que no se encuentren excluidos por las condiciones generales:
                    </p>
                    <ul>
                      <li><strong>Daño Total (Objeto inservible):</strong> Se indemnizará conforme a las reglas de extravío (valor de boleta/factura con depreciación). La especie dañada pasará a ser propiedad de STARKEN y debe ser entregada en nuestras bodegas antes de cursar el pago.</li>
                      <li><strong>Daño Parcial (Objeto reparable):</strong> Se indemnizarán únicamente los costos acreditados de reparación o servicio técnico formal, los cuales en ningún caso podrán exceder el valor declarado en la respectiva OF.</li>
                    </ul>
                  </div>

                  <div className="legal-item" id="ind-3">
                    <h3>III. Extravío, Daño o Merma en Sobres</h3>
                    <p>
                      De acuerdo con lo establecido en las condiciones generales, los sobres transportan documentos que no tienen valor intrínseco. Por ende, la indemnización máxima aplicable a sobres extraviados o dañados está topada en <strong>$5.000.- (cinco mil pesos)</strong>, más la devolución del valor de flete pagado en origen.
                    </p>
                  </div>

                  <div className="legal-item" id="ind-4">
                    <h3>IV. Consideraciones Específicas sobre Deterioros o Faltantes</h3>
                    <p>
                      Conforme al artículo 184 del Código de Comercio, si el faltante o deterioro es visible externamente al momento de la entrega, el cliente está obligado a abrir la encomienda y efectuar la reserva por escrito en el acta de recepción en ese mismo acto. STARKEN no responderá por reclamos posteriores si el paquete fue recibido conforme sin haber dejado constancia escrita de las anomalías externas del embalaje.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Document Downloads Section */}
            <div className="condiciones-downloads">
              <h3>Documentos Oficiales en PDF</h3>
              <p>Puedes descargar las versiones oficiales completas e imprimibles de nuestros documentos legales:</p>
              
              <div className="downloads-grid">
                <div className="download-card">
                  <div className="download-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                  </div>
                  <div className="download-card-info">
                    <h5>Condiciones Generales</h5>
                    <span>PDF (450 KB)</span>
                  </div>
                  <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                </div>

                <div className="download-card">
                  <div className="download-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                  </div>
                  <div className="download-card-info">
                    <h5>Procedimiento de Reclamos</h5>
                    <span>PDF (310 KB)</span>
                  </div>
                  <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                </div>

                <div className="download-card">
                  <div className="download-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                  </div>
                  <div className="download-card-info">
                    <h5>Política de Indemnizaciones</h5>
                    <span>PDF (280 KB)</span>
                  </div>
                  <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                </div>
              </div>
            </div>
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <HomeChatbot />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="scroll-to-top-btn animate-fade-in"
          aria-label="Volver arriba"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Condiciones;
