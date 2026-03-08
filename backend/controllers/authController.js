const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

// REGISTER USER
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password, college, batch, gradYear, branch } = req.body;

        // check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student",
            college: college || "Default",
            batch,
            gradYear,
            branch
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            gradYear: user.gradYear,
            branch: user.branch,
            token: generateToken(user._id)
        });

    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            gradYear: user.gradYear,
            branch: user.branch,
            token: generateToken(user._id)
        });

    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error);
    }
};
