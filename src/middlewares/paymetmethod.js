const paymentMModule = require ('../models/paymentmethod');

function createPaymentM(req, res, next) {
    let createConfirm = paymentMModule.createPaymentM(req.body.name, req.body.code);
    if (createConfirm) {  
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `el metodo de pago no fue creado` });
    }
}

function modifyPaymentM(req, res, next){
    let paymentMId = req.params.id;
    let {name, code} = req.body;
    if (paymentMModule.modifyPaymentM(paymentMId, name, code))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar el metodo de pago` });
    }
}

function deletePaymentM(req, res, next){
    console.log("Llegamos?")
    if (paymentMModule.deletePaymentM(req.params.id))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo borrar el metodo de pago` });
    }

}

module.exports = {createPaymentM, modifyPaymentM, deletePaymentM}