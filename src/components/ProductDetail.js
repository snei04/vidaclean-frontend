// frontend/src/components/ProductDetail.js
// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState('');
  const { sku } = useParams();

  useEffect(() => {
    // Usamos la configuración de la API que ya tienes
    api.get(`/products/${sku}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Hubo un error al obtener el producto!', error));
  }, [sku]);
  
  if (!product) {
    return <div className="container"><p>Cargando producto...</p></div>;
  }

  // --- MEJORA: Lógica para convertir las especificaciones en una lista ---
  // Asumimos que las especificaciones están separadas por puntos ".".
  const specificationsList = product.specifications ? product.specifications.split('. ').filter(spec => spec) : [];

  return (
    <div className="product-detail-page container">
      {/* --- MEJORA: Enlace "Volver" más estilizado --- */}
      <Link to="/" className="back-link">
        <i className="fas fa-arrow-left"></i> Volver al Catálogo
      </Link>

      <div className="product-detail-grid">
        {/* --- MEJORA: Contenedor de la imagen --- */}
        <div className="product-image-container">
          <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
        </div>

        {/* --- MEJORA: Contenedor de la información --- */}
        <div className="product-info">
          <span className="product-detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-sku"><strong>SKU:</strong> {product.sku}</p>
          
          <h3>Descripción</h3>
          <p className="product-description">{product.description}</p>
          
          {specificationsList.length > 0 && (
            <>
              <h3>Especificaciones</h3>
              <ul className="specifications-list">
                {specificationsList.map((spec, index) => (
                  <li key={index}><i className="fas fa-check"></i> {spec}</li>
                ))}
              </ul>
            </>
          )}

          {!quoteMessage ? (
            <button className="btn btn-primary quote-button" onClick={() => setIsModalOpen(true)}>
              Solicitar Cotización
            </button>
          ) : (
            <p className="confirmation-message">{quoteMessage}</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <QuoteModal
          productSku={product.sku}
          onClose={() => setIsModalOpen(false)}
          onQuoteSubmitted={() => {
            setQuoteMessage('¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');
            setIsModalOpen(false); // Cierra el modal al enviar
          }}
        />
      )}
    </div>
  );
}

export default ProductDetail;