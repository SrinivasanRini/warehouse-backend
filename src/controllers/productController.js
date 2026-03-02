const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, quantity } = req.body;

    const product = await Product.create({
      name,
      sku,
      quantity,
      createdBy: req.userId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD SUMMARY
exports.getDashboardSummary = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.userId });

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

    const lowStock = products.filter(
      (p) => p.quantity <= p.reorderLevel
    ).length;

    res.json({
      totalProducts,
      totalStock,
      lowStock,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};