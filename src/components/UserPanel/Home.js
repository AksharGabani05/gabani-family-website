// src/components/UserPanel/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Carousel, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Header from '../Header';

const HomeContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const CarouselCaptionTitle = styled.h3`
  font-size: 2.5em;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const CarouselCaptionText = styled.p`
  font-size: 1.2em;
  color: #ddd;
`;

function Home() {
  const [showLogin, setShowLogin] = useState(false);

  // Toggle login modal visibility
  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <>
      <Header />
     
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider-image1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <CarouselCaptionTitle>Welcome to Gabani Parivar</CarouselCaptionTitle>
            <CarouselCaptionText>Connecting families across generations.</CarouselCaptionText>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider-image2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <CarouselCaptionTitle>Explore Our Heritage</CarouselCaptionTitle>
            <CarouselCaptionText>Discover our rich family history and values.</CarouselCaptionText>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
