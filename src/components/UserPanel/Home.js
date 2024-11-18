import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel, Modal, Form, Card, Accordion } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../Header';
import Events from './Events';

// Global Style for Font
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f5f5;
    color: #333;
  }
`;

// Styled Components
const Section = styled.div`
  padding: 60px 20px;
  background-color: ${(props) => props.bgColor || "#fff"};
  text-align: ${(props) => props.align || "center"};
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.color || "#333"};
  font-family: 'Poppins', sans-serif;
`;

const SectionDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: ${(props) => props.color || "#555"};
  font-family: 'Poppins', sans-serif;
`;

const AboutImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin-top: 40px;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }

  img {
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  .card-body {
    padding: 20px;
    text-align: left;
  }
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Home() {
  const [showLogin, setShowLogin] = useState(false);

  // Toggle login modal visibility
  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <>
      <GlobalStyle />
      <Header />

      {/* Hero Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider-image1.jpg"
            alt="First slide"
            style={{ filter: 'brightness(60%)' }}
          />
          <Carousel.Caption>
            <SectionTitle color="#fff">Welcome to Gabani Parivar</SectionTitle>
            <SectionDescription color="#ddd">
              Connecting families across generations.
            </SectionDescription>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider-image2.jpg"
            alt="Second slide"
            style={{ filter: 'brightness(60%)' }}
          />
          <Carousel.Caption>
            <SectionTitle color="#fff">Explore Our Heritage</SectionTitle>
            <SectionDescription color="#ddd">
              Discover our rich family history and values.
            </SectionDescription>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Mission Section */}
      <Section bgColor="#e9ecef">
        <Container>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionDescription>
            We aim to preserve our family values, promote cultural heritage, and strengthen bonds 
            within the Gabani Parivar. Together, we strive to create a supportive and loving community 
            for all members.
          </SectionDescription>
        </Container>
      </Section>

      {/* Upcoming Events Section */}
      <Section bgColor="#fff">
        <Container>
          <SectionTitle>Upcoming Events</SectionTitle>
          <Row>
            <Events/>
          </Row>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section bgColor="#fff">
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is Gabani Parivar?</Accordion.Header>
              <Accordion.Body>
                Gabani Parivar is a family community that celebrates tradition, unity, and shared values.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can I join the community?</Accordion.Header>
              <Accordion.Body>
                You can join by contacting us via the form in the Contact Us section.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Are there regular events?</Accordion.Header>
              <Accordion.Body>
                Yes, we organize events throughout the year to bring our members together.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Section>

      {/* Footer */}
      <Footer>
        <p>&copy; 2024 Gabani Parivar. All Rights Reserved.</p>
      </Footer>
    </>
  );
}

export default Home;
