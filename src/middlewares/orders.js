const orderModule = require ('../models/order');

function createOrder(req, res, next) {
    let createConfirm = false;
    
    if(orderModule.getOpenOrder(req.query.userid).length == 0)
    {
        createConfirm = orderModule.createOrder(req.query.userid, req.body.paymentCode, req.body.delivery, req.body.address);
    }
    if (createConfirm) {  
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `No se pudo crear la nueva orden, verifique que no tenga ordenes abiertas` });
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
    
    if (orderModule.modifyOrder(req.query.userid, req.body.paymentCode, req.body.delivery, req.body.address))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar la orden` });
    }
}
function closeOrder(req, res, next){
    
    if (orderModule.closeOrder(req.query.userid))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo cerrar la orden, debe tener una orden pendiente con productos seleccionados` });
    }
}

function changeState(req, res, next){
    
    if (orderModule.changeState(req.params.ordernumber, req.body.state))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar la orden` });
    }
}
module.exports = {createOrder, deleteOrder, modifyOrder,changeState,closeOrder}