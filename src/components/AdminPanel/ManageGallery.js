import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';

const GalleryContainer = styled(Container)`
  margin-top: 20px;
`;

const GalleryItem = styled(Card)`
  margin-bottom: 20px;
`;

const ManageGallery = () => {
  const [images, setImages] = useState([]); // Holds images from JSON server
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [newImage, setNewImage] = useState({ url: '', title: '' }); // New image form input

  // Fetch images from JSON server on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        setImages(response.data || []); // Handle if response is empty
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  // Mock AI data generator function
  const generateAIAttributes = (image) => ({
    ...image,
    aiDescription: 'Sample AI description generated for the image',
    tags: ['AI', 'generated', 'example']
  });

  // Add new image with AI-generated data to JSON server
  const addImage = async () => {
    const imageWithAI = generateAIAttributes(newImage); // Add AI attributes
    try {
      const response = await axios.post('http://localhost:5000/images', imageWithAI);
      setImages([...images, response.data]); // Add new image to state
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding new image:', error);
    }
  };

  // Clear form fields
  const resetForm = () => {
    setNewImage({ url: '', title: '' });
  };

  // Delete an image by ID
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      setImages(images.filter((image) => image.id !== id)); // Update state
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <GalleryContainer>
      <h1>Manage Gallery with AI Data</h1>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Image
      </Button>

      {/* Image Gallery */}
      <Row>
        {images.length > 0 ? (
          images.map((image) => (
            <Col md={4} key={image.id}>
              <GalleryItem>
                <Card.Img variant="top" src={image.url} alt={image.title} />
                <Card.Body>
                  <Card.Title>{image.title}</Card.Title>
                  <p><strong>AI Description:</strong> {image.aiDescription}</p>
                  <p><strong>Tags:</strong> {image.tags.join(', ')}</p>
                  <Button variant="danger" onClick={() => deleteImage(image.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </GalleryItem>
            </Col>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </Row>

      {/* Modal for adding new image */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                placeholder="Enter image URL"
                value={newImage.url}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="imageTitle" className="mt-3">
              <Form.Label>Image Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter image title"
                value={newImage.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addImage}>
            Add Image
          </Button>
        </Modal.Footer>
      </Modal>
    </GalleryContainer>
  );
};

export default ManageGallery;
