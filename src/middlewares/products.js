const productModule = require ('../models/product');

function createProduct(req, res, next) {
    let createConfirm = productModule.createProduct(req.body.name, req.body.description, req.body.price);
    if (createConfirm) {  
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `el producto no fue creado` });
    }
}

module.exports = {createProduct}