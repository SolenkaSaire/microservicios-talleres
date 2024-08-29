const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (userData) => {
    const { username, email, password } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    return user.save();
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token };
};
