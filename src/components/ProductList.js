// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import FilterSidebar from './FilterSidebar';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- useEffect unificado para buscar datos ---
  // Se ejecuta cada vez que 'selectedCategory' o 'page' cambian.
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/products?page=${page}`;
        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        // --> Mensaje de Depuración 2: Verifica la URL final
        console.log(`[DEBUG] Llamando a la API con la URL: ${url}`);

        const { data } = await api.get(url);

        // Si es la página 1, reemplaza los productos. Si no, los añade.
        setProducts(prevProducts => (page === 1 ? data.products : [...prevProducts, ...data.products]));
        setTotalPages(data.totalPages);

      } catch (err) {
        setError('No se pudieron cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Solo busca si no estamos en la página 0 (lo que podría pasar momentáneamente)
    if(page > 0) {
        fetchProducts();
    }
  }, [selectedCategory, page]);

  // --- Función dedicada para manejar el cambio de categoría ---
  const handleCategoryChange = (category) => {
    // --> Mensaje de Depuración 1: Verifica la categoría seleccionada
    console.log(`[DEBUG] Categoría seleccionada: ${category}`);

    // Limpia los productos actuales y reinicia la página
    setProducts([]);
    setSelectedCategory(category);
    setPage(1);
  };
  
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderContent = () => {
    if (loading && products.length === 0) {
      return <p className="info-message">Cargando productos...</p>;
    }
    if (error) {
      return <p className="error-message">{error}</p>;
    }
    if (!loading && products.length === 0) {
      return <p className="info-message">No se encontraron productos.</p>;
    }
    return (
      <div className="product-catalog">
        {products.map(product => (
          <Link to={`/products/${product.sku}`} key={product.sku} className="product-card-link">
            <div className="product-card">
              <img src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${product.image}`} alt={product.name} />
              <div className="product-card-info">
                <h2>{product.name}</h2>
                <p className="product-category">{product.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="catalog-container">
      <FilterSidebar onCategoryChange={handleCategoryChange} />
      <div className="catalog-content">
        {renderContent()}
        {loading && products.length > 0 && <p className="info-message">Cargando...</p>}
        {!loading && page < totalPages && (
          <div className="load-more-container">
            <button onClick={handleLoadMore} className="btn btn-primary">
              Cargar Más Productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;