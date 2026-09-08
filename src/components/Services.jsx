import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Despacho a domicilio', desc: 'Retiro en origen, entrega al cliente final', badge: 'Todo Chile', action: 'Cotizar ahora' },
    { title: 'Express mismo día', desc: 'Entrega en menos de 4 horas', badge: 'Solo RM', action: 'Ver zonas' },
    { title: 'Día hábil siguiente', desc: 'Entrega al día siguiente hábil', badge: 'Todo Chile', action: 'Cotizar ahora' },
    { title: 'Retiro en agencia', desc: 'El cliente elige dónde y cuándo retirar', badge: '+400 puntos', action: 'Buscar agencia' },
    { title: 'Devoluciones y cambios', desc: 'Flujo automatizado de retiros y recepciones', badge: 'Todo Chile', action: 'Saber más' },
    { title: 'Envíos internacionales', desc: 'Importaciones y exportaciones con cobertura', badge: 'Mundial', action: 'Consultar' },
    { title: 'Panel emprendedor', desc: 'Gestión, reportes y etiquetas en un solo lugar', badge: 'Para negocios', action: 'Crear cuenta' }
  ];

  return (
    <section className="services-section container" id="servicios">
      <div className="section-header">
        <h2>Descubre tu forma de enviar</h2>
        <p>Soluciones logísticas diseñadas para cada necesidad.</p>
      </div>
      
      <div className="services-grid">
        {services.map((service, idx) => (
          <div key={idx} className="service-card">
            <div className="service-content">
              <span className="badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
            <div className="service-hover-action">
              <a href="#action" className="action-link">{service.action} →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
