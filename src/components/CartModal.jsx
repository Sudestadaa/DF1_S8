import React from 'react';

export const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
  if (!isOpen) return null; // Si el modal está cerrado, no renderiza nada

  // Calcular el total de la compra
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🛒 Tu Carrito de Compras</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* RENDERIZADO CONDICIONAL: Carrito Vacío vs Carrito con Productos */}
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">👻</span>
              <p>Tu carrito está totalmente vacío.</p>
              <p className="subtext">¡Agrega algunos juegos para comenzar la pesadilla!</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                  </div>

                  {/* Controles de cantidad con useState delegados */}
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <button 
                    className="delete-item-btn" 
                    onClick={() => onRemoveFromCart(item.id)}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Modal con Totales */}
        {cart.length > 0 && (
          <div className="modal-footer">
            <div className="total-container">
              <span>Total a pagar:</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>
            <div className="modal-actions">
              <button className="btn-clear" onClick={onClearCart}>Vaciar Carrito</button>
              <button className="btn-checkout" onClick={() => alert('¡Gracias por tu compra en Nightmare Digital!')}>
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};