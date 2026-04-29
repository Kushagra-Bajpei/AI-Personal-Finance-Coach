import Groq from 'groq-sdk';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GROQ_API_KEY) {
    console.error('CRITICAL: GROQ_API_KEY is missing from .env file!');
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || 'MISSING'
});

console.log('DEBUG: Groq AI Controller Initialized');

export const chatWithAI = async (req, res, next) => {
    try {
        console.log('DEBUG: chatWithAI called');
        const { messages } = req.body;
        const userId = req.user?.id; 
        
        console.log('DEBUG: userId from token:', userId);

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        // Map roles to standard AI roles (ai -> assistant)
        const formattedMessages = messages.map(m => ({
            role: m.role === 'ai' ? 'assistant' : m.role,
            content: m.content
        }));

        // 1. Fetch User and Check Limits
        let user;
        try {
            user = await User.findById(userId);
        } catch (dbErr) {
            console.error('DEBUG: Database error finding user:', dbErr.message);
            return res.status(500).json({ success: false, message: 'Database connection issue' });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Define Token Limit
        const currentTokens = user.tokensUsed || 0;
        const tokenLimit = user.tokenLimit || 100;

        if (!user.isPremium && currentTokens >= tokenLimit) {
            return res.status(403).json({ 
                success: false,
                message: "Free tier limit reached",
                reply: "🚨 You've reached your free tier limit (100 tokens). Please upgrade to Premium to continue using AI features.",
                upgradeRequired: true,
                tokensUsed: currentTokens,
                tokenLimit: tokenLimit
            });
        }

        // 2. Prepare System Message with Financial Context
        const { financeContext } = req.body;
        let contextString = "";
        if (financeContext) {
            const netSavings = financeContext.totalIncome - financeContext.totalExpenses;
            contextString = ` User's current Financial Status:
            - Total Income: ₹${financeContext.totalIncome}
            - Total Expenses: ₹${financeContext.totalExpenses}
            - Net Savings: ₹${netSavings}
            - Recent Activity: ${financeContext.recentTransactions}
            Please use this data to provide personalized, data-driven financial advice.`;
        }

        const systemMessage = {
            role: "system",
            content: `You are WealthWise, a professional and highly intelligent AI Financial Coach. 
            Your goal is to help users manage their money, save better, and understand their spending habits. 
            Use the provided financial data to give specific advice. If the user mentions a transaction, acknowledge it.
            Keep responses concise, friendly, and insightful. Always use ₹ for currency.
            ${contextString}`
        };

        const chatMessages = [systemMessage, ...formattedMessages];

        // 3. Call Groq AI
        console.log('DEBUG: Attempting Groq API call...');
        let chatCompletion;
        try {
            chatCompletion = await groq.chat.completions.create({
                messages: chatMessages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                max_tokens: 1024,
            });
        } catch (groqErr) {
            console.error('DEBUG: Groq SDK Error:', groqErr.message);
            return res.status(500).json({ error: `Groq AI Error: ${groqErr.message}` });
        }

        const reply = chatCompletion.choices[0]?.message?.content || "No response from AI.";
        const totalTokens = chatCompletion.usage?.total_tokens || 0;
        
        // 4. Update Usage
        user.tokensUsed = (user.tokensUsed || 0) + totalTokens;
        await user.save();

        res.status(200).json({ 
            success: true,
            reply,
            tokensUsed: user.tokensUsed,
            tokenLimit: user.tokenLimit,
            isPremium: user.isPremium,
            limitRemaining: user.isPremium ? 'Unlimited' : Math.max(0, user.tokenLimit - user.tokensUsed)
        });

    } catch (error) {
        console.error('DEBUG: chatWithAI General Error:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
