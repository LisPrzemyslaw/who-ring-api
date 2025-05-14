import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
`;

const ErrorTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
`;

const ErrorDescription = styled(motion.p)`
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const HomeButton = styled(motion(Link))`
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    text-decoration: none;
  }
`;

const NotFound = () => {
  return (
    <PageContainer>
      <ErrorCode
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </ErrorCode>
      
      <ErrorTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Page Not Found
      </ErrorTitle>
      
      <ErrorDescription
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        The page you are looking for doesn't exist or has been moved.
      </ErrorDescription>
      
      <HomeButton
        to="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Home
      </HomeButton>
    </PageContainer>
  );
};

export default NotFound;