// src/components/AdminPanel/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DashboardContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;

const Footer = styled.footer`
  margin-top: 30px;
  padding: 10px 0;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
`;

const Dashboard = () => (
  <DashboardContainer>
    <h1 className="mb-4">Admin Dashboard</h1>
    <Row>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Manage Events</Card.Title>
            <Card.Text>
              Create, update, and delete events to keep your community informed.
            </Card.Text>
            <Link to="/admin/manage-events">
              <Button variant="primary">Go to Manage Events</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Manage Gallery</Card.Title>
            <Card.Text>
              Upload and organize images to showcase your community's activities.
            </Card.Text>
            <Link to="/admin/manage-gallery">
              <Button variant="primary">Go to Manage Gallery</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Manage News</Card.Title>
            <Card.Text>
              Post and manage news articles to keep everyone updated.
            </Card.Text>
            <Link to="/admin/manage-news">
              <Button variant="primary">Go to Manage News</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Manage Members</Card.Title>
            <Card.Text>
              Add, update, and remove members from your community.
            </Card.Text>
            <Link to="/admin/manage-members">
              <Button variant="primary">Go to Manage Members</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Footer>
      <p className="mb-0">Powered by <strong>DexWire Infotech</strong></p>
    </Footer>
  </DashboardContainer>
);

export default Dashboard;
