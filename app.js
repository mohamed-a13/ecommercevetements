const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./DBname/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes,);


app.listen(PORT, () => console.log(`Server is running in the port ${PORT}`))