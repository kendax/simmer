// components/RecipeList.js
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// Styled components for the RecipeList
const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RecipeItem = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const RecipeList = ({ recipes }) => {
  const router = useRouter();

  // Ensure recipes is an array before calling map
  if (!Array.isArray(recipes)) {
    console.error("Recipes is not an array:", recipes);
    return <div>No recipes found.</div>;
  }

  const handleClick = (id) => {
    router.push(`/dashboard/recipe?id=${id}`);
  };

  return (
    <RecipeContainer>
      {recipes.map(recipe => (
        <RecipeItem key={recipe.id} onClick={() => handleClick(recipe.id)}>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeImage src={recipe.image} alt={recipe.title} />
        </RecipeItem>
      ))}
    </RecipeContainer>
  );
};

export default RecipeList;
