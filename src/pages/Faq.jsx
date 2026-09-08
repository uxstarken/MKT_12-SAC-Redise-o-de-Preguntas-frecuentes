import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Plane, 
  Sparkles, 
  AlertTriangle, 
  AlertCircle,
  Globe,
  HelpCircle, 
  X, 
  FileText, 
  Boxes, 
  Check, 
  MessageSquare, 
  Phone,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './Faq.css';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('envios-web');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [votes, setVotes] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });

  // Categorías de FAQ
  const categories = [
    { id: 'envios-web', name: 'Envíos web', icon: Globe },
    { id: 'preguntas-generales', name: 'Preguntas generales', icon: FileText },
    { id: 'problemas-envio', name: 'Problemas con el envío', icon: AlertTriangle },
    { id: 'puntos-venta', name: 'Puntos de Venta', icon: MapPin },
    { id: 'reclamos', name: 'Reclamos', icon: AlertCircle },
    { id: 'seguir-envio', name: 'Seguir envío', icon: Search }
  ];

  // Listado de Preguntas y Respuestas
  const faqData = [
    // 1. Envíos web (10 preguntas exactas)
    {
      id: 'web-1',
      category: 'envios-web',
      question: '¿Puedo pagar mi envío online?',
      answer: 'Sí, puedes pagar tu envío online utilizando los métodos de pago disponibles en nuestra web al finalizar la creación de tu envío.'
    },
    {
      id: 'web-2',
      category: 'envios-web',
      question: '¿Qué debo hacer después de crear mi envío online?',
      answer: 'Después de crear tu envío online y realizar el pago (si aplica), recibirás una etiqueta que puedes imprimir y pegar en tu envío, luego lleva el envío al punto de venta que seleccionaste o al que tengas más cercano.'
    },
    {
      id: 'web-3',
      category: 'envios-web',
      question: '¿Debo llevar impresa mi etiqueta?',
      answer: 'Recuerda que independientemente imprimas tu etiqueta, al momento de entregar tu envío en uno de nuestros puntos de venta  volveremos a imprimir su etiqueta, la cual se deberá colocar en el envío durante su recepción.'
    },
    {
      id: 'web-4',
      category: 'envios-web',
      question: '¿Qué pasa si necesito modificar mi envío después de crearlo online?',
      answer: 'Una vez que el envío ha sido creado y pagado (si aplica), podrás realizar cambios a través del seguimiento web con el servicio de Flex Delivery, también puedes contactar a nuestro servicio de atención al cliente para evaluar posible modificaciones.ndamos revisar nuestras políticas de envío en Condiciones Generales de Servicio para conocer los límites exactos.'
    },
    {
      id: 'web-5',
      category: 'envios-web',
      question: '¿Qué debo hacer si cometí un error al crear mi envío online?',
      answer: 'Si cometiste un error al crear tu envío online y fue pagado, te recomendamos contactar a nuestro servicio de atención al cliente lo antes posible para realizar la cancelación y generar el proceso de devolución de dinero. En caso de contrario, puedes crear un nuevo envío sin problemas.'
    },
    {
      id: 'web-6',
      category: 'envios-web',
      question: '¿Hay algún costo adicional por usar el servicio de envío online?',
      answer: 'No, los costos de envío se basan en las dimensiones, el peso y el destino de tu envío, tal como se calcularia de forma presencial.'
    },
    {
      id: 'web-7',
      category: 'envios-web',
      question: '¿Existe un límite en la cantidad de envíos que puedo crear online a la vez?',
      answer: 'No existe un límite en la cantidad de envíos que puedes crear online a la vez.'
    },
    {
      id: 'web-8',
      category: 'envios-web',
      question: '¿Qué información necesito para crear un envío online?',
      answer: 'Necesitarás la información completa de quién recibirá el envío (nombre, dirección, teléfono, correo electrónico), la talla o las dimensiones y el peso aproximado del envío.'
    },
    {
      id: 'web-9',
      category: 'envios-web',
      question: '¿Cómo creo un envío online?',
      answer: 'Para crear un envío online, debes ingresar a nuestra sección de "Crear Envío" en nuestro sitio web. Allí, deberás completar con la información de entrega, las características del envío (peso, dimensiones, etc.) y seleccionar el punto de venta donde dejarás el envío.'
    },
    {
      id: 'web-10',
      category: 'envios-web',
      question: '¿Hay restricciones de tamaño o peso para los envíos online?',
      answer: 'Sí, existen restricciones de tamaño y peso para los envíos. Si las dimensiones de tu envío exceden el máximo permitido en starken.cl/sucursales donde encontrará los puntos de venta disponibles para recibir tu carga. Te recomendamos revisar nuestras políticas de envío en Condiciones Generales de Servicios para conocer los límites exactos.'
    },

    // 2. Preguntas generales (11 preguntas exactas)
    {
      id: 'gen-1',
      category: 'preguntas-generales',
      question: '¿Qué artículos están prohibidos de ser enviados?',
      answer: 'Por regulaciones de seguridad y políticas de la empresa, existen ciertos artículos que están prohibidos de ser enviados. Puedes consultar la lista completa de artículos prohibidos en Carga prohibida.'
    },
    {
      id: 'gen-2',
      category: 'preguntas-generales',
      question: '¿Hay algún horario específico para entregar los envíos en los puntos de venta?',
      answer: 'Los horarios de atención de nuestros puntos de venta pueden variar. Te recomendamos consultar el horario en Sucursales, recuerda que los envíos recibidos posterior a las 17:00 hrs sumarán un día hábil de transito.'
    },
    {
      id: 'gen-3',
      category: 'preguntas-generales',
      question: '¿El embalaje de mi envío debe cumplir algún requisito específico?',
      answer: 'Sí, es importante que tu envío esté correctamente embalado para evitar daños durante el transporte. Te recomendamos revisar en Recomendaciones de Embalaje.'
    },
    {
      id: 'gen-4',
      category: 'preguntas-generales',
      question: '¿Qué debo hacer si mi número de envío no funciona?',
      answer: 'Si tu número de envío no funciona, por favor, verifica que lo hayas ingresado correctamente. Si el problema persiste, contacta a nuestro servicio de atención al cliente para que podamos ayudarte.'
    },
    {
      id: 'gen-5',
      category: 'preguntas-generales',
      question: '¿Puedo recibir notificaciones por correo sobre el estado de mi envío?',
      answer: 'Sí, te enviaremos notificaciones por correo electrónico sobre los eventos importantes de tu envío, como la creación, la recepción en el punto de origen, las actualizaciones de tránsito y la disponibilidad para retiro o la entrega final.'
    },
    {
      id: 'gen-6',
      category: 'preguntas-generales',
      question: '¿Qué significa el estado "En tránsito"? ¿Y "Entregado"?',
      answer: '"En tránsito" significa que tu envío está en camino a su destino y ha salido del punto de origen. "Entregado" significa que el envío ha sido entregado exitosamente. Otros estados pueden incluir "Listo para Retiro", "Incidencia en el envío", etc. Puedes consultar la descripción detallada de cada estado en nuestra sección de Seguimiento.'
    },
    {
      id: 'gen-7',
      category: 'preguntas-generales',
      question: '¿Qué debo hacer si mi envío llega con daños?',
      answer: 'Si tu envío llega con daños, te recomendamos tomar fotografías del envío dañado antes de abrirlo y del contenido dañado una vez abierto. Luego, debes realizar un reclamo a través de nuestro Centro de Ayuda Formulario e Reclamos adjuntando las fotografías como evidencia.'
    },
    {
      id: 'gen-8',
      category: 'preguntas-generales',
      question: '¿Cuál es su política de privacidad con respecto a mis datos y la información de mis envíos?',
      answer: 'En Starken, nos tomamos muy en serio la privacidad de tus datos. Puedes consultar nuestra política de privacidad completa en Política de Privacidad y uso de datos personales para obtener información detallada sobre cómo recopilamos, utilizamos y protegemos tu información.'
    },
    {
      id: 'gen-9',
      category: 'preguntas-generales',
      question: '¿Cuáles son los métodos de pago aceptados para los envíos online?',
      answer: 'Puedes pagar con tu banco, tarjetas de crédito y/o digitales a través del portal de pagos de Webpay y Etpay.'
    },
    {
      id: 'gen-10',
      category: 'preguntas-generales',
      question: '¿Qué tipo de productos puedo enviar a través del servicio online?',
      answer: 'Puedes enviar una amplia variedad de productos a través de nuestro servicio online, siempre y cuando cumplan con nuestras políticas de envío y la legislación vigente. Te recomendamos revisar la lista de artículos prohibidos en Carga prohibida.'
    },
    {
      id: 'gen-11',
      category: 'preguntas-generales',
      question: '¿Qué es el valor declarado y por qué es importante?',
      answer: 'El valor declarado es el valor monetario que le asignas a tu envío. Es importante declararlo correctamente, ya que en caso de pérdida o daño, la indemnización se basará en este valor (sujeto a nuestras políticas y límites). En caso de declarar un valor superior a los $50.000 deberás ingresar un documento tributario que acredite el valor.'
    },

    // 3. Problemas con el envío (4 preguntas exactas)
    {
      id: 'prob-1',
      category: 'problemas-envio',
      question: '¿Qué sucede si mi envío tiene varios bultos y no llegan todos juntos?',
      answer: 'En caso de que tengas un envío con más de un bulto, se te avisará por correo electrónico cuando todos los bultos estén disponibles para retiro. Si falta alguno, por favor, contacta a nuestro servicio de atención al cliente con tu número de envío.'
    },
    {
      id: 'prob-2',
      category: 'problemas-envio',
      question: '¿Qué pasa si mi envío se pierde o se daña?',
      answer: 'Si tu envío se pierde o se daña, debes realizar un reclamo a través de nuestro Centro de Ayuda, ahí encontraras el Formulario e Reclamos, donde te pediremos información detallada sobre el envío y los daños o la pérdida para poder ingresar la solicitud.'
    },
    {
      id: 'prob-3',
      category: 'problemas-envio',
      question: '¿Qué hago si tengo problemas al entregar mi envío en un punto de venta?',
      answer: 'Al momento de recibir la carga, si existiera alguna incidencia te recomendamos contactar a nuestro personal del punto de venta para que te asistan, también puedes solicitar asistencia por nuestro canal de WhatsApp'
    },
    {
      id: 'prob-4',
      category: 'problemas-envio',
      question: '¿Qué debo hacer si no recibo la notificación de que mi carga está disponible para retiro?',
      answer: 'Si no recibes la notificación de que tu envío está disponible para retiro (Pendiente de Entrega) dentro del plazo esperado, te recomendamos verificar la carpeta de spam o correo no deseado de tu correo electrónico. Si aún no la encuentras, puedes contactar a nuestro servicio de atención al cliente con tu número de envío para que podamos verificar el estado y fecha de entrega.'
    },

    // 4. Puntos de Venta (5 preguntas exactas)
    {
      id: 'pun-1',
      category: 'puntos-venta',
      question: '¿El punto de venta me entregará algún comprobante de recepción?',
      answer: 'Sí, al momento de recibir tu envío en el punto de venta, te entregarán un comprobante de recepción como respaldo de la entrega.'
    },
    {
      id: 'pun-2',
      category: 'puntos-venta',
      question: '¿Cuáles son los horarios de atención de los puntos de venta?',
      answer: 'Los horarios de atención de nuestros puntos de venta pueden variar. Consulta los horarios específicos de cada punto de venta en Buscador de Puntos de Venta.'
    },
    {
      id: 'pun-3',
      category: 'puntos-venta',
      question: '¿Dónde puedo encontrar los puntos de venta para dejar mi envío?',
      answer: 'Puedes encontrar el listado de todos nuestros puntos de venta disponibles en nuestro Buscador de Puntos de Venta.'
    },
    {
      id: 'pun-4',
      category: 'puntos-venta',
      question: '¿Qué debo presentar al momento de dejar mi envío en el punto de venta?',
      answer: 'Al momento de dejar tu envío, debes presentar la etiqueta de envío impresa/digital. De no superar un valor declarado de $50.000, no es necesario presentar documentación adicional, en caso contrario deberas tener a mano el número de boleta o documento tributario del producto para ingresarlo al momento de crear tu envío.'
    },
    {
      id: 'pun-5',
      category: 'puntos-venta',
      question: '¿Qué sucede si mi envío excede las medidas permitidas al llegar al punto de venta?',
      answer: 'En caso de que tu envío exceda las medidas permitidas, el punto de venta no podrá recibirlo. Deberás dirigirte a un punto de venta habilitado para recibir cargas de mayor tamaño, puedes revisar el detalle de cada punto en Buscador de Puntos de Venta'
    },

    // 5. Reclamos (7 preguntas exactas)
    {
      id: 'rec-1',
      category: 'reclamos',
      question: '¿Cuál es el plazo de respuesta para un reclamo?',
      answer: 'Recibido el reclamo, comenzará a correr el plazo de 20 días hábiles para su resolución.'
    },
    {
      id: 'rec-2',
      category: 'reclamos',
      question: '¿Qué datos necesito para realizar un reclamo?',
      answer: 'Necesitarás el número de envío, tus datos de contacto, indicar si eres quien realizó el envío o lo recibio, una descripción detallada del problema y adjuntar la documentación de respaldo si es necesario (ej. Facturas, boletas, fotos, etc...).'
    },
    {
      id: 'rec-3',
      category: 'reclamos',
      question: '¿Cómo puedo contactar al servicio de atención al cliente si tengo otras preguntas?',
      answer: 'Puedes contactar a nuestro servicio de atención al cliente a través de nuestro canal de atención de WhatsApp +569 61941240, por nuestras Redes Sociales o a través de nuestro Centro de atención telefónica 600 2000 710.'
    },
    {
      id: 'rec-4',
      category: 'reclamos',
      question: '¿Qué hago si mi envío pagado aparece como "Por Pagar"?',
      answer: 'En caso que el pago no se vea refleja el cliente se debe contactar con nuestro equipo de atención a clientes vía WhatsApp +56961941240 para revisar el caso, te recomendamos tener a mano tu número de seguimiento y documentos relacionados al pago realizado.'
    },
    {
      id: 'rec-5',
      category: 'reclamos',
      question: '¿Cómo puedo realizar un reclamo?',
      answer: 'Si necesitas realizar un reclamo, puedes hacerlo ingresando en nuestro Centro de Ayuda, ubicado en la barra superior de nuestro sitio web http://starken.cl o también ingresando al siguiente link, donde deberás completar el formulario con los datos solicitados.'
    },
    {
      id: 'rec-6',
      category: 'reclamos',
      question: '¿Cómo puedo revisar el estado de mi reclamo?',
      answer: 'Para obtener información del estado de tu reclamo, puedes comunicarte con nosotros a través de nuestros canales de atención disponibles: WhatsApp +569 61941240 y Centro de atención telefónica 600 2000 710.'
    },
    {
      id: 'rec-7',
      category: 'reclamos',
      question: '¿Quién puede ingresar un reclamo?',
      answer: 'Puede ingresar un reclamo tanto la persona que realiza el envío cómo quién lo recibe, dependiendo de las condiciones del envío.'
    },

    // 6. Seguir envío (5 preguntas exactas)
    {
      id: 'seg-1',
      category: 'seguir-envio',
      question: '¿Qué pasa si mi envío no llega a su destino?',
      answer: 'Si tu envío no llega a su destino dentro del plazo estimado, te pedimos que te contactes con nuestro servicio de atención al cliente por nuestro canal de WhatsApp con tu número de envío para que podamos investigar la situación y brindarte una solución.'
    },
    {
      id: 'seg-2',
      category: 'seguir-envio',
      question: '¿Qué significa cada estado de mi envío?',
      answer: 'Los estados de tu envío pueden variar, pero algunos comunes incluyen "En tránsito" (el envío está en camino), "Pendiente de Entrega" (el envío ha llegado al punto de destino y está listo para ser retirado), "Entregado" (el envío ha sido entregado). Si tienes dudas sobre un estado específico, puedes contactar a nuestro servicio de atención al cliente o por nuestro canal de WhatsApp'
    },
    {
      id: 'seg-3',
      category: 'seguir-envio',
      question: '¿Cómo puedo hacer un seguimiento del estado de mi envío?',
      answer: 'Puedes hacer seguimiento del estado de tu envío ingresando el número de envío en la sección Seguir Envío de nuestro sitio web, o también en el siguiente link.'
    },
    {
      id: 'seg-4',
      category: 'seguir-envio',
      question: '¿Cuándo se actualiza el estado de mi envío?',
      answer: 'El estado de tu envío se actualiza a medida que avanza en el proceso de transporte. Generalmente, podrás ver actualizaciones al ser recibido en el punto de origen, al transitar entre centros de distribución, al llegar al punto de destino y antes de salir a tu domicilio.'
    },
    {
      id: 'seg-5',
      category: 'seguir-envio',
      question: '¿Qué sucede si mi envío se retrasa?',
      answer: 'Si tu envío experimenta un retraso, te notificaremos a través del correo electrónico que proporcionaste. Si tienes alguna duda o necesitas más información, puedes contactar a nuestro servicio de atención al cliente por nuestro canal de WhatsApp con tu número de envío a mano.'
    }
  ];

  // Filtrar preguntas según categoría activa y búsqueda
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Mostrar Toast
  const showToastMessage = (message) => {
    setToast({ show: true, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Manejar Votación
  const handleVote = (faqId, type) => {
    if (votes[faqId]) return; // Evitar doble voto
    setVotes(prev => ({
      ...prev,
      [faqId]: type
    }));
    showToastMessage('¡Gracias! Tu feedback nos ayuda a mejorar.');
  };

  // Manejar cambio de categoría y scroll en móvil
  const handleCategoryClick = (categoryId, event) => {
    setActiveCategory(categoryId);
    setOpenFaqId(null);
    
    // Desplazar suavemente el badge seleccionado al centro en móvil
    if (event?.currentTarget) {
      event.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  return (
    <div className="condiciones-page">
      {/* Custom Hero Banner Section with brand background image */}
      <section className="faq-hero-custom">
        <div className="faq-hero-custom-overlay"></div>
        <div className="faq-hero-custom-container">
          <h1 className="faq-hero-custom-title">Centro de Ayuda</h1>
        </div>
      </section>

      {/* Main Content Area in 1200px max-width container */}
      <div className="condiciones-main-container" style={{ paddingBottom: '80px', paddingTop: '16px' }}>
        
        {/* Intro Section and Search input */}
        <div className="condiciones-page-intro" style={{ paddingTop: '16px', paddingBottom: '12px', marginBottom: '24px' }}>
          <p className="condiciones-intro-subtitle">
            Encuentra respuestas rápidas a tus consultas sobre envíos, seguimientos, tarifas y soluciones para pymes.
          </p>
          
          {/* Search Bar */}
          <div className="faq-search-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Busca por palabras clave (ej. seguimiento, tarifas, pyme)..." 
              className="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 54px',
                fontSize: '1.05rem',
                border: '1px solid var(--starken-border)',
                borderRadius: '30px',
                backgroundColor: 'var(--starken-white)',
                color: 'var(--starken-text-dark)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            />
            <Search className="faq-search-icon" size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            {searchQuery && (
              <button 
                className="faq-search-clear" 
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar and Questions Layout */}
        <div className="faq-content-layout">
          {/* Left Column: Sidebar Categories */}
          <aside className="faq-sidebar">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const count = faqData.filter(faq => faq.category === category.id).length;

              return (
                <div 
                  key={category.id} 
                  className={`faq-category-card ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                >
                  <div className="faq-category-icon-wrapper">
                    <IconComponent size={20} />
                  </div>
                  <div className="faq-category-info">
                    <span className="faq-category-name">{category.name}</span>
                    <span className="faq-category-count">{count}</span>
                  </div>
                </div>
              );
            })}
          </aside>

          {/* Right Column: Accordion Questions */}
          <section className="faq-accordion-section" style={{ margin: 0 }}>
            <div className="faq-accordion-header">
              <h3 className="faq-accordion-title">
                {categories.find(c => c.id === activeCategory)?.name || 'Preguntas'}
              </h3>
              <span className="faq-category-count">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'} encontradas
              </span>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="faq-list">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  const hasVoted = votes[faq.id];

                  return (
                    <div 
                      key={faq.id} 
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        className="faq-question-btn"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className="faq-chevron" size={20} />
                      </button>
                      
                      <div 
                        className="faq-answer-container"
                        style={{ maxHeight: isOpen ? '1000px' : '0' }}
                      >
                        <div className="faq-answer-content">
                          <p style={{ margin: '0 0 16px 0', whiteSpace: 'pre-line' }}>{faq.answer}</p>
                          
                          <div className="faq-feedback">
                            <span className="faq-feedback-label">¿Te resultó útil esta respuesta?</span>
                            <button 
                              className={`faq-feedback-btn yes ${hasVoted === 'yes' ? 'voted-yes' : ''}`}
                              onClick={() => handleVote(faq.id, 'yes')}
                              disabled={!!hasVoted}
                            >
                              <ThumbsUp size={14} />
                              <span>Sí</span>
                            </button>
                            <button 
                              className={`faq-feedback-btn no ${hasVoted === 'no' ? 'voted-no' : ''}`}
                              onClick={() => handleVote(faq.id, 'no')}
                              disabled={!!hasVoted}
                            >
                              <ThumbsDown size={14} />
                              <span>No</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="faq-empty-state">
                <HelpCircle className="faq-empty-icon" size={48} />
                <h4 className="faq-empty-title">No encontramos resultados para tu búsqueda</h4>
                <p className="faq-empty-desc">Prueba utilizando otras palabras o explora por categorías.</p>
              </div>
            )}
          </section>
        </div>

        {/* Quick Links / Enlaces destacados Section */}
        <section className="faq-shortcuts-section">
          <div className="faq-shortcuts-grid">
            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/packing_recommendations.jpg" alt="Recomendaciones de Embalaje" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Recomendaciones de Embalaje</h4>
                <p className="faq-shortcut-desc">Aprende a embalar como un experto para proteger tu envío.</p>
                <button className="faq-shortcut-btn">Más detalles</button>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/prohibited_cargo.jpg" alt="Carga Prohibida" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Carga Prohibida</h4>
                <p className="faq-shortcut-desc">¡Descubre qué artículos no puedes enviar!</p>
                <button className="faq-shortcut-btn">Más detalles</button>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/oversized_cargo.jpg" alt="Carga Sobredimensionada" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Carga Sobredimensionada</h4>
                <p className="faq-shortcut-desc">Como asegurar carga sobredimensionada.</p>
                <button className="faq-shortcut-btn">Más detalles</button>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/hablemos.jpg" alt="Hablemos" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Hablemos</h4>
                <p className="faq-shortcut-desc">Contáctate con nosotros.</p>
                <button className="faq-shortcut-btn">Más detalles</button>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/crear_reclamo.jpg" alt="Crear Reclamo" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Crear Reclamo</h4>
                <p className="faq-shortcut-desc">Gestiona tus reclamos de manera rápida y efectiva.</p>
                <button className="faq-shortcut-btn">Más detalles</button>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="faq-support-section">
          <div className="faq-support-info">
            <span className="faq-support-tag">¿Aún tienes dudas?</span>
            <h2 className="faq-support-title">Ponte en contacto con nosotros</h2>
            <p className="faq-support-desc">
              Si no encontraste respuesta a tu consulta, nuestro equipo del Servicio de Atención al Cliente (SAC) está listo para ayudarte a través de cualquiera de nuestros canales.
            </p>
            
            <div className="faq-contact-channels">
              <a href="tel:6002000700" className="faq-channel">
                <div className="faq-channel-icon">
                  <Phone size={22} />
                </div>
                <div className="faq-channel-details">
                  <h4>Call Center SAC</h4>
                  <p>600 2000 700 / Lun - Vie 08:30 a 18:30</p>
                </div>
              </a>

              <a 
                href="https://api.whatsapp.com/send?phone=56984552410" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="faq-channel"
              >
                <div className="faq-channel-icon">
                  <MessageSquare size={22} style={{ color: '#029E47' }} />
                </div>
                <div className="faq-channel-details">
                  <h4>Soporte por WhatsApp</h4>
                  <p>+56 9 8455 2410 / Atención automatizada y agentes</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>

      <HomeChatbot />
      <Footer />

      {/* Toast Notification */}
      {toast.show && (
        <div className="faq-toast">
          <Check className="faq-toast-icon" size={18} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Faq;
