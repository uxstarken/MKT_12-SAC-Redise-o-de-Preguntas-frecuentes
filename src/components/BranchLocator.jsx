import React from 'react';
import './BranchLocator.css';

const BranchLocator = () => {
  return (
    <section className="branch-locator-section container" id="sucursales">
      <div className="locator-card">
        <div className="locator-content">
          <h2>Encuentra tu sucursal más cercana</h2>
          <p>Tenemos más de 400 puntos en todo Chile listos para recibir tus envíos.</p>
          
          <div className="locator-form">
            <input 
              type="text" 
              placeholder="Escribe tu comuna o dirección..." 
              className="locator-input"
            />
            <button className="btn btn-primary btn-locator">Buscar</button>
          </div>
        </div>
        
        {/* Placeholder for lazy-loaded map / map image */}
        <div className="locator-map-placeholder">
          <div className="map-illustration">
            Mapa Interactivo (Carga diferida)
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocator;
