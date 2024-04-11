// pages/infoPage.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FoodInfo from '../components/FoodInfo';
import FoodInfoList from '../components/FoodInfoList';
import { useRouter } from 'next/router';
import withSession from '../middleware/_middleware';

const Recipe = ({ user }) => {
    const router = useRouter();
    const [scrolling, setScrolling] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        if (user) {
          router.push('/dashboard');
        }
      }, [user]);

    useEffect(() => {
        if (router.query.id) {
            const id = router.query.id; // Extracting ID from query parameter
            FoodInfo(id).then((data) => {
                setDetailData(data);
            });
        }
    }, [router.query.id]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={styles.body}>
            <Head>
                <link rel='icon' href='/skillet_FILL0_wght400_GRAD0_opsz24.png' />
                <title>Simmer</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
            <Header scrolling={scrolling}>
                <SearchBar/>
            </Header>
            <main style={styles.content}>
                <FoodInfoList detailData={detailData} />
            </main>
            <Footer />
        </div>
    );
};

const styles = {
    body: {
        position: 'relative',
        minHeight: '100vh',
        margin: '0',
        maxWidth: '100vw',
        fontFamily: 'Roboto, sans-serif',
    },
    content: {
        width: '98.6%', // Ensures the content fits the width of the device
        paddingTop: '60px',
        paddingBottom: '60px',
    },
};

export const getServerSideProps = withSession(async ({ req, res }) => {
    const user = req.session.get('user');
  
    return {
      props: {
        user: user || null,
      },
    };
  });


export default Recipe;

