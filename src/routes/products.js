const express = require('express')
const router = express.Router()
const productModule = require ('../models/product')
const {createProduct, modifyProduct, deleteProduct} = require('../middlewares/products')
const {isLogged, isAdmin} = require('../middlewares/users')
router.use(express.json())

//#region /products/
/**
 * @swagger
 * /products/:
 *  get:
 *    tags: [Products]
 *    summary: Lista de productos
 *    description: Recupera la lista de los productos cargados
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID del usuario que desea ver la lista. Debe estar Logueado en el
 *         schema:
 *           type: integer
 *           example: 4
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: El usuario no esta logueado o no tiene permiso.  
*/
router.get('/', isLogged, function(req, res){
  res.json(productModule.listActiveProducts())
})
//#endregion

router.post('/', isLogged,isAdmin, createProduct, function(req, res){
  res.json({"Mensaje":"Producto Creado"})
})
router.put('/:productid/', isLogged,isAdmin, modifyProduct, function(req, res){
  res.json({"Mensaje":"Producto Modificado"})
})
router.delete('/:productid/', isLogged,isAdmin, deleteProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})

module.exports = router;