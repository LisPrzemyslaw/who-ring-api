import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  
  @media (min-width: 768px) {
    flex: 1;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.6;
`;

const HeroImage = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
  
  img {
    width: 100%;
    height: auto;
  }
  
  @media (min-width: 768px) {
    flex: 1;
    margin-top: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const StyledButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : 'rgba(108, 99, 255, 0.1)'};
    transform: translateY(-2px);
    text-decoration: none;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--dark-color);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Know Who's Calling Before You Answer
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Register your phone number with Who Ring and let others identify you when you call. 
            No more unknown numbers or missed important calls.
          </HeroSubtitle>
          <ButtonGroup>
            <StyledButton 
              to="/register" 
              primary
              as={motion.a}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Your Number
            </StyledButton>
            <StyledButton 
              to="/lookup" 
              as={motion.a}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lookup a Number
            </StyledButton>
          </ButtonGroup>
        </HeroContent>
        <HeroImage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img src="https://cdn.pixabay.com/photo/2017/10/27/15/52/phone-2894883_1280.png" alt="Phone illustration" />
        </HeroImage>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>How It Works</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>Register</FeatureTitle>
            <FeatureDescription>
              Enter your phone number and name. We'll send you a verification code to ensure it's really your number.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureIcon>✅</FeatureIcon>
            <FeatureTitle>Verify</FeatureTitle>
            <FeatureDescription>
              Enter the verification code you received via SMS to confirm your phone number ownership.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Get Identified</FeatureTitle>
            <FeatureDescription>
              When you call someone, they can look up your number and see your registered name before answering.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </>
  );
};

export default Home;