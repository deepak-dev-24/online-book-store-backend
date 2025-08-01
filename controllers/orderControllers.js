const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res)=>{
    try{
        const userId = req.user.id;

        const cart = await Cart.findOne({user: userId});
        if(!cart || cart.items.length === 0 ){
            return res.status(400).json({success: false, message: 'Cart is empty'});
        }

        const {shippingInfo, paymentMethod} = req.body;
        const order = new Order({
            user: userId,
            item: cart.items,
            shippingInfo,
            paymentMethod,
            totalPrice: cart.totalPrice,
        });
        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({
            success: true,
            message: "order placed successfully",
            order,
        });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    };
};

const getMyOrder = async (req, res)=>{
    try{
        const orders = await Order.find({ user: req.user.id }).populate('items.book', 'title price');
        res.status(200).json({ success: true, orders });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

module.exports = {createOrder, getMyOrder};