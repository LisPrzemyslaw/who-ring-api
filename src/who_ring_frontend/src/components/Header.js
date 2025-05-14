import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: none;
  }
`;

const LogoIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.8rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: var(--dark-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  &.active {
    color: var(--primary-color);
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
`;

const Header = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <LogoIcon>📱</LogoIcon>
          Who Ring
        </Logo>
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/register" className={location.pathname === '/register' ? 'active' : ''}>
            Register
          </NavLink>
          <NavLink to="/verify" className={location.pathname === '/verify' ? 'active' : ''}>
            Verify
          </NavLink>
          <NavLink to="/lookup" className={location.pathname === '/lookup' ? 'active' : ''}>
            Lookup
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;