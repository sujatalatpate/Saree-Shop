const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      isAdmin: false
    });
    console.log(user);

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

// Login
exports.login = async (req, res) => {
  try{
  const { email, password } = req.body;

  console.log("Login Email:", email);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("User Found:", user);

 if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
    }
  });
}
catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.getWishlist = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.userId
    ).populate('wishlist');

    res.json(user.wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};exports.toggleWishlist = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user.wishlist) {
      user.wishlist = [];
    }

    const exists = user.wishlist.some(
      id => id.toString() === productId
    );

    if (exists) {

      user.wishlist = user.wishlist.filter(
        id => id.toString() !== productId
      );

    } else {

      user.wishlist.push(productId);

    }

    await user.save();

    const updatedUser = await User.findById(userId)
      .populate('wishlist');

    res.json(updatedUser.wishlist);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }


};