// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// --- Importación de Componentes de Layout ---
import Navbar from './components/Navbar'; // Asumiendo que creaste Navbar.js

// --- Importación de Páginas y Componentes ---
import ProductDetail from './components/ProductDetail';
import AboutUsPage from './components/AboutUsPage';
import ManufacturingPage from './components/ManufacturingPage';
import DistributorPage from './components/DistributorPage';
import BlogListPage from './pages/BlogListPage';
import SinglePostPage from './pages/SinglePostPage';
import HomePage from './pages/HomePage';

// --- Importación de Rutas de Admin ---
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

import './App.css';

// --- Componente de Layout Público ---
// Este componente envuelve todas las páginas públicas para darles la misma barra de navegación.
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se renderizará el contenido de cada página pública */}
      </main>
    </>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* --- Rutas Públicas (usan el PublicLayout con Navbar) --- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} /> 
            <Route path="products/:sku" element={<ProductDetail />} />
            <Route path="quienes-somos" element={<AboutUsPage />} />
            <Route path="proceso-fabricacion" element={<ManufacturingPage />} /> {/* Corregido para que coincida con el Navbar */}
            <Route path="distribuidores" element={<DistributorPage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:id" element={<SinglePostPage />} />
          </Route>
    <Route path="/oferta-distribuidores" element={<LandingPage />} /> 
          {/* --- Rutas de Administración (no usan el layout público) --- */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;