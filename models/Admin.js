const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },
  },{ timestamps: null }
);


// play function before save into display: 'block',
AdminSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


//Connexion
AdminSchema.statics.login = async function(email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const authAdmin = await bcrypt.compare(password, admin.password);
    if (authAdmin) {
      return admin;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;


