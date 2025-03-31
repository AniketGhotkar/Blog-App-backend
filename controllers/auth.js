const bcrypt = require("bcrypt");
const User = require("../models/user");  // Corrected this line to refer to the `User` model
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Secure the password
        let hashedpassword;
        try {
            hashedpassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        // Create new user entry
        const newUser = await User.create({
            name, email, password: hashedpassword, role
        });

        res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.log(`Signup failed due to error: ${error}`);
        return res.status(400).json({
            success: false,
            message: "User signup failed, please try again"
        });
    }
}

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Check if user exists
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        const payload = {
            email: existingUser.email,
            id: existingUser._id,
            role: existingUser.role
        };

        // Verify password
        if (await bcrypt.compare(password, existingUser.password)) {
            // Create JWT token
            let token = jwt.sign(payload, process.env.jwt_token, {
                expiresIn: "2h",
            });

            existingUser = existingUser.toObject();
            existingUser.token = token;
            existingUser.password = undefined; // Don't send password in the response

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // Send cookie with JWT token
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                existingUser,
                message: "User logged in successfully"
            });

        } else {
            // Password mismatch
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.log(`Login failed due to error: ${error}`);
        return res.status(400).json({
            success: false,
            message: "Login failure"
        });
    }
}
