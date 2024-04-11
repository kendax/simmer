// pages/signup.js
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import BrandIcon from '../assets/icons/skillet_FILL0_wght400_GRAD0_opsz40.svg';
import Link from 'next/link';
import SignupForm from '../components/SignupForm';

const StyHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 97.6%;
    color: black; /* White text */
    position: fixed; /* Fixed position */
    top: 0; /* Stick to the top */
    width: 98.6%;
    height: 35px;
    margin-left: -8px;
    transition: background-color 0.4s ease; /* Smooth transition */
    background-color: ${props => (props.scrolling ? 'rgba(230, 230, 230, 0.9)' : 'rgb(251, 251, 251)')}; /* Conditional translucent background color */
    z-index: 9999; /* Ensure header is on top */

    @media (max-width: 480px) {
        max-width: 97.6%;
        margin-left: -8px;
    }
`;

const H1 = styled.h1`
    margin: 0;
    text-align: center;
    flex-grow: 1;
    margin-right: 20px;
    display: flex; /* Change display to flex */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */

    

    @media (max-width: 480px) {
        display: flex; /* Change display to flex */
        align-items: center; /* Center items vertically */
        margin-right: 15px;
    }
`;

const SignupPage = () => {
    return (
        <div style={styles.body}>
            <Head>
                <link rel='icon' href='/skillet_FILL0_wght400_GRAD0_opsz24.png' />
                <title>Simmer</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
            <StyHeader>
                <H1>
                    <Link href="/" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BrandIcon/>
                        Simmer
                    </Link>
                </H1>
            </StyHeader>
            <main>
                <SignupForm />
            </main>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: 'Roboto, sans-serif',
    },
    content: {
        width: '100%', // Ensures the content fits the width of the device
    },
};

export default SignupPage;
