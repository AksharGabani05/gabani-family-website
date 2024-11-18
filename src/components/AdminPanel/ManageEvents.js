import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';

const ManageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;

  &:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }

  img {
    height: 200px;
    object-fit: cover;
  }
`;

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
  });

  // Fetch events from JSON Server on component mount
  useEffect(() => {
    fetch('http://localhost:5000/Events')
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle modal open/close
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setModalData({ id: null, name: '', date: '', time: '', location: '', description: '', image: '' });
  };

  // Add or edit event
  const handleSave = () => {
    if (modalData.id) {
      // Edit existing event
      fetch(`http://localhost:5000/Events/${modalData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      })
        .then((response) => response.json())
        .then(() => {
          setEvents(events.map((event) => (event.id === modalData.id ? modalData : event)));
          handleClose();
        });
    } else {
      // Add new event
      fetch('http://localhost:5000/Events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      })
        .then((response) => response.json())
        .then((newEvent) => {
          setEvents([...events, newEvent]);
          handleClose();
        });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Delete event
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/Events/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
      });
  };

  return (
    <ManageContainer>
      <Title>Manage Events</Title>
      <p>Add, edit, or delete family events with detailed information.</p>

      {/* Events Cards */}
      <Row className="g-4">
        {events.map((event) => (
          <Col md={4} sm={6} xs={12} key={event.id}>
            <StyledCard>
              <Card.Img variant="top" src={event.image} alt={event.name} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {event.date} <br />
                  <strong>Time:</strong> {event.time} <br />
                  <strong>Location:</strong> {event.location} <br />
                  <strong>Description:</strong> {event.description}
                </Card.Text>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setModalData(event);
                    handleShow();
                  }}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      {/* Add Event Button */}
      <Button variant="primary" onClick={handleShow} className="mt-4">
        Add Event
      </Button>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.id ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={modalData.name}
                onChange={handleChange}
                placeholder="Enter event name"
              />
            </Form.Group>

            <Form.Group controlId="formEventDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={modalData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEventTime" className="mt-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={modalData.time}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEventLocation" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={modalData.location}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </Form.Group>

            <Form.Group controlId="formEventDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={modalData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of the event"
              />
            </Form.Group>

            <Form.Group controlId="formEventImage" className="mt-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={modalData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </ManageContainer>
  );
};

export default ManageEvents;
