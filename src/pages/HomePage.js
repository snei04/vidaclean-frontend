// src/pages/HomePage.js
// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

function HomePage() {
  // Estado para guardar el contenido dinámico (texto del banner, etc.)
  const [siteContent, setSiteContent] = useState({ bannerText: '' });

  // Pide los datos del contenido al cargar la página
  useEffect(() => {
    axios.get('http://localhost:5000/api/content/offer')
      .then(response => {
        if (response.data) {
          setSiteContent(response.data);
        }
      })
      .catch(error => console.error('Error al obtener el contenido del sitio:', error));
  }, []);

  return (
    <>
      {/* 1. Sección Hero con Video de Fondo */}
      <section className="hero-section">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src="/videos.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        <div className="hero-content">
          <h1>Soluciones de Limpieza para Distribuidores</h1>
          <p>Calidad y rendimiento para hacer crecer tu negocio en Funza y toda Colombia.</p>
          <div className="hero-buttons">
            <a href="/#productos" className="btn btn-primary">Ver Catálogo</a>
            <a 
              href="/distribuidores" 
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ser Distribuidor
            </a>
          </div>
        </div>
      </section>

      {/* 2. Sección de Características/Pilares */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <i className="fa-solid fa-award"></i>
              <h3>Calidad Superior</h3>
              <p>Productos fabricados bajo los más altos estándares para garantizar eficacia.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-leaf"></i>
              <h3>Fórmulas Ecológicas</h3>
              <p>Comprometidos con el cuidado del medio ambiente en Soacha y toda Colombia.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-truck-fast"></i>
              <h3>Soporte a Distribuidores</h3>
              <p>Te apoyamos con logística y material para impulsar tus ventas.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. Banner Promocional con Texto Dinámico */}
      {siteContent.bannerText && (
        <section className="promo-banner-container">
          <div className="promo-banner">
            <p>
              <strong>Oferta Especial:</strong> {siteContent.bannerText}
            </p>
            <a 
                href="/oferta-distribuidores" 
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver Oferta
            </a>
          </div>
        </section>
      )}

      

      {/* 5. Catálogo de Productos */}
      <div id="productos" className="container">
        <ProductList />
      </div>

      {/* 6. Llamado a la Acción Final */}
      <section className="final-cta-section">
        <div className="container">
          <h2>¿Listo para ser nuestro próximo distribuidor?</h2>
          <p>Únete a nuestra creciente red y ofrece productos de limpieza de calidad superior.</p>
          <a 
            href="/distribuidores" 
            className="btn btn-cta-final"
            
            rel="noopener noreferrer"
          >
            Empezar Ahora
          </a>
        </div>
      </section>
    </>
  );
}

export default HomePage;