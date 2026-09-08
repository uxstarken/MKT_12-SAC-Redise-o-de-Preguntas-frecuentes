import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cotizar');

  return (
    <section className="hero-section">
      <h1 className="hero-tagline">
        Envíos rápidos, seguros y <span>sin fricciones.</span>
      </h1>
      
      <div className="hero-widget">
        <div className="hero-tabs">
          <button 
            className={`hero-tab ${activeTab === 'cotizar' ? 'active' : ''}`}
            onClick={() => setActiveTab('cotizar')}
          >
            Cotizar
          </button>
          <button 
            className={`hero-tab ${activeTab === 'rastrear' ? 'active' : ''}`}
            onClick={() => setActiveTab('rastrear')}
          >
            Rastrear
          </button>
          <button 
            className={`hero-tab ${activeTab === 'emitir' ? 'active' : ''}`}
            onClick={() => setActiveTab('emitir')}
          >
            Emitir envío
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'cotizar' && (
            <div className="form-content">
              <div className="form-row">
                <div className="form-group">
                  <label>Origen</label>
                  <input type="text" placeholder="¿Desde dónde envías?" />
                </div>
                <div className="form-group">
                  <label>Destino</label>
                  <input type="text" placeholder="¿Hacia dónde va?" />
                </div>
                <div className="form-group">
                  <label>Tipo de envío</label>
                  <select>
                    <option>Documento</option>
                    <option>Paquete pequeño</option>
                    <option>Carga pesada</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary" style={{width: '100%'}} onClick={() => navigate('/cotizar')}>Cotizar ahora</button>
            </div>
          )}

          {activeTab === 'rastrear' && (
            <div className="form-content">
              <div className="form-row">
                <div className="form-group" style={{flex: 3}}>
                  <label>Número de seguimiento</label>
                  <input type="text" placeholder="Ingresa tu número (ej: 123456789)" />
                </div>
                <div className="form-group" style={{flex: 1, justifyContent: 'flex-end'}}>
                  <button className="btn btn-primary" style={{height: '50px'}}>Rastrear</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emitir' && (
            <div className="form-content">
              <div className="emitir-banner">
                <div>
                  <h3>Emite tu etiqueta en 3 minutos</h3>
                  <p>Inicia sesión para usar tus direcciones guardadas o continúa como invitado.</p>
                </div>
                <div className="emitir-actions">
                  <button className="btn btn-outline" onClick={() => navigate('/login')}>Ingresar</button>
                  <button className="btn btn-primary" onClick={() => navigate('/emitir')}>Emitir como invitado</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
