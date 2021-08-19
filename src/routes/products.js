const express = require('express')
const router = express.Router()
const productModule = require ('../models/product')
const {createProduct, modifyProduct, deleteProduct} = require('../middlewares/products')
router.use(express.json())

router.get('/', function(req, res){
  res.json(productModule.listActiveProducts())
})

router.post('/', createProduct, function(req, res){
  res.json({"Mensaje":"Producto Creado"})
})
router.put('/:id', modifyProduct, function(req, res){
  res.json({"Mensaje":"Producto Modificado"})
})
router.delete('/:id', deleteProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})

module.exports = router;