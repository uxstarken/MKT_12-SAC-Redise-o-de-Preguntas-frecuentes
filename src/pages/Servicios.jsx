import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './Servicios.css';

// SVG Icon Helpers matching Starken Design System
const IconCalculator = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="14" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);

const IconCreate = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="15" y2="16" />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Badge circular icons for right column items
const BadgeIcon = ({ type }) => {
  switch (type) {
    case 'delivery-man':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6.5" r="2.5" />
          <path d="M12 4h4" />
          <path d="M6 19v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" />
          <rect x="9" y="12" width="6" height="5" rx="0.5" />
        </svg>
      );
    case 'store':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18L19 5H5L3 9z" />
          <path d="M5 9v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
          <rect x="7" y="12" width="4" height="4" rx="0.5" />
          <rect x="13" y="12" width="4" height="10" rx="0.5" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2" />
          <polygon points="16 8 20 8 23 11 23 16 16 16" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'box-stock':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'clipboard-doc':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
      );
    case 'shopping-bag':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'box-qr':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" />
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="10" y2="10" />
          <line x1="14" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="10" y2="14" />
          <line x1="14" y1="14" x2="16" y2="14" />
        </svg>
      );
    case 'user-fast':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#029E47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <polyline points="18 8 22 8" />
          <polyline points="19 12 23 12" />
        </svg>
      );
    default:
      return null;
  }
};

const servicesList = [
  {
    id: 'local',
    word1: 'Envío',
    word2: 'Local',
    image: '/card-envio-local.png',
    headline: 'Más cerca, más conveniente',
    description: 'La solución ideal para envíos dentro de la misma región. Cercano, seguro y diseñado para potenciar emprendimientos locales y facilitar la conexión entre personas.',
    rightTitle: 'Este servicio es ideal para:',
    items: [
      { icon: 'delivery-man', title: 'Entregas de última milla.' },
      { icon: 'store', title: 'Emprendedores y pymes.' },
      { icon: 'truck', title: 'Despachos dentro de una misma ciudad.' },
      { icon: 'heart', title: 'Tu forma de enviar cerca de quienes más importan.' }
    ],
    buttons: ['cotiza']
  },
  {
    id: 'digital',
    word1: 'Envío',
    word2: 'Digital',
    image: '/card-envio-digital.png',
    headline: 'Tu envío comienza online',
    description: 'La logística moderna no tiene por qué ser compleja. Cotiza, planifica y genera tus envíos en línea de manera autónoma. Obtén transparencia total en tus costos y ahorra tiempo valioso antes de acercarte a nuestras sucursales.',
    rightTitle: 'Beneficios:',
    items: [
      { icon: 'box-qr', title: 'Compara tarifas al instante.' },
      { icon: 'calculator', title: 'Mayor control sobre tus presupuestos.' },
      { icon: 'user-fast', title: 'Agilidad para personas y negocios.' }
    ],
    buttons: ['cotiza', 'crea']
  },
  {
    id: 'aereo',
    word1: 'Expreso',
    word2: 'Aéreo',
    image: '/card-expreso-aereo.png',
    headline: 'Cuando tu envío no puede esperar',
    description: 'Cuando cada minuto cuenta, el aire es tu mejor aliado. Conecta la Región Metropolitana con ciudades clave de forma ultra rápida, optimizando tiempos de entrega para que tu envío llegue donde debe estar, sin esperas innecesarias.',
    rightTitle: '¿Por qué elegirlo?',
    items: [
      { icon: 'clock', title: 'Ideal para urgencias.' },
      { icon: 'box-stock', title: 'Reposición de stock.' },
      { icon: 'clipboard-doc', title: 'Documentación importante.' },
      { icon: 'shopping-bag', title: 'Ventas E-commerce de alto flujo.' }
    ],
    destinationWarning: {
      title: 'Servicio solo considera las siguientes ciudades como destino:',
      cities: 'Arica - Iquique - Calama - Antofagasta - Punta Arenas - Coyhaique - Isla de Pascua'
    },
    buttons: ['cotiza', 'encuentra']
  },

  {
    id: 'locker',
    word1: 'Locker',
    word2: 'Autoatención',
    image: '/card-locker.png',
    headline: 'Retira a tu ritmo: Automatización Inteligente',
    description: 'Olvídate de los horarios rígidos. Recibe tus encomiendas y retíralas de forma 100% automatizada en nuestros puntos de venta. Recibirás un QR al correo tras pagar (si corresponde), y con solo escanearlo, ¡listo! Tu paquete está contigo.',
    boldFooterText: 'Total independencia y seguridad en tu retiro.',
    buttons: ['cotiza', 'crea', 'encuentra']
  },
  {
    id: 'embalaje',
    word1: 'Servicio',
    word2: 'Embalajes',
    image: '/card-servicio-embalaje.png',
    headline: 'El embalaje perfecto para cada envío',
    description: 'La calidad del embalaje es la primera barrera de seguridad. Encuentra en sucursal la medida perfecta para tu envío, desde sobres resistentes hasta cajas reforzadas.',
    table: {
      headers: ['Embalaje', 'Tamaño', 'Ejemplo envíos'],
      rows: [
        ['Mini sobre', '26x28 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Sobre burbuja', '35x28 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Caja XS', '20x15x10 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Caja S', '30x20x15 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Caja MF', '32x29x8 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Caja M', '40x30x20 cm', 'Bisutería, accesorios, cosméticos.'],
        ['Caja XL', '60x40x30 cm', 'Bisutería, accesorios, cosméticos.']
      ],
      disclaimer: '*La compra de embalajes es para el uso exclusivo de envíos en nuestros puntos de venta Starken, no se realiza venta de embalajes para usos externos al servicio.'
    },
    buttons: ['encuentra']
  }
];

const Servicios = () => {
  const [expandedId, setExpandedId] = useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectId = searchParams.get('select');
    if (selectId) {
      setExpandedId(selectId);
      
      // Esperar a que renderice y despliegue el acordeón, luego centrar la pantalla
      setTimeout(() => {
        const element = document.getElementById(`service-card-${selectId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="servicios-page-container">
      {/* Franja Verde / Banner de Título */}
      <section className="servicios-banner-header">
        <h1 className="servicios-banner-title">
          Descubre nuestros servicios
        </h1>
      </section>

      {/* Sección con Breadcrumb */}
      <div className="servicios-breadcrumb-section">
        <div className="servicios-breadcrumb">
          <Link to="/">Inicio</Link> &gt; <span>Servicios</span>
        </div>
      </div>

      {/* Listado en Columna de 5 Servicios (Desplegables / Accordion) */}
      <section className="servicios-body">
        <div className="servicios-list-container">
          {servicesList.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div 
                key={service.id} 
                id={`service-card-${service.id}`}
                className={`service-accordion-card ${isExpanded ? 'is-expanded' : ''}`}
              >
                {/* Cabecera Clickeable */}
                <div 
                  className="service-accordion-header" 
                  onClick={() => toggleAccordion(service.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  <div className="service-header-image-col">
                    <img src={service.image} alt={`${service.word1} ${service.word2}`} />
                  </div>
                  
                  <div className="service-header-title-col">
                    <div className="service-word-top">{service.word1}</div>
                    <div className="service-word-pill">
                      <span>{service.word2}</span>
                    </div>
                  </div>

                  <div className="service-header-arrow">
                    <svg 
                      viewBox="0 0 24 24" 
                      width="24" 
                      height="24" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Contenido Desplegable basado en los rectángulos rojos */}
                {isExpanded && (
                  <div className="service-accordion-body">
                    {(() => {
                      const hasRightCol = Boolean(service.rightTitle || service.items || service.destinationWarning || service.table);
                      
                      if (!hasRightCol) {
                        return (
                          <div className="service-body-inner-box full-width">
                            <div className="service-body-full-col">
                              <h3 className="service-headline">{service.headline}</h3>
                              <p className="service-description">{service.description}</p>
                              {service.boldFooterText && (
                                <p className="service-bold-footer-note">{service.boldFooterText}</p>
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="service-body-inner-box">
                          <div className="service-body-columns">
                            {/* Columna Izquierda: Titulo destacado y texto descriptivo */}
                            <div className="service-body-left-col">
                              <h3 className="service-headline">{service.headline}</h3>
                              <p className="service-description">{service.description}</p>
                              
                              {service.boldFooterText && (
                                <p className="service-bold-footer-note">{service.boldFooterText}</p>
                              )}
                            </div>

                            {/* Línea Divisora Vertical */}
                            <div className="service-vertical-divider"></div>

                            {/* Columna Derecha: Grilla de Beneficios / Tabla */}
                            <div className="service-body-right-col">
                              {service.rightTitle && (
                                <h4 className="service-right-title">{service.rightTitle}</h4>
                              )}

                              {service.items && (
                                <div className={`service-items-grid ${service.items.length === 3 ? 'items-3' : 'items-4'}`}>
                                  {service.items.map((item, idx) => (
                                    <div key={idx} className="service-item-card">
                                      <div className="service-item-icon-badge">
                                        <BadgeIcon type={item.icon} />
                                      </div>
                                      <span className="service-item-text">{item.title}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Tabla de Embalajes */}
                              {service.table && (
                                <div className="service-table-wrapper">
                                  <table className="service-embalajes-table">
                                    <thead>
                                      <tr>
                                        {service.table.headers.map((head, i) => (
                                          <th key={i}>{head}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {service.table.rows.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                          <td className="col-embalaje">{row[0]}</td>
                                          <td className="col-tamano">{row[1]}</td>
                                          <td className="col-ejemplo">{row[2]}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  {service.table.disclaimer && (
                                    <p className="service-table-disclaimer">{service.table.disclaimer}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Banner de Advertencia de Destino (Expreso Aéreo) - De ancho completo */}
                          {service.destinationWarning && (
                            <div className="service-destination-warning-box">
                              <span className="warning-title">{service.destinationWarning.title}</span>
                              <span className="warning-cities">{service.destinationWarning.cities}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Barra Inferior de Botones de Acción (Pill Buttons en Naranja Starken CTA) */}
                    {service.buttons && service.buttons.length > 0 && (
                      <div className="service-action-buttons-row">
                        {service.buttons.includes('cotiza') && (
                          <button className="service-pill-btn orange">
                            <IconCalculator />
                            <span>Cotiza tu envío</span>
                          </button>
                        )}
                        {service.buttons.includes('crea') && (
                          <button className="service-pill-btn orange">
                            <IconCreate />
                            <span>Crea tu envío</span>
                          </button>
                        )}
                        {service.buttons.includes('encuentra') && (
                          <button className="service-pill-btn orange">
                            <IconLocation />
                            <span>Encuentra tu Starken</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer and Chatbot */}
      <Footer />
      <HomeChatbot />
    </div>
  );
};

export default Servicios;
