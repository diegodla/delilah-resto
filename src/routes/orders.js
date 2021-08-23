const express = require('express')
const router = express.Router()
const orderModule = require ('../models/order')
const {createOrder,deleteOrder, changeState} = require('../middlewares/orders')
const {isLogged, isAdmin} = require('../middlewares/users')
router.use(express.json())

/* BORRRRAAAAAAAAAAAARRR BORRAR */
router.get('/', function(req, res){
    res.json(orderModule.listActiveOrders())
})

router.post('/', isLogged, createOrder, function(req, res){
    res.json({"Mensaje":"Orden Creada"})
})
router.delete('/:id', deleteOrder, function(req, res){
    res.json({"Mensaje":"Orden eliminada"})
})

router.put('/changeState/:ordernumber/', isLogged, isAdmin, changeState, function(req, res){
    res.json({"Mensaje":"Orden Modificada"})
})

module.exports = router;