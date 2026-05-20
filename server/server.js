
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB =
  require('./config/mongooseConfig.js');

const orderRoutes =
  require("./routes/orderRoutes.js");

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// Routes
app.use(
  '/api/products',
  require('./routes/productRoutes')
);

app.use(
  '/uploads',
  express.static('uploads')
);

app.use(
  '/api/auth',
  require('./routes/authRoutes')
);

app.use(
  '/api/cart',
  require('./routes/cartRoutes')
);

app.use(
  '/api/orders',
  orderRoutes
);

app.listen(5000, () =>
  console.log("Server running on port 5000")
);