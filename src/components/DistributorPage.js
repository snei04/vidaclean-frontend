// frontend/src/components/DistributorPage.js
import React, { useState } from 'react';
import api from '../api/axiosConfig';

function DistributorPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    nit: '',
    city: '',
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/requests/distributor-requests', formData)
      .then(response => {
        setMessage('¡Gracias por tu interés! Hemos recibido tu solicitud y te contactaremos pronto.');
        setFormData({ companyName: '', nit: '', city: '', name: '', email: '' }); // Limpia el formulario
      })
      .catch(error => {
        setMessage('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.');
        console.error('Error en la solicitud de distribuidor:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Conviértete en Distribuidor</h2>
      <p>Llena el siguiente formulario para que nuestro equipo comercial se ponga en contacto contigo.</p>

      {!message ? (
        <form onSubmit={handleSubmit} className="distributor-form">
          <div className="form-group">
            <label htmlFor="companyName">Nombre de la Empresa</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="nit">NIT / RUC</label>
            <input type="text" id="nit" name="nit" value={formData.nit} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre del Contacto</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email del Contacto</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="button-primary">Enviar Solicitud</button>
        </form>
      ) : (
        <p className="confirmation-message">{message}</p>
      )}
    </div>
  );
}

export default DistributorPage;