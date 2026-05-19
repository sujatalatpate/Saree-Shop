const Product = require('../Models/Product.js');

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// CREATE PRODUCT WITH IMAGE UPLOAD
exports.createProduct = async (req, res) => {

  try {

    // IMAGE URLS
    const imagePaths = req.files.map(
      file =>
        `http://localhost:5000/uploads/${file.filename}`
    );

    // CREATE PRODUCT
    const product = await Product.create({

      name: req.body.name,

      price: req.body.price,

      originalPrice: req.body.originalPrice,

      category: req.body.category,

      description: req.body.description,

      stock: req.body.stock,

      images: imagePaths,

      isTrending: req.body.isTrending,

      isNewArrival: req.body.isNewArrival,

      isFestive: req.body.isFestive

    });

    console.log("SAVED:", product);
    console.log(req.files);

    res.status(201).json(product);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    res.json(product);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// ADD REVIEW
exports.addReview = async (req, res) => {

  try {

    const {
      rating,
      comment
    } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }

    // CHECK ALREADY REVIEWED
    const alreadyReviewed =
      product.reviews.find(
        r =>
          r.user.toString() === req.user.id
      );

    if (alreadyReviewed) {

      return res.status(400).json({
        message: 'Product already reviewed'
      });

    }

    const review = {

      user: req.user.id,

      name: req.user.name,

      rating: Number(rating),

      comment

    };

    product.reviews.push(review);

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) => item.rating + acc,
        0
      ) / product.reviews.length;

    await product.save();

    res.json({
      message: 'Review Added'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};