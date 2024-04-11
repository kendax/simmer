// pages/dashboard/bookmarks.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/dashComponents/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/dashComponents/SearchBar';
import RecipeList from '../../components/dashComponents/RecipeList';
import withSession from '../../middleware/_middleware';
import { useRouter } from 'next/router';
import { pool } from '../../db';


function Bookmarks({ user, recipeIds }) {
    const router = useRouter();

    const showSaveButton = false;
    const showBookmarksButton = false;

    const [scrolling, setScrolling] = useState(false);
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        if (!user) {
          router.push('../login');
        }
      }, [user]);

    useEffect(() => {
        const fetchRecipeOperations = async () => {
            try {
                const requests = recipeIds.map((id) => {
                    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
                    return axios.get(url);
                });

                const responses = await Promise.all(requests);
                const fetchedRecipes = responses.map((response) => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
                setRecipes(fetchedRecipes.filter(recipe => recipe !== null));
            } catch (error) {
                console.error("Error fetching bookmarked recipe details:", error);
            }
        };

        fetchRecipeOperations();
    }, []);

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
                <Header scrolling={scrolling} showSaveButton={showSaveButton} showBookmarksButton={showBookmarksButton}>
                    <SearchBar/>
                </Header>
                <main style={styles.content}>
                    <RecipeList recipes={recipes} />
                </main>
                <Footer />
            </div>
    );
}

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
    const email = user ? user.email : null; 
    const client = await pool.connect();
    const query = 'SELECT recipe_id FROM tbl_bookmarks WHERE user_email = $1';
    const result = await client.query(query, [email]);
    const recipeIds = result.rows.map(row => row.recipe_id);
    client.release(); // Release the client back to the pool

    return {
      props: {
        user: user || null,
        recipeIds: recipeIds
      }
    };
  });

export default Bookmarks;
