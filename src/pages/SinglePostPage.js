// src/pages/SinglePostPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setPost(data);
      } catch (error) {
        console.error('Error al obtener la publicación:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="container"><p>Cargando...</p></div>;
  }

  if (!post) {
    return <div className="container"><p>Publicación no encontrada.</p></div>;
  }

  return (
    <div className="container single-post-container">
      {/* --- MEJORA: Muestra la imagen de cabecera si existe --- */}
      {post.image && (
        <img 
          src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`} 
          alt={post.title} 
          className="post-header-image"
        />
      )}
      
      <Link to="/blog">← Volver al Blog</Link>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">Publicado el {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default SinglePostPage;