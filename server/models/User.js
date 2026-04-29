import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    tokensUsed: {
        type: Number,
        default: 0,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    tokenLimit: {
        type: Number,
        default: 100,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
