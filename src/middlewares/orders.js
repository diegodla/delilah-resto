const orderModule = require ('../models/order');

function createOrder(req, res, next) {
    let createConfirm = orderModule.createOrder(req.body.userId, req.body.paymentCode, req.body.delivery, req.body.address);
    if (createConfirm) {  
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `el producto no fue creado` });
    }
}

function deleteOrder(req, res, next){
    if (orderModule.deleteOrder(req.params.id))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo borrar el producto` });
    }
}
function modifyOrder(req, res, next){
    if (orderModule.modifyOrder(req.params.idUser))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar la orden` });
    }
}
module.exports = {createOrder, deleteOrder, modifyOrder}