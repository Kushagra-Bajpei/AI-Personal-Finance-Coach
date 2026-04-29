import express from 'express';
import { signup, signin, signout, upgrade, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/upgrade', verifyToken, upgrade);
router.get('/me', verifyToken, getMe);

export default router;
