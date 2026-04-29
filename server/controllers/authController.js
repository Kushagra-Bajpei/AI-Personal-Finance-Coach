import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middleware/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).json({ ...rest, token });
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const upgrade = async (req, res, next) => {
    try {
        const { planId } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return next(errorHandler(404, 'User not found'));

        // If user selects free plan, set isPremium to false
        user.isPremium = planId !== 'free';
        await user.save();

        const { password, ...rest } = user._doc;
        res.status(200).json({ 
            message: user.isPremium ? 'Upgrade successful' : 'Plan updated to Free', 
            user: rest 
        });
    } catch (error) {
        next(error);
    }
};
