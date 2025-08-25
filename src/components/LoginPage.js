// frontend/src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; // <-- 1. IMPORTA LA INSTANCIA 'api'

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- 2. USA 'api.post' CON UNA RUTA RELATIVA ---
      // La instancia 'api' ya tiene la URL base (Render o localhost) configurada
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');
     
    } catch (err) {
      setError('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  return (
    <div className="form-container">
      <h2>Acceso de Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="button-primary">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginPage;