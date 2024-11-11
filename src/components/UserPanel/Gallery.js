import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        console.log('API Response:', response.data); // Log the response

        // Ensure the response structure is correct
        if (response.data && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          setError('No images found in the response.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Gallery</h1>
      <div className="gallery">
        {images && images.length > 0 ? ( // Add a check here
          images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.url} alt={image.title || 'Untitled'} style={{ maxWidth: '100%', height: 'auto' }} />
              <p>{image.title || 'Untitled'}</p>
              <p>{image.aiDescription}</p>
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;

