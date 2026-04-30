const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isAlreadyRegistered) {
            return res.status(400).json({ message: "Username or email already exists" })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, email, password: hash })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )

        res.cookie('token', token, {
            httpOnly: true,       
            sameSite: 'lax',   
            maxAge: 3 * 24 * 60 * 60 * 1000 
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: { 
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("Register error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        const user = await userModel.findOne({
            $or: [
                { email: email },      
                { username: email }
            ]
        }).select('+password')

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )

        res.cookie('token', token, {
            httpOnly: true,       // ✅ secure cookie
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("Login error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (err) {
        console.error("GetMe error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.token

        if (token) {
            await redis.set(token, Date.now().toString(), 'EX', 60 * 60 * 72)
        }

        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax'
        })

        return res.status(200).json({ message: "User logged out successfully" })
    } catch (err) {
        console.error("Logout error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}