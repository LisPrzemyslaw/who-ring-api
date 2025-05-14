import React, { useState } from 'react';
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

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ResultCard = styled(motion.div)`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
  border-left: 4px solid var(--primary-color);
`;

const ResultTitle = styled.h3`
  color: var(--dark-color);
  margin-bottom: 1rem;
`;

const ResultItem = styled.p`
  margin: 0.5rem 0;
  
  strong {
    font-weight: 600;
  }
`;

const Lookup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setResult(null);
      
      // Look up the phone number in the database
      const response = await axios.get(`/api/get-number-name?phone_number=${encodeURIComponent(phoneNumber)}`);
      
      setResult(response.data);
      
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Phone number not found in our database.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.detail || 'An error occurred');
      } else {
        setError('Failed to look up the phone number. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Lookup a Phone Number
      </PageTitle>
      
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InfoText>
          Enter a phone number to see if it's registered in our database. 
          If it is, you'll see the name associated with it.
        </InfoText>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <small>Include country code (e.g., +1 for US)</small>
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Looking up...' : 'Lookup Number'}
          </Button>
        </Form>
        
        {result && (
          <ResultCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultTitle>Phone Number Found!</ResultTitle>
            <ResultItem><strong>Phone Number:</strong> {result.phone_number}</ResultItem>
            <ResultItem><strong>Name:</strong> {result.name}</ResultItem>
          </ResultCard>
        )}
      </Card>
    </PageContainer>
  );
};

export default Lookup;