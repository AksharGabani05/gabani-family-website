// src/components/AdminPanel/ManageEvents.js
import React from 'react';
import styled from 'styled-components';

const ManageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const ManageEvents = () => (
  <ManageContainer>
    <Title>Manage Events</Title>
    <p>Add, edit, or delete family events.</p>
  </ManageContainer>
);

export default ManageEvents;
