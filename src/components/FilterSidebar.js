// src/components/FilterSidebar.js
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

function FilterSidebar({ onCategoryChange, isLoading }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/products');
        
        // --- ESTA ES LA LÍNEA CORREGIDA ---
        // Se debe usar 'data.products.map' porque la API ahora devuelve un objeto
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };
    fetchCategories();
  }, []);
const handleCategoryClick = (category) => {
    // Si no está cargando, permite el clic
    if (!isLoading) {
      onCategoryChange(category);
    }
  };

  return (
    <aside className="filter-sidebar">
      <h4>Filtros</h4>
      <h5>Línea</h5>
      <ul>
        <li onClick={() => handleCategoryClick(null)}>Ver Todos</li>
        {categories.map(category => (
          <li key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default FilterSidebar;