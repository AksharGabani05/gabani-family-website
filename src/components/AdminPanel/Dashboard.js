import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faImage, faNewspaper, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';

// Styled Components for Dashboard
const DashboardContainer = styled(Container)`
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
  }

  .card-body {
    padding: 30px;
    text-align: left;
  }

  .card-title {
    font-size: 1.6rem;
    font-weight: 600;
    color: #007bff;
    display: flex;
    align-items: center;
  }

  .card-text {
    font-size: 1.2rem;
    color: #555;
  }

  .card-icon {
    margin-right: 10px;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    .card-body {
      padding: 20px;
    }

    .card-title {
      font-size: 1.4rem;
    }

    .card-text {
      font-size: 1rem;
    }
  }
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;
  font-size: 1.1rem;
  padding: 12px 24px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

const Footer = styled.footer`
  margin-top: 50px;
  padding: 20px 0;
  background-color: #343a40;
  color: #fff;
  border-top: 1px solid #dee2e6;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Dashboard = () => (
  <DashboardContainer>
    <SectionTitle>Admin Dashboard</SectionTitle>
    <Row>
      {/* Manage Events Card */}
      <Col xs={12} md={6} lg={4} className="mb-4">
        <StyledCard>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faCalendarAlt} className="card-icon" />
              Manage Events
            </Card.Title>
            <Card.Text>
              Create, update, and delete events to keep your community informed.
            </Card.Text>
            <Link to="/admin/manage-events">
              <StyledButton>Go to Manage Events</StyledButton>
            </Link>
          </Card.Body>
        </StyledCard>
      </Col>

      {/* Manage Gallery Card */}
      <Col xs={12} md={6} lg={4} className="mb-4">
        <StyledCard>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faImage} className="card-icon" />
              Manage Gallery
            </Card.Title>
            <Card.Text>
              Upload and organize images to showcase your community's activities.
            </Card.Text>
            <Link to="/admin/manage-gallery">
              <StyledButton>Go to Manage Gallery</StyledButton>
            </Link>
          </Card.Body>
        </StyledCard>
      </Col>

      {/* Manage News Card */}
      <Col xs={12} md={6} lg={4} className="mb-4">
        <StyledCard>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faNewspaper} className="card-icon" />
              Manage News
            </Card.Title>
            <Card.Text>
              Post and manage news articles to keep everyone updated.
            </Card.Text>
            <Link to="/admin/manage-news">
              <StyledButton>Go to Manage News</StyledButton>
            </Link>
          </Card.Body>
        </StyledCard>
      </Col>

      {/* Manage Members Card */}
      <Col xs={12} md={6} lg={4} className="mb-4">
        <StyledCard>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faUsers} className="card-icon" />
              Manage Members
            </Card.Title>
            <Card.Text>
              Add, update, and remove members from your community.
            </Card.Text>
            <Link to="/admin/manage-members">
              <StyledButton>Go to Manage Members</StyledButton>
            </Link>
          </Card.Body>
        </StyledCard>
      </Col>

      {/* Manage Admin Users Card */}
      <Col xs={12} md={6} lg={4} className="mb-4">
        <StyledCard>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faUserShield} className="card-icon" />
              Manage Admin Users
            </Card.Title>
            <Card.Text>
              Add, update, and remove admin users for your application.
            </Card.Text>
            <Link to="/admin/manage-admin-users">
              <StyledButton>Go to Manage Admin Users</StyledButton>
            </Link>
          </Card.Body>
        </StyledCard>
      </Col>
    </Row>

    <Footer>
      <p className="mb-0">Powered by <strong>DexWire Infotech</strong></p>
    </Footer>
  </DashboardContainer>
);

export default Dashboard;
