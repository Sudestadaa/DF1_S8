import React, { useState } from 'react';

// Tarjeta individual de videojuego
export const ProductCard = ({ product, isInCart, onAddToCart, onRemoveFromCart }) => {
  // useState interactivo local para marcar como favorito
  const [isFavorite, setIsFavorite] = useState(false);

  // Formateador de moneda en pesos chilenos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className={`product-card ${isInCart ? 'in-cart-border' : ''}`}>
      <div className="card-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <span className="category-tag">{product.category}</span>
        
        {/* Botón interactivo de Favorito (useState) */}
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="description">{product.description}</p>
        
        <div className="card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          
          {/* Renderizado condicional del botón de compra/eliminación */}
          {isInCart ? (
            <button 
              className="btn btn-in-cart"
              onClick={() => onRemoveFromCart(product.id)}
            >
              ✓ En el carrito (Quitar)
            </button>
          ) : (
            <button 
              className="btn btn-add"
              onClick={() => onAddToCart(product)}
            >
              + Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};