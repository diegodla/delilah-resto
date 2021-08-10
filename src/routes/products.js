const express = require('express')
const router = express.Router()
const productModule = require ('../models/product')
const {createProduct} = require('../middlewares/products')
router.use(express.json())

router.get('/', function(req, res){
  res.json(productModule.products)
})

router.post('/', createProduct, function(req, res){
  res.send('Producto creado')
})
router.delete('/', function(req, res){
  res.send('Producto eliminado')
})

module.exports = router;