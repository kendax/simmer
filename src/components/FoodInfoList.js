import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
    margin: 20px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 15px;
    text-align: center;
`;

const FoodImage = styled.img`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
    cursor: none;
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const InfoItem = styled.p`
    font-size: 1.2rem;
`;

const Subtitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 10px;
`;

const IngredientList = styled.ul`
    list-style: none;
    padding: 0;
`;

const Ingredient = styled.li`
    font-size: 1.2rem;
`;

const Instruction = styled.div`
    margin-bottom: 20px;
`;

const InstructionTitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const StepList = styled.ol`
    list-style: decimal;
    padding: 0;
`;

const Step = styled.li`
    font-size: 1.2rem;
    margin-left: 20px;
`;

function FoodInfoList({ detailData }) {
    if (!detailData) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Title>{detailData.title}</Title>
            <FoodImage src={detailData.image} alt={detailData.title} />
            <Info>
                <InfoItem>Ready in: {detailData.readyInMinutes} minutes</InfoItem>
                <InfoItem>Servings: {detailData.servings}</InfoItem>
            </Info>
            <div>
                <Subtitle>Ingredients:</Subtitle>
                <IngredientList>
                    {detailData.extendedIngredients.map((ingredient, index) => (
                        <Ingredient key={index}>{ingredient.original}</Ingredient>
                    ))}
                </IngredientList>
            </div>
            <div>
                <Subtitle>Steps:</Subtitle>
                {detailData.analyzedInstructions.map((instruction, index) => (
                    <Instruction key={index}>
                        <InstructionTitle>{instruction.name}</InstructionTitle>
                        <StepList>
                            {instruction.steps.map((step, idx) => (
                                <Step key={idx}>{step.step}</Step>
                            ))}
                        </StepList>
                    </Instruction>
                ))}
            </div>
        </Container>
    );
}

export default FoodInfoList;
