const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send('datos de producto')
})
router.post('/', function(req, res){
  res.send('Producto creado')
})
router.update('/', function(req, res){
  res.send('Producto actualizado')
})
router.delete('/', function(req, res){
  res.send('Producto eliminado')
})

module.exports = router;