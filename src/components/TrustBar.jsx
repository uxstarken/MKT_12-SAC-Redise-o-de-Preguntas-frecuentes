import React from 'react';
import './TrustBar.css';

const TrustBar = () => {
  const stats = [
    { value: '98%', label: 'Entregas a tiempo' },
    { value: '+400', label: 'Sucursales en Chile' },
    { value: '15k', label: 'Emprendedores activos' },
    { value: '24/7', label: 'Soporte y rastreo' }
  ];

  return (
    <section className="trust-bar">
      <div className="container trust-grid">
        {stats.map((stat, index) => (
          <div key={index} className="trust-item">
            <span className="trust-value">{stat.value}</span>
            <span className="trust-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
