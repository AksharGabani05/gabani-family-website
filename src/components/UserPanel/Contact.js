// src/components/UserPanel/Contact.js
import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Contact = () => (
  <ContactContainer>
    <Title>Contact Us</Title>
    <p>Feel free to reach out for any inquiries or connections.</p>
  </ContactContainer>
);

export default Contact;
