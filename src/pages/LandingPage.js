// src/pages/LandingPage.js
import React, { useState, useEffect   } from 'react';
import api from '../api/axiosConfig';


function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', companyName: '' });
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState({ title: '', description: '' });

   useEffect(() => {
    api.get('/content/offer')
      .then(response => {
        setOffer(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el contenido de la oferta:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías los datos a un endpoint específico para esta campaña
    api.post('/requests/landing-leads', formData)
      .then(response => {
        setMessage(`¡Gracias, ${formData.name}! Un asesor comercial de Vida Clean te contactará pronto.`);
        setFormData({ name: '', email: '', companyName: '' });
      })
      .catch(error => {
        setMessage('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.');
        console.error('Error al enviar lead de landing page:', error);
      });
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <h2 className="landing-logo">Vida Clean</h2>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <div className="container">
            <div className="landing-content">
              <h1>{offer.title || 'Cargando oferta...'}</h1>
              <p className="subtitle">{offer.description}</p>
              
              <div className="benefits">
                <p><i className="fas fa-check-circle"></i> Productos de alta rotación</p>
                <p><i className="fas fa-check-circle"></i> Márgenes de ganancia atractivos</p>
                <p><i className="fas fa-check-circle"></i> Soporte logístico y de marketing</p>
              </div>
            </div>
            <div className="landing-form-container">
              <h3>¡Quiero la Oferta!</h3>
              {!message ? (
                <form onSubmit={handleSubmit} className="landing-form">
                  <input type="text" name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                  <input type="text" name="companyName" placeholder="Nombre de tu negocio" value={formData.companyName} onChange={handleChange} required />
                  <button type="submit" className="btn btn-primary-landing">Solicitar Información</button>
                </form>
              ) : (
                <p className="confirmation-message">{message}</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Vida Clean. Todos los derechos reservados.</p>
          <p>Una empresa de Funza, Cundinamarca, para toda Colombia.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;