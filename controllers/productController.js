const ProductModel = require("../models/Product");
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");


//Creation produit
module.exports.createProduct = async (req, rep) => {
  const {name, description, price, category, quantity, sold} = req.body

  try {
    const product = await ProductModel.create({name, description, price, category, quantity, sold});
    rep.status(201).json({product: product._id})
  }
  catch(err) {
    console.log("error creation produit: " + err)
  }
}

//Info produit
module.exports.productInfo = (req, rep) => {
  if(!ObjectID.isValid(req.params.id)) {
    return rep.status(400).send('ID unknown: ' + req.params.id)
  }
  ProductModel.findById(req.params.id, (err, docs) => {
    if(!err) rep.send(docs);
    else console.log('ID unknown: ' + err)
  })
}

//Modification produit
module.exports.updateProduct = async (req, rep) => {
  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

  try {
    await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name, 
          description: req.body.description,
          price: req.body.price, 
          category: req.body.category, 
          quantity: req.body.quantity, 
          sold: req.body.sold
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return rep.send(docs);
        if (err) return rep.status(500).send({ message: err });
      }
    );
  } catch (err) {
    console.log('Resutat: ' + err)
    return rep.status(500).json({ message: err });
  }
};

//Suppresion produit
module.exports.deleteProduct = async (req, rep) => {
  if (!ObjectID.isValid(req.params.id))
    return rep.status(400).send("ID unknown : " + req.params.id);

    try {
      await ProductModel.remove({ _id: req.params.id }).exec();
      rep.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return rep.status(500).json({ message: err });
    }
}