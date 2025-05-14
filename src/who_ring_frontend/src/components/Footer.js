import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--dark-color);
  color: white;
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.8rem;
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  max-width: 600px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <LogoIcon>📱</LogoIcon>
          Who Ring
        </FooterLogo>
        <FooterText>
          Register your phone number and let others know who's calling. 
          Our service helps you verify your identity and manage your phone number.
        </FooterText>
        <FooterLinks>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
        </FooterLinks>
        <Copyright>
          &copy; {currentYear} Who Ring. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;