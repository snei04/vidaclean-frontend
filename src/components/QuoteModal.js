// frontend/src/components/QuoteModal.js
import React, { useState } from 'react';
import api from '../api/axiosConfig';

function QuoteModal({ productSku, onClose, onQuoteSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const requestData = {
      sku: productSku,
      user: formData,
    };

    api.post('/requests/quotes', requestData)
      .then(response => {
        onQuoteSubmitted(); // Llama a la función para mostrar el mensaje de éxito
        onClose(); // Cierra el modal
      })
      .catch(error => {
        console.error('Error al enviar la cotización:', error);
        alert('Hubo un error al enviar tu solicitud.');
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Solicitar Cotización</h2>
        <p>Producto SKU: <strong>{productSku}</strong></p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="company">Empresa (Opcional)</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button-secondary">Cancelar</button>
            <button type="submit" className="button-primary">Enviar Solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuoteModal;