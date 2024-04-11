import axios from 'axios';

const FoodInfo = async (id) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;
    }
};

export default FoodInfo;
