const mongoose = require('mongoose');
require('dotenv').config({path: './config/.env'});


mongoose.connect('mongodb+srv://sabbou13:' + process.env.DB_USER_PASS + '@cluster0.zj7pr.mongodb.net/ecommercevetements', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB ' + err));

module.exports = mongoose;