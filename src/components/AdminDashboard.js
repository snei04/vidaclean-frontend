// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

// --- Componente #1: Formulario Modal para PRODUCTOS (Sin cambios) ---
function ProductFormModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    sku: '', name: '', category: '', description: '', specifications: '', image: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        category: product.category || '',
        description: product.description || '',
        specifications: product.specifications || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== '_id' && key !== '__v' && key !== 'image') {
         submissionData.append(key, formData[key]);
      }
    });
    if (imageFile) {
      submissionData.append('image', imageFile);
    }
    onSave(submissionData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>SKU</label><input name="sku" value={formData.sku} onChange={handleChange} required /></div>
          <div className="form-group"><label>Nombre</label><input name="name" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Categoría</label><input name="category" value={formData.category} onChange={handleChange} required /></div>
          <div className="form-group"><label>Descripción</label><textarea name="description" value={formData.description} onChange={handleChange}></textarea></div>
          <div className="form-group"><label>Especificaciones</label><textarea name="specifications" value={formData.specifications} onChange={handleChange}></textarea></div>
          <div className="form-group"><label>Imagen</label><input type="file" name="image" onChange={handleImageChange} /></div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button-secondary">Cancelar</button>
            <button type="submit" className="button-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Componente #2: Formulario Modal para el BLOG (VERSIÓN MODIFICADA) ---
function BlogPostFormModal({ post, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: '', summary: '', content: '' });
  const [imageFile, setImageFile] = useState(null); // Estado para el archivo de imagen

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        summary: post.summary || '',
        content: post.content || ''
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar la selección del archivo de imagen
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Se usa FormData para poder enviar texto y archivos juntos
    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('summary', formData.summary);
    submissionData.append('content', formData.content);

    if (imageFile) {
      submissionData.append('image', imageFile);
    }
    
    onSave(submissionData); // Se envía el FormData
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{post ? 'Editar Publicación' : 'Crear Nueva Publicación'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Título</label><input name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="form-group"><label>Resumen</label><textarea name="summary" value={formData.summary} onChange={handleChange} required></textarea></div>
          <div className="form-group"><label>Contenido Completo</label><textarea name="content" value={formData.content} onChange={handleChange} rows="10" required></textarea></div>
          
          {/* Campo para subir la imagen */}
          <div className="form-group">
            <label>Imagen de la Publicación</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button-secondary">Cancelar</button>
            <button type="submit" className="button-primary">Guardar Publicación</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Componente #3: El Panel de Administración Principal (Sin cambios en su lógica) ---
function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [distributorRequests, setDistributorRequests] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [landingPageLeads, setLandingPageLeads] = useState([]);
  const [offerContent, setOfferContent] = useState({ title: '', description: '', bannerText: '' });
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const fetchData = async () => {
    try {
      const [productsRes, quotesRes, distRes, postsRes, leadsRes, offerRes] = await Promise.all([
        api.get('/products'),
        api.get('/requests/quotes'),
        api.get('/requests/distributor-requests'),
        api.get('/blog'),
        api.get('/requests/landing-leads'),
        api.get('/content/offer')
      ]);
      setProducts(productsRes.data.products); 
      setQuoteRequests(quotesRes.data);
      setDistributorRequests(distRes.data);
      setBlogPosts(postsRes.data);
      setLandingPageLeads(leadsRes.data);
      setOfferContent(offerRes.data);
    } catch (error) {
      console.error("Error al obtener los datos del dashboard:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOfferChange = (e) => {
    setOfferContent({ ...offerContent, [e.target.name]: e.target.value });
  };

  const handleOfferSave = async () => {
    try {
      await api.put('/content/offer', offerContent);
      alert('¡Contenido de la oferta actualizado!');
    } catch (error) {
      alert('Error al actualizar el contenido.');
      console.error('Error al guardar la oferta:', error);
    }
  };

  const handleOpenProductModal = (product = null) => { setEditingProduct(product); setIsProductModalOpen(true); };
  const handleCloseProductModal = () => { setIsProductModalOpen(false); setEditingProduct(null); };
  const handleSaveProduct = async (productFormData) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productFormData);
      } else {
        await api.post('/products', productFormData);
      }
      fetchData();
      handleCloseProductModal();
    } catch (error) { console.error('Error al guardar el producto:', error); }
  };
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      try {
        await api.delete(`/products/${productId}`);
        fetchData();
      } catch (error) { console.error('Error al eliminar el producto:', error); }
    }
  };

  const handleOpenPostModal = (post = null) => { setEditingPost(post); setIsPostModalOpen(true); };
  const handleClosePostModal = () => { setIsPostModalOpen(false); setEditingPost(null); };
  const handleSavePost = async (postData) => {
    try {
      if (editingPost) {
        await api.put(`/blog/${editingPost._id}`, postData);
      } else {
        await api.post('/blog', postData);
      }
      fetchData();
      handleClosePostModal();
    } catch (error) { console.error('Error al guardar la publicación:', error); }
  };
  const handleDeletePost = async (postId) => {
    if (window.confirm('¿Seguro que quieres eliminar esta publicación?')) {
      try {
        await api.delete(`/blog/${postId}`);
        fetchData();
      } catch (error) { console.error('Error al eliminar la publicación:', error); }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-header-actions">
          <Link to="/" className="button-secondary" target="_blank" rel="noopener noreferrer">
            Ver Sitio ↗
          </Link>
          <button onClick={handleLogout} className="button-delete">Cerrar Sesión</button>
        </div>
      </header>
      
      {/* SECCIÓN GESTIONAR CONTENIDO PROMOCIONAL */}
      <div className="admin-section">
        <h3>Gestionar Contenido Promocional</h3>
        <div className="form-group">
          <label>Título de la Landing Page</label>
          <input type="text" name="title" value={offerContent.title} onChange={handleOfferChange} />
        </div>
        <div className="form-group">
          <label>Descripción de la Landing Page</label>
          <textarea name="description" rows="4" value={offerContent.description} onChange={handleOfferChange}></textarea>
        </div>
        <div className="form-group">
          <label>Texto del Banner Promocional (Página de Inicio)</label>
          <input type="text" name="bannerText" value={offerContent.bannerText} onChange={handleOfferChange} />
        </div>
        <button onClick={handleOfferSave} className="btn btn-primary">Guardar Contenido</button>
      </div>

      {/* SECCIÓN DE PRODUCTOS */}
      <div className="admin-section">
        <h3>Gestionar Productos</h3>
        <button onClick={() => handleOpenProductModal()} className="button-primary">Añadir Nuevo Producto</button>
        <table className="products-table">
          <thead><tr><th>SKU</th><th>Nombre</th><th>Categoría</th><th>Acciones</th></tr></thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.sku}</td><td>{product.name}</td><td>{product.category}</td>
                <td className="actions-cell">
                  <button onClick={() => handleOpenProductModal(product)} className="button-edit">Editar</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="button-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECCIÓN GESTIONAR BLOG */}
      <div className="admin-section">
        <h3>Gestionar Blog</h3>
        <button onClick={() => handleOpenPostModal()} className="button-primary">Crear Nueva Publicación</button>
        <table className="products-table">
          <thead><tr><th>Título</th><th>Fecha</th><th>Acciones</th></tr></thead>
          <tbody>
            {blogPosts.map(post => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button onClick={() => handleOpenPostModal(post)} className="button-edit">Editar</button>
                  <button onClick={() => handleDeletePost(post._id)} className="button-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECCIÓN DE SOLICITUDES DE COTIZACIÓN */}
      <div className="admin-section">
        <h3>Solicitudes de Cotización</h3>
        <table className="products-table">
          <thead><tr><th>Fecha</th><th>Producto SKU</th><th>Nombre Cliente</th><th>Email</th><th>Empresa</th></tr></thead>
          <tbody>
            {quoteRequests.map(req => (
              <tr key={req._id}>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{req.sku}</td>
                <td>{req.user.name}</td>
                <td>{req.user.email}</td>
                <td>{req.user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECCIÓN DE SOLICITUDES DE DISTRIBUIDOR */}
      <div className="admin-section">
        <h3>Solicitudes de Distribuidor</h3>
        <table className="products-table">
          <thead><tr><th>Fecha</th><th>Empresa</th><th>NIT</th><th>Ciudad</th><th>Contacto</th><th>Email</th></tr></thead>
          <tbody>
            {distributorRequests.map(req => (
              <tr key={req._id}>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{req.companyName}</td>
                <td>{req.nit}</td>
                <td>{req.city}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECCIÓN DE PROSPECTOS DE LA LANDING PAGE */}
      <div className="admin-section">
        <h3>Prospectos de la Oferta (Landing Page)</h3>
        <table className="products-table">
          <thead><tr><th>Fecha</th><th>Nombre</th><th>Email</th><th>Empresa</th></tr></thead>
          <tbody>
            {landingPageLeads.map(lead => (
              <tr key={lead._id}>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {isProductModalOpen && <ProductFormModal product={editingProduct} onClose={handleCloseProductModal} onSave={handleSaveProduct} />}
      {isPostModalOpen && <BlogPostFormModal post={editingPost} onClose={handleClosePostModal} onSave={handleSavePost} />}
    </div>
  );
}

export default AdminDashboard;