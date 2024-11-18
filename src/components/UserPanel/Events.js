import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button, Row, Col } from 'react-bootstrap';

const EventsContainer = styled.div`
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

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from JSON Server on component mount
  useEffect(() => {
    fetch('http://localhost:5000/Events')
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <EventsContainer>
      <Title>Events</Title>
      <p>Stay up-to-date with family events and gatherings.</p>

      {/* Display Events Cards */}
      <Row className="g-4">
        {events.length === 0 ? (
          <p>No events available at the moment.</p>
        ) : (
          events.map((event) => (
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
                  <Button variant="primary" size="sm">
                    View Details
                  </Button>
                </Card.Body>
              </StyledCard>
            </Col>
          ))
        )}
      </Row>
    </EventsContainer>
  );
};

export default Events;
