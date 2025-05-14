import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dark-color);
`;

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
    outline: none;
  }
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const UserInfoItem = styled.p`
  margin: 0.5rem 0;
  
  strong {
    font-weight: 600;
  }
`;

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the phone number and name from session storage
    const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
    const storedName = sessionStorage.getItem('name');
    
    if (!storedPhoneNumber || !storedName) {
      // If the data is not available, redirect to the register page
      navigate('/register');
      return;
    }
    
    setPhoneNumber(storedPhoneNumber);
    setName(storedName);
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Send the verification code to the backend to verify and register the number
      const response = await axios.post('/api/register-number', {
        phone_number: phoneNumber,
        name: name,
        verification_code: parseInt(verificationCode, 10)
      });
      
      setSuccess('Phone number verified and registered successfully!');
      
      // Clear the session storage
      sessionStorage.removeItem('phoneNumber');
      sessionStorage.removeItem('name');
      
      // Redirect to the home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'An error occurred');
      } else {
        setError('Failed to verify the code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // If no phone number or name is available, the useEffect will redirect
  if (!phoneNumber || !name) {
    return null;
  }
  
  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Verify Your Phone Number
      </PageTitle>
      
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InfoText>
          We've sent a verification code to your phone number. 
          Please enter the code below to complete your registration.
        </InfoText>
        
        <UserInfo>
          <UserInfoItem><strong>Phone Number:</strong> {phoneNumber}</UserInfoItem>
          <UserInfoItem><strong>Name:</strong> {name}</UserInfoItem>
        </UserInfo>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              type="text"
              id="verificationCode"
              placeholder="Enter the code you received"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Verifying...' : 'Verify and Register'}
          </Button>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Verify;