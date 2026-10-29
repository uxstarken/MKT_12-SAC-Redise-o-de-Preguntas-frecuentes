import React, { useState, useRef, useEffect } from 'react';
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
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './Faq.css';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('envios-web');
  const [openFaqId, setOpenFaqId] = useState(null);

  const sidebarRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isDraggingActiveRef = useRef(false);

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
      answer: 'Una vez que el envío ha sido creado y pagado (si aplica), puedes contactar a nuestro servicio de atención al cliente para evaluar posibles modificaciones.\nTe recomendamos revisar nuestras [Condiciones Generales de Servicio](https://starken.cl/condiciones) para conocer los límites exactos.'
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
      answer: 'Sí, existen restricciones de tamaño y peso para los envíos. Si las dimensiones de tu envío exceden el máximo permitido en starken.cl/sucursales donde encontrará los puntos de venta disponibles para recibir tu carga. Te recomendamos revisar nuestras políticas de envío en [Condiciones Generales de Servicios](https://starken.cl/condiciones) para conocer los límites exactos.'
    },

    // 2. Preguntas generales (11 preguntas exactas)
    {
      id: 'gen-1',
      category: 'preguntas-generales',
      question: '¿Qué artículos están prohibidos de ser enviados?',
      answer: 'Por regulaciones de seguridad y políticas de la empresa, existen ciertos artículos que están prohibidos de ser enviados. Puedes consultar la lista completa de artículos prohibidos en [Carga prohibida](https://starken.cl/carga-prohibida).'
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
      answer: 'Sí, es importante que tu envío esté correctamente embalado para evitar daños durante el transporte. Te recomendamos revisar en [Recomendaciones de Embalaje](https://starken.cl/recomendaciones-embalaje).'
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
      answer: '"En tránsito" significa que tu envío está en camino a su destino y ha salido del punto de origen. "Entregado" significa que el envío ha sido entregado exitosamente. Otros estados pueden incluir "Listo para Retiro", "Incidencia en el envío", etc. Puedes consultar la descripción detallada de cada estado en nuestra sección de [Seguimiento](https://starken.cl/seguimiento).'
    },
    {
      id: 'gen-7',
      category: 'preguntas-generales',
      question: '¿Qué debo hacer si mi envío llega con daños?',
      answer: 'Si tu envío llega con daños, te recomendamos tomar fotografías del envío dañado antes de abrirlo y del contenido dañado una vez abierto. Luego, debes realizar un reclamo a través de nuestro Centro de Ayuda [Formulario e Reclamos](https://starken.cl/form-reclamo) adjuntando las fotografías como evidencia.'
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
      answer: 'Si tu envío se pierde o se daña, debes realizar un reclamo a través de nuestro Centro de Ayuda, ahí encontraras el [Formulario e Reclamos](https://starken.cl/form-reclamo), donde te pediremos información detallada sobre el envío y los daños o la pérdida para poder ingresar la solicitud.'
    },
    {
      id: 'prob-3',
      category: 'problemas-envio',
      question: '¿Qué hago si tengo problemas al entregar mi envío en un punto de venta?',
      answer: 'Al momento de recibir la carga, si existiera alguna incidencia te recomendamos contactar a nuestro personal del punto de venta para que te asistan, o por nuestro canal de atención [chat web](https://starken.cl/hablemos)'
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
      answer: 'Los horarios de atención de nuestros puntos de venta pueden variar. Consulta los horarios específicos de cada punto de venta en [Buscador de Puntos de Venta](https://starken.cl/sucursales).'
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
      answer: 'Puedes escribirnos a través del [Chat de nuestro sitio web](https://www.starken.cl/hablemos) o por nuestras redes sociales.'
    },
    {
      id: 'rec-4',
      category: 'reclamos',
      question: '¿Qué hago si mi envío pagado aparece como "Por Pagar"?',
      answer: 'En caso que el pago no se vea refleja el cliente se debe contactar al [Chat de nuestro sitio web](https://www.starken.cl/hablemos), te recomendamos tener a mano tu número de seguimiento y documentos relacionados al pago realizado.'
    },
    {
      id: 'rec-5',
      category: 'reclamos',
      question: '¿Cómo puedo realizar un reclamo?',
      answer: 'Si necesitas realizar un reclamo, puedes hacerlo desde el Centro de Ayuda, disponible en la barra superior de [starken.cl](https://starken.cl), o directamente en nuestro [formulario de reclamos](https://starken.cl/form-reclamo), completando los datos solicitados.'
    },
    {
      id: 'rec-6',
      category: 'reclamos',
      question: '¿Cómo puedo revisar el estado de mi reclamo?',
      answer: 'Para obtener información del estado de tu reclamo, puedes comunicarte con nosotros a través del [Chat de nuestro sitio web](https://www.starken.cl/hablemos).'
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
      answer: 'Si tu envío no llega a su destino dentro del plazo estimado, te pedimos que te contactes con nuestro servicio de atención al cliente o por nuestro canal de atención [chat web](https://starken.cl/hablemos) con tu número de envío para que podamos investigar la situación y brindarte una solución.'
    },
    {
      id: 'seg-2',
      category: 'seguir-envio',
      question: '¿Qué significa cada estado de mi envío?',
      answer: 'Los estados de tu envío pueden variar, pero algunos comunes incluyen "En tránsito" (el envío está en camino), "Pendiente de Entrega" (el envío ha llegado al punto de destino y está listo para ser retirado), "Entregado" (el envío ha sido entregado). Si tienes dudas sobre un estado específico, puedes contactar a nuestro servicio de atención al cliente o por nuestro canal de atención [chat web](https://starken.cl/hablemos).'
    },
    {
      id: 'seg-3',
      category: 'seguir-envio',
      question: '¿Cómo puedo hacer un seguimiento del estado de mi envío?',
      answer: 'Puedes hacer seguimiento del estado de tu envío ingresando el número de envío en la sección Seguir Envío de nuestro sitio web, o también en el siguiente [link](https://starken.cl/seguimiento).'
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
      answer: 'Si tu envío experimenta un retraso, te notificaremos a través del correo electrónico que proporcionaste. Si tienes alguna duda o necesitas más información, puedes contactar a nuestro servicio de atención al cliente por nuestro canal de atención [chat web](https://starken.cl/hablemos) con tu número de envío a mano.'
    }
  ];

  // Normalizar texto para búsqueda insensible a acentos y mayúsculas
  const normalizeText = (text) => 
    text ? text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

  // Comprobar si una pregunta o respuesta coincide con la búsqueda
  const faqMatchesSearch = (faq, query) => {
    if (!query || !query.trim()) return true;
    const cleanQuery = query.trim();
    const words = cleanQuery.split(/\s+/).filter(Boolean);
    if (words.length === 0) return true;

    const normQ = normalizeText(faq.question);
    const normA = normalizeText(faq.answer);
    const combined = `${normQ} ${normA}`;

    return words.every(word => combined.includes(normalizeText(word)));
  };

  const hasSearch = searchQuery.trim().length > 0;

  // Contar coincidencias por categoría
  const getCategoryMatchCount = (categoryId) => {
    if (!hasSearch) {
      return faqData.filter(faq => faq.category === categoryId).length;
    }
    return faqData.filter(faq => faq.category === categoryId && faqMatchesSearch(faq, searchQuery)).length;
  };

  // Resaltar coincidencias en negrita
  const highlightMatches = (text, query) => {
    if (!text || !query || !query.trim()) return text;
    
    const cleanQuery = query.trim();
    const words = cleanQuery.split(/\s+/).filter(Boolean);
    if (words.length === 0) return text;

    const accentMap = {
      'a': '[aáàäâã]',
      'e': '[eéèëê]',
      'i': '[iíìïî]',
      'o': '[oóòöôõ]',
      'u': '[uúùüû]',
      'n': '[nñ]',
      'c': '[cç]'
    };

    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const wordPatterns = words.map(w => {
      const norm = normalizeText(w);
      let p = '';
      for (const char of norm) {
        p += accentMap[char] || escapeRegExp(char);
      }
      return p;
    });

    try {
      const splitRegex = new RegExp(`(${wordPatterns.join('|')})`, 'gi');
      const matchRegex = new RegExp(`^(${wordPatterns.join('|')})$`, 'i');
      const parts = text.split(splitRegex);
      
      return parts.map((part, index) => {
        if (matchRegex.test(part)) {
          return (
            <strong key={index} className="faq-highlight">
              {part}
            </strong>
          );
        }
        return part;
      });
    } catch (e) {
      return text;
    }
  };

  // Renderizar respuesta con soporte para enlaces en formato markdown [texto](url) y resaltado de búsqueda
  const renderFormattedAnswer = (text, query) => {
    if (!text) return null;

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        const textBefore = text.substring(lastIndex, matchIndex);
        elements.push(highlightMatches(textBefore, query));
      }

      const label = match[1];
      const url = match[2];
      const isExternal = url.startsWith('http://') || url.startsWith('https://');

      elements.push(
        <a
          key={`link-${matchIndex}`}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="faq-answer-link"
        >
          {highlightMatches(label, query)}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(highlightMatches(text.substring(lastIndex), query));
    }

    return elements;
  };

  // Filtrar preguntas según categoría activa y búsqueda
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = faqMatchesSearch(faq, searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Categorías con coincidencias para sugerencias
  const categoriesWithMatches = categories.filter(cat => getCategoryMatchCount(cat.id) > 0);

  // Manejar cambio de categoría y scroll en móvil/tablet
  const handleCategoryClick = (categoryId, event) => {
    // Si el usuario estaba arrastrando con el ratón horizontalmente, ignorar el clic
    if (isDraggingActiveRef.current) {
      return;
    }

    setActiveCategory(categoryId);
    setOpenFaqId(null);
    
    // Desplazar suavemente la categoría seleccionada al centro en tablet/móvil
    if (event?.currentTarget && sidebarRef.current) {
      const card = event.currentTarget;
      const sidebar = sidebarRef.current;
      
      if (sidebar.scrollWidth > sidebar.clientWidth) {
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const sidebarWidth = sidebar.clientWidth;
        const targetScroll = cardLeft - (sidebarWidth / 2) + (cardWidth / 2);
        
        sidebar.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      }
    }
  };

  // Iniciar arrastre con clic sostenido (cuando hay desborde horizontal en tablet/móvil)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    // Solo activar lógica de arrastre si hay scroll horizontal
    if (sidebar.scrollWidth <= sidebar.clientWidth) return;

    isDraggingRef.current = true;
    isDraggingActiveRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = sidebar.scrollLeft;
  };

  // Listeners globales para arrastrar suavemente con el ratón y rueda
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const deltaX = e.pageX - startXRef.current;
      if (Math.abs(deltaX) > 4) {
        if (!isDraggingActiveRef.current) {
          isDraggingActiveRef.current = true;
          document.body.classList.add('is-faq-dragging');
          sidebar.classList.add('is-dragging');
        }
        sidebar.scrollLeft = startScrollLeftRef.current - deltaX;
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.classList.remove('is-faq-dragging');
        const sidebar = sidebarRef.current;
        if (sidebar) {
          sidebar.classList.remove('is-dragging');
        }
        setTimeout(() => {
          isDraggingActiveRef.current = false;
        }, 100);
      }
    };

    const handleGlobalDragStart = (e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('dragstart', handleGlobalDragStart);

    // Desplazamiento horizontal con la rueda del ratón al posarse sobre las categorías
    const sidebar = sidebarRef.current;
    const handleWheel = (e) => {
      if (!sidebar) return;
      if (sidebar.scrollWidth <= sidebar.clientWidth) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 2) {
        e.preventDefault();
        sidebar.scrollLeft += e.deltaY;
      }
    };

    if (sidebar) {
      sidebar.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('dragstart', handleGlobalDragStart);
      if (sidebar) {
        sidebar.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

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
      <div className="condiciones-main-container" style={{ paddingBottom: '120px', paddingTop: '16px' }}>
        
        {/* Intro Section and Search input */}
        <div className="faq-page-intro">
          <h2 className="faq-page-main-title">
            Preguntas Frecuentes
          </h2>
          <p className="condiciones-intro-subtitle">
            Puedes buscar en la categoría que más se acerque a tu consulta.
          </p>
          
          {/* Search Bar */}
          <div className="faq-search-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Buscar por palabra clave como por ejemplo: envío" 
              className="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          {/* Categories Sidebar */}
          <aside 
            ref={sidebarRef}
            className="faq-sidebar"
            onMouseDown={handleMouseDown}
            onDragStart={(e) => e.preventDefault()}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              const totalCount = faqData.filter(faq => faq.category === category.id).length;
              const matchCount = getCategoryMatchCount(category.id);
              const hasMatches = hasSearch && matchCount > 0;
              const noMatches = hasSearch && matchCount === 0;

              return (
                <div 
                  key={category.id} 
                  className={`faq-category-card ${activeCategory === category.id ? 'active' : ''} ${hasMatches ? 'has-matches' : ''} ${noMatches ? 'no-matches' : ''}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  title={hasMatches ? `${matchCount} coincidencias encontradas` : undefined}
                >
                  <div className="faq-category-icon-wrapper">
                    <IconComponent size={20} />
                  </div>
                  <div className="faq-category-info">
                    <span className="faq-category-name">{category.name}</span>
                    <span className={`faq-category-count ${hasMatches ? 'badge-match' : ''}`}>
                      {hasSearch ? matchCount : totalCount}
                    </span>
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
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'} {hasSearch ? 'con coincidencias' : 'encontradas'}
              </span>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="faq-list">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;

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
                        <span>{highlightMatches(faq.question, searchQuery)}</span>
                        <ChevronDown className="faq-chevron" size={20} />
                      </button>
                      
                      <div 
                        className="faq-answer-container"
                        style={{ maxHeight: isOpen ? '1000px' : '0' }}
                      >
                        <div className="faq-answer-content">
                          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                            {renderFormattedAnswer(faq.answer, searchQuery)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="faq-empty-state">
                <HelpCircle className="faq-empty-icon" size={48} />
                <h4 className="faq-empty-title">
                  {hasSearch 
                    ? `No hay coincidencias en "${categories.find(c => c.id === activeCategory)?.name}"`
                    : 'No encontramos resultados para tu búsqueda'}
                </h4>
                <div className="faq-empty-desc">
                  {hasSearch && categoriesWithMatches.length > 0 ? (
                    <div className="faq-empty-matches-prompt">
                      <p style={{ margin: '0 0 12px 0' }}>
                        Se encontraron preguntas con "{searchQuery}" en otras secciones. Haz clic para verlas:
                      </p>
                      <div className="faq-empty-cat-links">
                        {categoriesWithMatches.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            className="faq-empty-cat-btn"
                            onClick={(e) => handleCategoryClick(cat.id, e)}
                          >
                            {cat.name} ({getCategoryMatchCount(cat.id)})
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{ margin: 0 }}>Prueba utilizando otras palabras o explora por categorías.</p>
                  )}
                </div>
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
              </div>
              <div className="faq-shortcut-action">
                <a href="#recomendaciones" className="faq-shortcut-link">
                  <span>Ver más detalles</span>
                  <ChevronRight size={16} className="faq-shortcut-arrow" />
                </a>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/prohibited_cargo.jpg" alt="Carga Prohibida" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Carga Prohibida</h4>
                <p className="faq-shortcut-desc">¡Descubre qué artículos no puedes enviar!</p>
              </div>
              <div className="faq-shortcut-action">
                <a href="#carga-prohibida" className="faq-shortcut-link">
                  <span>Ver más detalles</span>
                  <ChevronRight size={16} className="faq-shortcut-arrow" />
                </a>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/oversized_cargo.jpg" alt="Carga Sobredimensionada" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Carga Sobredimensionada</h4>
                <p className="faq-shortcut-desc">Como asegurar carga sobredimensionada.</p>
              </div>
              <div className="faq-shortcut-action">
                <a href="#carga-sobredimensionada" className="faq-shortcut-link">
                  <span>Ver más detalles</span>
                  <ChevronRight size={16} className="faq-shortcut-arrow" />
                </a>
              </div>
            </div>

            <div className="faq-shortcut-card">
              <div className="faq-shortcut-img-wrapper">
                <img src="/crear_reclamo.jpg" alt="Crear Reclamo" />
              </div>
              <div className="faq-shortcut-content">
                <h4 className="faq-shortcut-title">Crear Reclamo</h4>
                <p className="faq-shortcut-desc">Gestiona tus reclamos de manera rápida y efectiva.</p>
              </div>
              <div className="faq-shortcut-action">
                <a href="#crear-reclamo" className="faq-shortcut-link">
                  <span>Ver más detalles</span>
                  <ChevronRight size={16} className="faq-shortcut-arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="faq-support-section">
          <div className="faq-support-content">
            <div className="faq-support-text">
              <h2 className="faq-support-title">Ponte en contacto con nosotros</h2>
              <p className="faq-support-desc">
                Si no encontraste respuesta a tu consulta, escribenos a travez del siguiente enlace y te ayudaremos.
              </p>
            </div>
            <div className="faq-support-action">
              <a 
                href="https://www.starken.cl/hablemos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="faq-support-btn"
              >
                <span>Contactar</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>

      <HomeChatbot />
      <Footer />
    </div>
  );
};

export default Faq;
