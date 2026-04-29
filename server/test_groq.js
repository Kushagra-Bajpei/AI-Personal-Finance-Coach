import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function testGroq() {
    try {
        console.log("Testing Groq API...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say hello!" }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 50,
        });
        console.log("Success! Response:", chatCompletion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Groq API Failed:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

testGroq();
