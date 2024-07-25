
const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
  const { search, page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
      const query = search ? { name: { $regex: search, $options: 'i' } } : {};

      const products = await Product.find(query)
          .skip(skip)
          .limit(limit);

      const total = await Product.countDocuments(query);

      res.status(200).send({
          products,
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.status(201).send({msg:"product created",product});
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(201).send({msg:"product updated",product});
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send({msg:"product deleted"});
};
