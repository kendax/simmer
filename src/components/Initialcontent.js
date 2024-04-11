import { useState } from 'react';
import axios from 'axios';

const Initialcontent = () => {
    const [recipesRandom, setRecipes] = useState([]);

    const randomRecipes = async () => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const number = 20;
            const response = await axios.get('https://api.spoonacular.com/recipes/random', {
                params: {
                    apiKey,
                    number,
                },
            });
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return { recipesRandom, randomRecipes };
};

export default Initialcontent;
