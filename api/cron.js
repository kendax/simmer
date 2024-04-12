// import fetch from 'node-fetch';
// import axios from 'axios';

// List of possible values for the environment variable
const possibleValues = [
    "e10b4b24c6384302b405b8570f07c521",
    "a392413922ad4c5681a81e310e45d412",
    "62c9dd9a45bc4a49a36e5dd65003f22d",
    "03a1f19600144f49bdc8d03b703398bb",
    "9c293f94f92e47c0afae9375b606b360",
    "01a9da36951643d291005bfbe79103d0",
    "8c3017993c27411995455d258120c763",
    "824b937868c4fb29dc5b6174992b946",
    "f824b937868c4fb29dc5b6174992b946",
    "e0616b5b0a5147b3ae5e4f9f785d98d6",
    "d1efdddda8b748a7a871c408062e8ab4",
    "28edf7f3ad23476792aa0248e28d1ccb",
    "1fe5cf3040ae4e5880b5f5d1d2c26954",
    "a7d4c9ed20284de4b259a3390337bb3e",
    "b777b93f634444a58ff5857d0c40ed94",
    "ee8985d7e9b14600814cd1cc710d4ec2",
    "3e753e555df742758a057e3ea358900a",
    "69ddcc92b20a4572aec107662dcdfb17",
    "1829eb5822e648e0a55aee2c8397d6ac",
    "dcdba70278754a0394507729276da0d8",
    "8422e74fc4fe4a2ba44c292123f60af9",
    "1afc8e08a0c74dbd83ed6cfba85015c7",
    "3087be10c39a406287daebc2e21b1323",
    "dfbf19435ba84e0aa74f1e147fb329a1",
    "fb40d2cc09304645b17ee8bb68661295",
    "16847873067648708f7e0b7314613cab",
    "3b3e3c39d27e48749cacc84b0e410536",
    "a228ebe298214551961ecfc67ea365fc",
    "f1f0bbefdd614d198fd8f0667edcada3",
    "651ce2a4e77a42179886c45f4e25aa53",
    "d577617411ca4877b5bdb684dd531d2d",
    "f2bd4201a02a4092aeb02982f83c5b87",
    "dcaf172fb7374df585aa9b644f131303",
    "0aeaded884ae4d98abc487437a01633c",
    "71cfaa02a37b4341b878dacdcbc17068",
    "615baaacfacb433ab53bf7c75be5a9f4",
    "97e70d6d76bc4bec8e66b05db88a3a2b",
    "efe2ebbe0d0048cf87a30569c102ba58",
    "66c3fb165cd34577bca4a3ff09b13a85",
    "e1651c61ca4c4b0f87ec06fe7b83804a",
    "e81162794c97443aa1c22d20f31f8789",
    "c48cb7f1f3114e649b95d797a41f0ff2",
    "c7d0a5f9fe124f5591c898f019a59eae",
    "2f7f440db5c244408d18b9c9db75d903",
    "25824d0c46e04dd4b2aaabcd168fbe5e",
    "13b86b5eac8346639bcdfdb998a1d922",
    "70fde81737124675a806b5ce8bf0b88b",
    "bc1e286cfdc140fe99231c3be2eb62c4"
];

// Keep track of used values over the past 24 hours
let usedValues = new Set();

export default async function handler(req, res) {
    try {
        // Logic to select a new value for the environment variable
        let newValue = generateNewValue();
        
        // Update the environment variable using Vercel API
        const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
        const projectId = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;
        const variableName = 'xpIunuM2zetuLKYg';

        const fetch = await import('node-fetch');

        // const response = await axios.patch(
        //     `https://api.vercel.com/v9/projects/${projectId}/env/${variableName}`,
        //     { value: newValue },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${vercelToken}`,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );

        // // Trigger a deployment using the Vercel API
        // const deployResponse = await axios.post(
        //     "https://api.vercel.com/v1/integrations/deploy/prj_n1HPreWkHvWRmTRWivnYc3cIkEmB/BpvAeTU5pS",
        //     {},
        //     {
        //         headers: {
        //             Authorization: `Bearer ${vercelToken}`,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );


        const response = await fetch.default(
            `https://api.vercel.com/v9/projects/${projectId}/env/${variableName}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: newValue })
            }
        );

        // Trigger a deployment using the Vercel API
        const deployResponse = await fetch.default(
            "https://api.vercel.com/v1/integrations/deploy/prj_n1HPreWkHvWRmTRWivnYc3cIkEmB/BpvAeTU5pS",
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            }
        );



        res.status(200).json({ message: 'Environment variable updated successfully' });
    } catch (error) {
        console.error('Error updating environment variable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

function generateNewValue() {
    // Get the current timestamp in milliseconds
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

// async function triggerDeployment(vercelToken, projectId) {
//     try {
//         // Trigger deployment using Vercel API
//         await axios.post(
//             `https://api.vercel.com/v12/now/deployments`,
//             { projectId },
//             {
//                 headers: {
//                     Authorization: `Bearer ${vercelToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         console.log('Deployment triggered successfully');
//     } catch (error) {
//         console.error('Error triggering deployment:', error.response.data);
//     }
// }
