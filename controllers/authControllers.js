const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { models } = require('mongoose');

const registerUser = async (req,res)=>{
    const {name, email, password} = req.body;
    try{
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({ message: "User already exists" });
        };
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user'
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
        },
        token,
    });
};

const loginUser = async (req, res)=>{
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //here we are generating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {registerUser,loginUser};