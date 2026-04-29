import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Rent', 'Shopping', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Investment', 'Other'],
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
