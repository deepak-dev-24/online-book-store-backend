const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUserProfile = (req, res)=>{
    res.status(200).json(req.user);
};

const updateUserProfile = async (req, res)=>{
    try{
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (req.body.name){
            user.name = req.body.name;
        } 

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });

    }
    catch(err){
        console.error(" Server Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserProfile, updateUserProfile };