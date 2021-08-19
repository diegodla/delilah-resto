const productModule = require ('../models/product');

function createProduct(req, res, next) {
    let createConfirm = productModule.createProduct(req.body.name, req.body.description, req.body.price);
    if (!createConfirm) {  
        res.status(404).send({ resultado: false, mensaje: `el producto no fue creado` });
    } else {
        next();
    }
}

function modifyProduct(req, res, next){
    let productId = req.params.id;
    let {name, description, price} = req.body;
    if (productModule.modifyProduct(productId, name, description, price))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar el producto` });
    }
}

function deleteProduct(req, res, next){
    if (productModule.deleteProduct(req.params.id))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo borrar el producto` });
    }
}

module.exports = {createProduct, modifyProduct, deleteProduct}