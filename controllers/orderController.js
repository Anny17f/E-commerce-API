// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    const { items } = req.body;

    try {
        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            const totalCost = item.quantity * product.price;
            totalPrice += totalCost;

            orderItems.push({
                product: item.productId,
                quantity: item.quantity,
                totalCost: totalCost,
            });
        }

        const order = new Order({
            user: req.user.id,
            items: orderItems,
            totalPrice: totalPrice,
        });

        await order.save();
        res.status(201).json({ order });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
