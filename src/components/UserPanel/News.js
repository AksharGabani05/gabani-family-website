// src/components/UserPanel/News.js
import React from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const News = () => (
  <NewsContainer>
    <Title>Family News</Title>
    <p>Read about family updates and announcements.</p>
  </NewsContainer>
);

export default News;
