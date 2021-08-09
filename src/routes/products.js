const express = require('express')
const router = express.Router()
const productoModule = require ('../models/product')

router.get('/', function(req, res){
  res.send('datos de producto')
})
router.post('/', function(req, res){
  res.send('Producto creado')
})
router.delete('/', function(req, res){
  res.send('Producto eliminado')
})

module.exports = router;