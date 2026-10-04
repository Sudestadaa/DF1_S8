import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';
import './App.css';

export function App() {
  // Estados de la aplicación (useState)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  
  
  const [searchTerm, setSearchTerm] = useState('');

  // Carga asíncrona de datos con useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Error al cargar la base de datos de productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // Manejo del Carrito
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showNotification(`"${product.title}" agregado al carrito 🛒`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showNotification('Producto eliminado del carrito ❌');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
    showNotification('Carrito vaciado');
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container" id="inicio">
      {/* Header con el Buscador reactivo integrado */}
      <Header 
        cartCount={totalCartItems} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {notification && (
        <div className="toast-notification">
          {notification}
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h2>Ofertas de Pesadilla ⚡</h2>
          <p>Los mejores títulos digitales para PC y Consolas al mejor precio.</p>
        </div>
      </section>

      <main className="main-content" id="catalogo">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando catálogo de Nightmare Digital...</p>
          </div>
        ) : (
          <ProductList
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchTerm={searchTerm}
          />
        )}
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <Footer />
    </div>
  );
}

export default App;