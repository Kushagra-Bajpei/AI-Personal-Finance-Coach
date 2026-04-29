import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function testGroq() {
    try {
        const models = await groq.models.list();
        console.log("Available Models:", models.data.map(m => m.id).join(', '));
    } catch (error) {
        console.error("Groq API Failed:", error.message);
    }
}

testGroq();
