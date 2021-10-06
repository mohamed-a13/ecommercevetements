const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config({path: './config/.env'});
const cors = require('cors');
const morgan = require('morgan');
const {checkAdmin, requireAdmin} = require('./middelware/adminMiddelware');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const passwordRoutes = require("./routes/password");
const DBname = require('./DBname/db');


const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

//Jwt
app.get('/api/admin', checkAdmin);
app.get('/jwtid', requireAdmin, (req, rep) => {
  rep.status(200).send(rep.locals.admin._id)
})

//Routes  admin
app.use('/api/admin', adminRoutes);
//Routes Users
app.use('/api/auth', authRoutes);
//Routes productes
app.use('/api/product', productRoutes);
//Routes forgot password
app.use("/api/password-reset", passwordRoutes);



app.listen(process.env.PORT, () => console.log(`Server is running in the port ${process.env.PORT}`))