const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // user info in req.user
        next();
    }
    catch(error){
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

const isAdmin = (req, res, next)=>{
    // req.user = {role: 'admin'};
    if(req.user && req.user.role === 'admin'){
        next();
    }
    else{
        res.status(403).json({ message: "Access denied: Admins only" });
    }
}

module.exports = {isAdmin, isAuthenticated};