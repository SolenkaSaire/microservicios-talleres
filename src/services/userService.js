const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register a new user
exports.createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    return await user.save();
};

// User login
exports.login = async (loginData) => {
    const user = await User.findOne({ email: loginData.email });
    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
        throw { statusCode: 401, message: "Invalid credentials" };
    }
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
};

// Password recovery
exports.recoverPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw { statusCode: 404, message: "User not found" };

    // Generate a recovery code
    const recoveryCode = crypto.randomBytes(20).toString("hex");

    // Store the recovery code in the user's document or send it back to the user
    // For simplicity, let's assume we are just sending it back in the response
    return recoveryCode;
};

// Get all users
exports.getAllUsers = async () => {
    return await User.find();
};

// Get user by ID
exports.getUserById = async (id) => {
    return await User.findById(id);
};

// Update user by ID
exports.updateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Delete user by ID
exports.deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

// Delete all users
exports.deleteAllUsers = async () => {
    return await User.deleteMany({});
};

// Partially update user by ID
exports.partialUpdateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, { $set: userData }, { new: true });
};
