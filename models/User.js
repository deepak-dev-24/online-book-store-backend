const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }
    ],
    timestamp:{
        type: String,
        default: (new Date()).getTime()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

module.exports =  mongoose.model("User", userSchema);