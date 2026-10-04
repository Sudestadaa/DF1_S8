import React from 'react';

export const Header = ({ cartCount, onOpenCart, searchTerm, onSearchChange }) => {
  // Función auxiliar para desplazamiento suave entre secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => scrollToSection('inicio')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">🎮</span>
          <h1>Nightmare <span className="highlight">Digital</span></h1>
        </div>

        {/* Buscador reactivo en tiempo real  */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar juego..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Enlaces de navegación */}
        <nav className="nav-links">
          <button className="nav-link" onClick={() => scrollToSection('inicio')}>Inicio</button>
          <button className="nav-link" onClick={() => scrollToSection('catalogo')}>Productos</button>
          <button className="nav-link" onClick={() => scrollToSection('contacto')}>Contacto</button>
        </nav>

        {/* Botón del Carrito */}
        <button className="cart-btn" onClick={onOpenCart}>
          🛒 Carrito
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};