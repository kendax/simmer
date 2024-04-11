import React, { useState } from 'react';
import styled from 'styled-components';

const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  width: 300px;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 0;
  margin: 20px 0 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // If validation passes, send data to API endpoint
    try {
      const response = await fetch('/api/signingup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        // Handle successful signup
        const data = await response.json();
        // Redirect the user to the specified URL
        window.location.href = data.redirectUrl;
      } else {
        // Handle error response
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SignupFormContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton type="submit">Sign Up</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormWrapper>
    </SignupFormContainer>
  );
};

export default SignupForm;