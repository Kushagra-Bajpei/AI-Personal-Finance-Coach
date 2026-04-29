import Transaction from '../models/Transaction.js';
import { errorHandler } from '../middleware/error.js';

export const addTransaction = async (req, res, next) => {
    const { amount, category, type, description, date } = req.body;
    const userId = req.user.id;

    if (!amount || !category || !type) {
        return next(errorHandler(400, 'Amount, category, and type are required'));
    }

    try {
        const newTransaction = new Transaction({
            userId,
            amount,
            category,
            type,
            description,
            date
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
};

export const getAnalysis = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId });

        let totalIncome = 0;
        let totalExpense = 0;
        let categoryWise = {};

        transactions.forEach(t => {
            const amount = Number(t.amount);
            const type = t.type.toLowerCase().trim();

            if (type === 'income') {
                totalIncome += amount;
            } else if (type === 'expense') {
                totalExpense += amount;
                categoryWise[t.category] = (categoryWise[t.category] || 0) + amount;
            }
        });

        const totalBalance = totalIncome - totalExpense;

        res.status(200).json({
            totalBalance,
            totalIncome,
            totalExpense,
            categoryWise
        });
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!transaction) {
            return next(errorHandler(404, 'Transaction not found'));
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const clearAllTransactions = async (req, res, next) => {
    try {
        await Transaction.deleteMany({ userId: req.user.id });
        res.status(200).json({ message: 'All transactions cleared successfully' });
    } catch (error) {
        next(error);
    }
};
