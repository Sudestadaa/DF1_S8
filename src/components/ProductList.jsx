import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductList = ({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
  selectedCategory,
  onSelectCategory,
  searchTerm
}) => {
  // Extraer categorías únicas
  const categories = ['Todas', ...new Set(products.map(p => p.category))];

  // Filtrado reactivo en tiempo real por categoría Y por nombre buscado
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h2>Catálogo de Videojuegos</h2>
        
        {/* Filtro por categorías */}
        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje si la búsqueda no arroja resultados */}
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>🔍 No se encontraron juegos que coincidan con "<strong>{searchTerm}</strong>".</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => {
            const isInCart = cart.some(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={isInCart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};