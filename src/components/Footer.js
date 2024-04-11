import React from 'react';
import styled from 'styled-components';

const StyFooter = styled.footer`
    background-color: black;
    color: white;
    text-align: center;
    padding: 20px;
    position: absolute;
    left: -7.8px;
    bottom: -8px;
    width: 98.6%;
    min-width: 365px;

    @media (max-width: 480px) {
        width: 103%;
        left: -28px;
      }
`;

const Footer = () => {
  return (
    <StyFooter>
      &copy; {new Date().getFullYear()} Simmer
    </StyFooter>
  );
};

export default Footer;
