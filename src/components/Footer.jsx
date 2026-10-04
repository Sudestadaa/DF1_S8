import React, { useState, useEffect } from 'react';

export const Footer = () => {
  // Estado para controlar la visibilidad del botón "Volver Arriba"
  const [showScrollTop, setShowScrollTop] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver suavemente al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        {/* Columna 1: Marca y descripción */}
        <div className="footer-section">
          <h3>NIGHTMAREDIGITAL</h3>
          <p>Tu plataforma de videojuegos digitales de confianza.</p>
        </div>

        {/* Columna 2: Información de Contacto */}
        <div className="footer-section">
          <h3>CONTACTO</h3>
          <p>Email: soporte@nightmaredigital.cl</p>
          <p>Atención: Lunes a Viernes 09:00 - 18:00</p>
        </div>

        {/* Columna 3: Botón de Volver Arriba */}
        <div className="footer-section footer-action">
          {/* Renderizado condicional del botón flotante segun scroll */}
          {showScrollTop && (
            <button className="btn-back-to-top" onClick={scrollToTop}>
              ↑ Volver Arriba
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};