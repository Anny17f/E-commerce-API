// controllers/adminController.js
const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            user: req.user.id,
        });

        await product.save();
        res.status(201).json({ product });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const product = await Product.findOne({ _id: id, user: req.user.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();
        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ _id: id, user: req.user.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
