// src/pages/BlogListPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/blog');
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container"><p>Cargando publicaciones...</p></div>;
  }

  return (
    <div className="container">
      <h1>Nuestro Blog</h1>
      <p>Consejos de limpieza, noticias de la empresa y más.</p>
      <div className="blog-posts-list">
        {posts.length === 0 ? (
          <p>Aún no hay publicaciones. ¡Vuelve pronto!</p>
        ) : (
          posts.map(post => (
            <article key={post._id} className="blog-post-summary">
              {/* --- MEJORA: Muestra la imagen si existe --- */}
              {post.image && (
                <Link to={`/blog/${post._id}`} className="blog-summary-image-link">
                  <img src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`} alt={post.title} />
                </Link>
              )}
              <div className="blog-summary-content">
                <h2>{post.title}</h2>
                <p className="post-meta">Publicado el {new Date(post.createdAt).toLocaleDateString()}</p>
                <p>{post.summary}</p>
                <Link to={`/blog/${post._id}`} className="btn">Leer Más →</Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogListPage;