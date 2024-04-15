// List of possible values for the environment variable
const possibleValues = [
    process.env.NEXT_PUBLIC_KEY1,
    process.env.NEXT_PUBLIC_KEY2,
    process.env.NEXT_PUBLIC_KEY3,
    process.env.NEXT_PUBLIC_KEY4,
    process.env.NEXT_PUBLIC_KEY5,
    process.env.NEXT_PUBLIC_KEY6,
    process.env.NEXT_PUBLIC_KEY7,
    process.env.NEXT_PUBLIC_KEY8,
    process.env.NEXT_PUBLIC_KEY9,
    process.env.NEXT_PUBLIC_KEY10,
    process.env.NEXT_PUBLIC_KEY11,
    process.env.NEXT_PUBLIC_KEY12,
    process.env.NEXT_PUBLIC_KEY13,
    process.env.NEXT_PUBLIC_KEY14,
    process.env.NEXT_PUBLIC_KEY15,
    process.env.NEXT_PUBLIC_KEY16,
    process.env.NEXT_PUBLIC_KEY17,
    process.env.NEXT_PUBLIC_KEY18,
    process.env.NEXT_PUBLIC_KEY19,
    process.env.NEXT_PUBLIC_KEY20,
    process.env.NEXT_PUBLIC_KEY21,
    process.env.NEXT_PUBLIC_KEY22,
    process.env.NEXT_PUBLIC_KEY23,
    process.env.NEXT_PUBLIC_KEY24,
    process.env.NEXT_PUBLIC_KEY25,
    process.env.NEXT_PUBLIC_KEY26,
    process.env.NEXT_PUBLIC_KEY27,
    process.env.NEXT_PUBLIC_KEY28,
    process.env.NEXT_PUBLIC_KEY29,
    process.env.NEXT_PUBLIC_KEY30,
    process.env.NEXT_PUBLIC_KEY31,
    process.env.NEXT_PUBLIC_KEY32,
    process.env.NEXT_PUBLIC_KEY33,
    process.env.NEXT_PUBLIC_KEY34,
    process.env.NEXT_PUBLIC_KEY35,
    process.env.NEXT_PUBLIC_KEY36,
    process.env.NEXT_PUBLIC_KEY37,
    process.env.NEXT_PUBLIC_KEY38,
    process.env.NEXT_PUBLIC_KEY39,
    process.env.NEXT_PUBLIC_KEY40,
    process.env.NEXT_PUBLIC_KEY41,
    process.env.NEXT_PUBLIC_KEY42,
    process.env.NEXT_PUBLIC_KEY43,
    process.env.NEXT_PUBLIC_KEY44,
    process.env.NEXT_PUBLIC_KEY45,
    process.env.NEXT_PUBLIC_KEY46,
    process.env.NEXT_PUBLIC_KEY47,
    process.env.NEXT_PUBLIC_KEY48,
    process.env.NEXT_PUBLIC_KEY49,
    process.env.NEXT_PUBLIC_KEY50,
    process.env.NEXT_PUBLIC_KEY51,
    process.env.NEXT_PUBLIC_KEY52,
    process.env.NEXT_PUBLIC_KEY53,
    process.env.NEXT_PUBLIC_KEY54,
    process.env.NEXT_PUBLIC_KEY55,
    process.env.NEXT_PUBLIC_KEY56,
    process.env.NEXT_PUBLIC_KEY57,
    process.env.NEXT_PUBLIC_KEY58,
    process.env.NEXT_PUBLIC_KEY59,
    process.env.NEXT_PUBLIC_KEY60,
    process.env.NEXT_PUBLIC_KEY61,
    process.env.NEXT_PUBLIC_KEY62,
    process.env.NEXT_PUBLIC_KEY63,
    process.env.NEXT_PUBLIC_KEY64,
    process.env.NEXT_PUBLIC_KEY65,
    process.env.NEXT_PUBLIC_KEY66,
    process.env.NEXT_PUBLIC_KEY67,
    process.env.NEXT_PUBLIC_KEY68,
    process.env.NEXT_PUBLIC_KEY69,
    process.env.NEXT_PUBLIC_KEY70,
    process.env.NEXT_PUBLIC_KEY71,
    process.env.NEXT_PUBLIC_KEY72,
    process.env.NEXT_PUBLIC_KEY73,
    process.env.NEXT_PUBLIC_KEY74,
    process.env.NEXT_PUBLIC_KEY75,
    process.env.NEXT_PUBLIC_KEY76,
    process.env.NEXT_PUBLIC_KEY77,
    process.env.NEXT_PUBLIC_KEY78,
    process.env.NEXT_PUBLIC_KEY79,
    process.env.NEXT_PUBLIC_KEY80,
    process.env.NEXT_PUBLIC_KEY81,
    process.env.NEXT_PUBLIC_KEY82,
    process.env.NEXT_PUBLIC_KEY83,
    process.env.NEXT_PUBLIC_KEY84,
    process.env.NEXT_PUBLIC_KEY85,
    process.env.NEXT_PUBLIC_KEY86,
    process.env.NEXT_PUBLIC_KEY87,
    process.env.NEXT_PUBLIC_KEY88,
    process.env.NEXT_PUBLIC_KEY89,
    process.env.NEXT_PUBLIC_KEY90,
    process.env.NEXT_PUBLIC_KEY91,
    process.env.NEXT_PUBLIC_KEY92,
    process.env.NEXT_PUBLIC_KEY93,
    process.env.NEXT_PUBLIC_KEY94,
    process.env.NEXT_PUBLIC_KEY95,
    process.env.NEXT_PUBLIC_KEY96
];

// Keep track of used values over the past 24 hours
let usedValues = new Set();

export default async function handler(req, res) {
    try {
        // getting a new value for the environment variable
        let newValue = generateNewValue();
        
        // Updating the environment variable using vercel API
        const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
        const projectId = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;
        const envVariableId = process.env.NEXT_PUBLIC_API_KEY_ID;

        const fetch = await import('node-fetch');

        const response = await fetch.default(
            `https://api.vercel.com/v9/projects/${projectId}/env/${envVariableId}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: newValue })
            }
        );

        res.status(200).json({ message: 'Environment variable updated successfully' });
    } catch (error) {
        console.error('Error updating environment variable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

function generateNewValue() {
    // current timestamp
    const currentTime = Date.now();
    
    // Remove values from the used set if they are older than 24 hours
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000);
    usedValues.forEach((timestamp, value) => {
        if (timestamp < twentyFourHoursAgo) {
            usedValues.delete(value);
        }
    });
    
    // Filter out the used values from the possible values
    const availableValues = possibleValues.filter(value => !usedValues.has(value));
    
    // Select a random value from the available values
    const newValue = availableValues[Math.floor(Math.random() * availableValues.length)];
    
    // Add the new value to the used set with the current timestamp
    usedValues.add(newValue, currentTime);
    
    return newValue;
}