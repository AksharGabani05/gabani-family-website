// src/components/UserPanel/Events.js
import React from 'react';
import styled from 'styled-components';

const EventsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Events = () => (
  <EventsContainer>
    <Title>Events</Title>
    <p>Stay up-to-date with family events and gatherings.</p>
  </EventsContainer>
);

export default Events;
