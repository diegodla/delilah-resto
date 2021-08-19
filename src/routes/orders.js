const express = require('express')
const router = express.Router()
const orderModule = require ('../models/order')
const {createOrder,deleteOrder} = require('../middlewares/orders')
router.use(express.json())

router.get('/', function(req, res){
    res.json(orderModule.listActiveOrders())
})

router.post('/', createOrder, function(req, res){
    res.json({"Mensaje":"Orden Creada"})
})
router.delete('/:id', deleteOrder, function(req, res){
    res.json({"Mensaje":"Orden eliminada"})
})

module.exports = router;