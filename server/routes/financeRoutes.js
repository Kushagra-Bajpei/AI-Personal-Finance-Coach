import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { addTransaction, getTransactions, getAnalysis, deleteTransaction, clearAllTransactions } from '../controllers/financeController.js';

const router = express.Router();

router.post('/add-transaction', verifyToken, addTransaction);
router.get('/transactions', verifyToken, getTransactions);
router.get('/analysis', verifyToken, getAnalysis);
router.delete('/delete-transaction/:id', verifyToken, deleteTransaction);
router.delete('/clear-all', verifyToken, clearAllTransactions);

export default router;
