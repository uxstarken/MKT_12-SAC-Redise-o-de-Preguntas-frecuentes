import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Search, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Plane, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  X,
  FileText,
  Boxes,
  ShoppingBag,
  Send,
  User,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import './Internacional.css';

const Internacional = () => {
  const navigate = useNavigate();
  const [searchOffice, setSearchOffice] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // Tracking states
  const [trackingValue, setTrackingValue] = useState('');
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const helpRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'starken-box',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelpTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [helpRef]);

  const handleTrackingSearch = (e) => {
    if (e) e.preventDefault();
    if (trackingValue.trim()) {
      navigate(`/seguimiento?of=${trackingValue.trim()}`);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'starken-box',
        message: ''
      });
    }, 1000);
  };

  // Sucursales Alianza DHL Habilitadas
  const offices = [
    { name: 'Sucursal Santiago Centro', city: 'Santiago', address: 'Av. Libertador Bernardo O\'Higgins 1420', region: 'RM' },
    { name: 'Sucursal Las Condes', city: 'Santiago', address: 'Av. Apoquindo 4501', region: 'RM' },
    { name: 'Sucursal Providencia', city: 'Santiago', address: 'Av. Nueva Providencia 2155', region: 'RM' },
    { name: 'Sucursal Colina (Chicureo)', city: 'Colina', address: 'Av. Chicureo 130', region: 'RM' },
    { name: 'Sucursal Viña del Mar', city: 'Viña del Mar', address: 'Calle Valparaíso 580', region: 'Valparaíso' },
    { name: 'Sucursal Valparaíso Puerto', city: 'Valparaíso', address: 'Blanco 1190', region: 'Valparaíso' },
    { name: 'Sucursal Concepción Centro', city: 'Concepción', address: 'O\'Higgins 630', region: 'Biobío' },
    { name: 'Sucursal Antofagasta Centro', city: 'Antofagasta', address: 'San Martín 2450', region: 'Antofagasta' },
    { name: 'Sucursal Temuco Alemania', city: 'Temuco', address: 'Av. Alemania 0810', region: 'Araucanía' },
    { name: 'Sucursal Puerto Montt', city: 'Puerto Montt', address: 'Urmeneta 450', region: 'Los Lagos' }
  ];

  const filteredOffices = offices.filter(office => 
    office.name.toLowerCase().includes(searchOffice.toLowerCase()) ||
    office.city.toLowerCase().includes(searchOffice.toLowerCase()) ||
    office.region.toLowerCase().includes(searchOffice.toLowerCase())
  );

  const faqs = [
    {
      question: '¿Qué es Starken Box?',
      answer: 'Starken Box es nuestra casilla internacional en Miami, Estados Unidos. Te asignamos una dirección física personal para que puedas comprar en tus tiendas favoritas de USA (Amazon, eBay, Walmart, etc.) y nosotros nos encargamos de recibir tus paquetes, consolidarlos y transportarlos de forma segura hasta la puerta de tu casa en Chile.'
    },
    {
      question: '¿Cómo se calcula el valor de mi envío en Starken Box?',
      answer: 'El valor de transporte se calcula según el mayor valor entre el peso real de la carga (pesado en balanza) y el peso volumétrico (dimensiones del paquete). El peso volumétrico se calcula mediante la fórmula: (Largo x Ancho x Alto en cm) / 5000. Starken Box no tiene cargos adicionales sorpresa; el valor cotizado es el precio final a pagar.'
    },
    {
      question: '¿Qué productos tienen restricciones de importación?',
      answer: 'Por regulaciones internacionales de aduana, no se pueden importar mercancías consideradas peligrosas. Esto incluye: perfumes, aerosoles, baterías de litio sueltas, armas de fuego o municiones, alimentos perecederos sin resolución sanitaria, medicamentos prescritos sin autorización de salud, materiales inflamables, entre otros. Ante dudas, te recomendamos consultar antes de comprar.'
    },
    {
      question: '¿Cómo funciona el servicio de envío internacional (Exportación) con DHL?',
      answer: 'Gracias a nuestra alianza estratégica con DHL Express, puedes realizar envíos internacionales de sobres, documentos y encomiendas directamente desde las sucursales Starken habilitadas. Tu paquete viajará a través de la red global de DHL, asegurando tiempos de entrega rápidos y trazabilidad en todo momento.'
    },
    {
      question: '¿Qué es el servicio Forwarder de Starken?',
      answer: 'Es nuestro servicio de importación y exportación de carga masiva o consolidada, diseñado para empresas. Gestionamos fletes aéreos y marítimos (LCL y FCL), coordinando toda la logística internacional, almacenamiento intermedio y el proceso de internación en aduanas chilenas.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="internacional-page">
      {/* SECTION 1: Starken Box Hero Banner (Structured exactly like Home Slider Banner) */}
      <section className="hero-slider-style">
        <div className="hero-slide-wrapper">
          <div className="hero-slide-content">
            <h1 className="hero-slide-title">
              STARKEN <span className="text-green-highlight">BOX</span>
            </h1>
            <p className="hero-slide-subtitle">
              Accede a millones de productos en Estados Unidos. Con el respaldo de Starken y una experiencia pensada para que comprar sea más fácil.
            </p>
            <a 
              href="https://starkenbox.com/registerstarken" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-slide-btn"
            >
              REGÍSTRATE AQUÍ
            </a>
          </div>
          <div className="hero-slide-image-section">
            <img 
              src="/mujer-internacional.png" 
              alt="Cliente Starken Box" 
              className="hero-slide-image"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1.5: Floating Menu (Structured exactly like Home FloatingMenu but only tracking input) */}
      <div className="fm-wrapper-style">
        <div className="fm-container-style">
          <div className="fm-search-area-style">
            <input 
              type="text" 
              placeholder="Haz tu seguimiento con tu n° de orden" 
              className="fm-search-input-style"
              maxLength={12}
              value={trackingValue}
              onChange={(e) => setTrackingValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTrackingSearch();
                }
              }}
            />
            <div className="fm-search-actions-style">
              {trackingValue.length > 0 && (
                <button 
                  type="button"
                  className="fm-action-btn-style clear" 
                  aria-label="Borrar"
                  onClick={() => setTrackingValue('')}
                >
                  <X size={18} />
                </button>
              )}
              
              <button 
                type="button"
                className="fm-action-btn-style search" 
                aria-label="Buscar" 
                onClick={handleTrackingSearch}
              >
                <Search size={20} />
              </button>

              <div className="fm-divider-style"></div>

              <div className="tooltip-container-style" ref={helpRef}>
                <button 
                  type="button"
                  className={`fm-action-btn-style help ${showHelpTooltip ? 'active' : ''}`}
                  aria-label="Ayuda"
                  onClick={() => setShowHelpTooltip(!showHelpTooltip)}
                >
                  <HelpCircle size={20} />
                </button>

                {showHelpTooltip && (
                  <div className="help-tooltip-popover-style">
                    <div className="tooltip-header-style">
                      <HelpCircle size={18} className="text-orange" />
                      <h4>¿Dónde encuentro mi número?</h4>
                    </div>
                    <p>
                      El número de envío es un código único de <strong>9 a 12 dígitos</strong> que te entregamos al realizar el envío o en tu confirmación de Starken Box.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1.8: Starken Box Bullet Points of Value */}
      <section className="section-box-features">
        <div className="box-features-container">
          <div className="features-grid">
            <div className="feature-card-item">
              <div className="check-badge">
                <Check size={20} className="text-white" />
              </div>
              <h3 className="feature-card-title">Sin cobros sorpresa</h3>
              <p className="feature-card-desc">
                El valor que cotizas es el valor final que pagas. No tendrás cargos adicionales durante el proceso de importación.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="check-badge">
                <Check size={20} className="text-white" />
              </div>
              <h3 className="feature-card-title">Cálculo Transparente</h3>
              <p className="feature-card-desc">
                Conoce cómo calculamos tu envío. El valor se calcula según el mayor entre el peso real y el peso volumétrico de la carga.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="check-badge">
                <Check size={20} className="text-white" />
              </div>
              <h3 className="feature-card-title">Importa Fácilmente</h3>
              <p className="feature-card-desc">
                Importar nunca fue tan fácil. Nosotros gestionamos toda la logística internacional y el proceso aduanero por ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Envío Internacional (Exportación / Alianza DHL) */}
      <section className="section-exportacion">
        <div className="export-container">
          <div className="export-header text-center">
            <h2 className="section-title">Envía desde Chile al Mundo</h2>
            <p className="section-subtitle">
              Gracias a nuestra alianza con <strong className="dhl-text">DHL Express</strong>, conectamos tus encomiendas con más de 200 países con la rapidez y seguridad que necesitas.
            </p>
          </div>

          <div className="export-grid">
            <div className="export-card">
              <div className="card-icon-wrapper yellow">
                <Plane size={24} />
              </div>
              <h3 className="card-title">Envíos Courier Express</h3>
              <p className="card-desc">
                Ideal para enviar documentos y paquetes pequeños con prioridad aérea. Llegada directa al domicilio del destinatario en plazos express.
              </p>
              <ul className="card-bullets">
                <li><Check size={14} className="bullet-check" /> Embalaje estándar incluido</li>
                <li><Check size={14} className="bullet-check" /> Seguimiento en línea 24/7</li>
                <li><Check size={14} className="bullet-check" /> Entrega puerta a puerta</li>
              </ul>
            </div>

            <div className="export-card">
              <div className="card-icon-wrapper green">
                <Globe size={24} />
              </div>
              <h3 className="card-title">Cobertura Internacional</h3>
              <p className="card-desc">
                Acceso a la red de distribución global más grande del mundo. Enviamos a América, Europa, Asia, Oceanía y África sin complicaciones.
              </p>
              <ul className="card-bullets">
                <li><Check size={14} className="bullet-check" /> Más de 220 países conectados</li>
                <li><Check size={14} className="bullet-check" /> Expertos en aduana local</li>
                <li><Check size={14} className="bullet-check" /> Soporte en todo el trayecto</li>
              </ul>
            </div>

            <div className="export-card">
              <div className="card-icon-wrapper purple">
                <ShieldCheck size={24} />
              </div>
              <h3 className="card-title">Respaldo y Seguridad</h3>
              <p className="card-desc">
                Tus envíos viajan asegurados y con el respaldo logístico combinado de Starken y DHL, asegurando trazabilidad total en cada etapa.
              </p>
              <ul className="card-bullets">
                <li><Check size={14} className="bullet-check" /> Declaración de aduana asistida</li>
                <li><Check size={14} className="bullet-check" /> Opciones de seguro de carga</li>
                <li><Check size={14} className="bullet-check" /> Notificación de entrega digital</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: B2B Services (Forwarder & Cross Border) */}
      <section className="section-b2b-services">
        <div className="b2b-container">
          <div className="b2b-header text-center">
            <h2 className="section-title">Soluciones Logísticas para Empresas</h2>
            <p className="section-subtitle">
              Expandimos tu negocio al extranjero con nuestros servicios especializados de carga masiva y e-commerce transfronterizo.
            </p>
          </div>

          <div className="b2b-grid">
            {/* Forwarder */}
            <div className="b2b-card">
              <div className="b2b-card-visual">
                <Boxes size={48} className="b2b-icon text-green" />
              </div>
              <div className="b2b-card-content">
                <div className="b2b-badge">Carga Masiva</div>
                <h3 className="b2b-card-title">Agente de Carga (Forwarder)</h3>
                <p className="b2b-card-desc">
                  Servicio integral de importación y exportación a gran escala. Gestionamos fletes aéreos y marítimos en modalidades LCL (carga consolidada) y FCL (contenedor completo) desde cualquier parte del mundo.
                </p>
                <div className="b2b-bullets-wrapper">
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Gestión aduanera completa y desaduanamiento preferencial.</span>
                  </div>
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Red global de agentes de carga y almacenamiento temporal en origen y destino.</span>
                  </div>
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Tarifas preferenciales por volumen para medianas y grandes empresas.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cross Border */}
            <div className="b2b-card">
              <div className="b2b-card-visual">
                <ShoppingBag size={48} className="b2b-icon text-orange" />
              </div>
              <div className="b2b-card-content">
                <div className="b2b-badge">E-commerce</div>
                <h3 className="b2b-card-title">Cross Border E-commerce</h3>
                <p className="b2b-card-desc">
                  Facilitamos las ventas de tiendas en línea del extranjero con destino a Chile. Ofrecemos recolección internacional, internación masiva express y entrega en última milla a través de la amplia red de Starken.
                </p>
                <div className="b2b-bullets-wrapper">
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Integraciones directas vía API para automatizar el etiquetado y tracking.</span>
                  </div>
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Entrega garantizada en todo Chile en plazos express competitivos.</span>
                  </div>
                  <div className="b2b-bullet-item">
                    <Check size={16} className="bullet-check" />
                    <span>Transparencia impositiva: cálculo automático de impuestos aduaneros en el checkout.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.7: General Benefits */}
      <section className="section-benefits">
        <div className="benefits-container">
          <div className="benefits-header text-center">
            <h2 className="section-title">¿Por qué elegir Starken Internacional?</h2>
            <p className="section-subtitle">Nos enfocamos en entregar confianza, velocidad y adaptabilidad en cada envío.</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item-card">
              <h4 className="benefit-number">01</h4>
              <h3 className="benefit-title">Red de Última Milla Líder</h3>
              <p className="benefit-desc">Una vez en Chile, distribuimos tu paquete a través de la cobertura más grande a nivel nacional, con despachos a domicilio y retiros en sucursal.</p>
            </div>

            <div className="benefit-item-card">
              <h4 className="benefit-number">02</h4>
              <h3 className="benefit-title">Alianzas de Prestigio</h3>
              <p className="benefit-desc">El sello y confianza de Starken se une a la solidez de la red logística mundial de DHL Express para envíos salientes.</p>
            </div>

            <div className="benefit-item-card">
              <h4 className="benefit-number">03</h4>
              <h3 className="benefit-title">Asesoría Aduanera Experta</h3>
              <p className="benefit-desc">Evita contratiempos con nuestro equipo certificado que gestiona los trámites de internación, aduanas e impuestos por ti.</p>
            </div>

            <div className="benefit-item-card">
              <h4 className="benefit-number">04</h4>
              <h3 className="benefit-title">Trazabilidad en Tiempo Real</h3>
              <p className="benefit-desc">Monitorea en línea el estado de tus envíos nacionales e internacionales con total transparencia desde nuestro portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sucursales Habilitadas */}
      <section id="sucursales" className="section-sucursales">
        <div className="sucursales-container">
          <div className="sucursales-header">
            <div className="header-text">
              <h2 className="section-title">Sucursales Habilitadas</h2>
              <p className="section-subtitle">
                Encuentra los puntos Starken con servicio internacional y alianza DHL habilitados para recepción de carga y asesoría comercial.
              </p>
            </div>
            <div className="search-box-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por ciudad o sucursal..." 
                className="search-input-sucursales"
                value={searchOffice}
                onChange={(e) => setSearchOffice(e.target.value)}
              />
            </div>
          </div>

          {filteredOffices.length > 0 ? (
            <div className="sucursales-grid">
              {filteredOffices.map((office, idx) => (
                <div className="office-card" key={idx}>
                  <div className="office-badge">{office.region}</div>
                  <div className="office-info">
                    <h4 className="office-name">{office.name}</h4>
                    <p className="office-city">{office.city}</p>
                    <div className="office-address">
                      <MapPin size={16} className="pin-icon" />
                      <span>{office.address}</span>
                    </div>
                  </div>
                  <div className="office-alliance-badge">
                    <span>Starken + DHL</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-box text-center">
              <AlertTriangle className="no-results-icon" size={40} />
              <h4>No encontramos sucursales para "{searchOffice}"</h4>
              <p>Intenta buscar otra comuna, ciudad o región de Chile.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: Preguntas Frecuentes */}
      <section className="section-faqs">
        <div className="faqs-container">
          <div className="faqs-header text-center">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-subtitle">Resolvemos tus dudas sobre el servicio Starken Box e importaciones/exportaciones.</p>
          </div>

          <div className="faqs-accordion">
            {faqs.map((faq, idx) => (
              <div 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`} 
                key={idx}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Contact Commercial Form */}
      <section className="section-contact-form">
        <div className="contact-form-container">
          <div className="contact-grid">
            <div className="contact-info-panel">
              <div className="badge-promo">Contacto Comercial</div>
              <h2 className="panel-title">¿Listo para expandir tu logística?</h2>
              <p className="panel-desc">
                Completa nuestro formulario de contacto comercial. Un ejecutivo especializado analizará tus necesidades y te propondrá la mejor alternativa tarifaria y de servicios internacionales.
              </p>
              
              <div className="panel-bullets">
                <div className="panel-bullet-item">
                  <div className="icon-badge"><FileText size={20} className="bullet-icon text-green" /></div>
                  <div>
                    <h4>Cotizaciones a la medida</h4>
                    <p>Adaptamos nuestras tarifas al volumen de importación o exportación de tu negocio.</p>
                  </div>
                </div>

                <div className="panel-bullet-item">
                  <div className="icon-badge"><Globe size={20} className="bullet-icon text-orange" /></div>
                  <div>
                    <h4>Consultoría en comercio exterior</h4>
                    <p>Te apoyamos con los requisitos sanitarios, aranceles y normativas aduaneras.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-wrapper">
              {formSubmitted ? (
                <div className="form-success-message">
                  <div className="success-icon-wrapper">
                    <Check size={40} className="text-white" />
                  </div>
                  <h3>¡Mensaje Recibido!</h3>
                  <p>Muchas gracias por escribirnos. Tu solicitud ha sido registrada en nuestro sistema y un asesor comercial de Starken Internacional se pondrá en contacto contigo en las próximas 24 horas hábiles.</p>
                  <button 
                    type="button" 
                    className="btn-success-reset"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-commercial-form">
                  <h3 className="form-title">Formulario Comercial</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name"><User size={16} /> Nombre Completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="Ej: Juan Pérez Silva" 
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email"><Mail size={16} /> Correo Electrónico</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="Ej: jperez@empresa.cl" 
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone"><Phone size={16} /> Teléfono Móvil</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        placeholder="Ej: +56 9 1234 5678" 
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company"><Building size={16} /> Nombre Empresa (Opcional)</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      placeholder="Ej: Logística S.A." 
                      value={formData.company}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Servicio de Interés</label>
                    <div className="select-input-wrapper">
                      <select 
                        id="service" 
                        name="service" 
                        value={formData.service}
                        onChange={handleFormChange}
                      >
                        <option value="starken-box">Starken Box (Casilla USA)</option>
                        <option value="courier-dhl">Courier Internacional (Alianza DHL)</option>
                        <option value="forwarder">Agente de Carga / Forwarder (Carga Masiva)</option>
                        <option value="cross-border">Cross Border E-commerce (Internacional a Chile)</option>
                      </select>
                      <ChevronDown className="select-chevron" size={18} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Mensaje / Requerimiento</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      required 
                      placeholder="Describe brevemente el tipo de carga, volumen, origen y destino..."
                      value={formData.message}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="form-submit-button">
                    <span>Enviar Solicitud</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internacional;
