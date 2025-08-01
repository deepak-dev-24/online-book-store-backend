const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoute');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const requireRoutes = require('./routes/wishlistRoutes');


const app = express();
connectDB();

app.use(express.json());

app.get('/',(req, res)=>{   
    res.send('now project is started ok ');
});
//routes
app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/users',userRoutes);
app.use('/api/books',reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/wishlist',requireRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listening on the PORT Number ${PORT}`);
});