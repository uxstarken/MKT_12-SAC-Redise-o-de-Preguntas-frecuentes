import React, { useState } from 'react';
import './Solutions.css';

const Solutions = () => {
  const [activeSegment, setActiveSegment] = useState('personas');

  const segments = {
    personas: {
      title: 'Envía a donde quieras en minutos, desde tu celular',
      benefits: [
        'Cotiza al instante',
        'Sin registro obligatorio',
        'Rastreo en tiempo real',
        '+400 puntos de entrega'
      ],
      cta: 'Cotizar ahora'
    },
    emprendedores: {
      title: 'Gestiona todos tus despachos desde un solo lugar',
      benefits: [
        'Etiquetas en 3 min',
        'Integración Shopify/WooCommerce',
        'Panel con reportes',
        'Notificaciones al cliente'
      ],
      cta: 'Crear cuenta gratis'
    },
    empresas: {
      title: 'Soluciones logísticas a escala para tu operación',
      benefits: [
        'Facturación centralizada',
        'API de integración',
        'Ejecutivo dedicado',
        'Tarifas por volumen'
      ],
      cta: 'Hablar con ventas'
    },
    internacional: {
      title: 'Exporta e importa con claridad y confianza',
      benefits: [
        'Cobertura mundial',
        'Cálculo de aranceles',
        'Tracking internacional',
        'Asesoría en aduana'
      ],
      cta: 'Consultar servicio'
    }
  };

  const currentData = segments[activeSegment];

  return (
    <section className="solutions-section" id="soluciones">
      <div className="container">
        <div className="section-header">
          <h2>Soluciones a tu medida</h2>
          <p>Encuentra los beneficios ideales según tu perfil.</p>
        </div>
        
        <div className="pill-tabs-container">
          <div className="pill-tabs">
            {Object.keys(segments).map((key) => (
              <button 
                key={key}
                className={`pill-tab ${activeSegment === key ? 'active' : ''}`}
                onClick={() => setActiveSegment(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="solutions-content fade-in-up" key={activeSegment}>
          <div className="solutions-text">
            <h3>{currentData.title}</h3>
            <ul className="benefits-list">
              {currentData.benefits.map((benefit, idx) => (
                <li key={idx}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="var(--color-green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary">{currentData.cta}</button>
          </div>
          <div className="solutions-image-placeholder">
            <div className="img-mockup">Ilustración: {activeSegment}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
