const express = require('express')
const router = express.Router()
const productModule = require ('../models/product')
const {createProduct, modifyProduct, deleteProduct} = require('../middlewares/products')
const {isLogged, isAdmin, addProduct,  remProduct} = require('../middlewares/users')
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


//#region POST/orders/product/:
/**
 * @swagger
 * /orders/product/:
 *  post:
 *    tags: [Orders]
 *    summary: Agregar productos.
 *    description : Agregado de producto a la orden pendiente.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userid
 *        required: true
 *        description: id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 4 
 *      - in: body
 *        name: producto
 *        description: id del producto a agregar
 *        schema:
 *          type: object
 *          required:
 *            - productid
 *          properties:
 *            productid:
 *              description: Código del producto
 *              type: integer
 *              example: 0
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *      
 */
 router.post('/product/', isLogged, addProduct, function(req, res){
  res.json({"Mensaje":"Producto añadido"})
})
//#endregion 

//#region DELETE/orders/product/:
/**
 * @swagger
 * /orders/product/:
 *  delete:
 *    tags: [Orders]
 *    summary: Quitar Producto.
 *    description: Quitar producto de la orden pendiente
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userid
 *        required: true
 *        description: id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 4 
 *      - in: body
 *        name: producto
 *        description: indice del producto que se va a quitar de la orden
 *        schema:
 *          type: object
 *          required:
 *            - productid
 *          properties:
 *            prodindex:
 *              description: indice del producto a quitar de la orden
 *              type: integer
 *              example: 0
 *    responses:
 *      201:
 *       description: Producto quitado de la orden
 *      401:
 *       description: No se pudo quitar el producto de la orden
 *      
 */
router.delete('/product/', isLogged,  remProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})
//#endregion


router.post('/', isLogged, isAdmin, createProduct, function(req, res){
  res.json({"Mensaje":"Producto Creado"})
})
router.put('/:productid/', isLogged,isAdmin, modifyProduct, function(req, res){
  res.json({"Mensaje":"Producto Modificado"})
})
router.delete('/:productid/', isLogged,isAdmin, deleteProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})

module.exports = router;