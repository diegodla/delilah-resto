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
 *          example: 0 
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

//#region POST/products/
/**
 * @swagger
 * /products/:
 *  post:
 *    tags: [Products]
 *    summary: Registro de productos.
 *    description : Registro de productos - Se deben completar los campos para registrar un producto. Solo un administrador puede registrar un nuevo producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: producto
 *        description: producto a registrar
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *            - price
 *          properties:
 *            name:
 *              description: Nombre del producto registrar
 *              type: string
 *              example: Ensalada mixta
 *            description:
 *              description: Descripcion del producto a registrar
 *              type: password
 *              example: Ensalada de lechuga y tomate
 *            price:
 *              description: Precio del producto
 *              type: float
 *              example: 50
 *    responses:
 *      201:
 *       description: Producto registrado
 *      401:
 *       description: Producto no registrado
 *      
 */
router.post('/', isLogged, isAdmin, createProduct, function(req, res){
  res.json({"Mensaje":"Producto Creado"})
})
//#endregion

//#region PUT/products/
/**
 * @swagger
 * /products/{productid}:
 *  put:
 *    tags: [Products]
 *    summary: Actualizacion de productos.
 *    description : Actualizacion de productos - Solo un administrador puede actualizar un nuevo producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userid
 *        required: true
 *        description: id del admin logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: productid
 *        required: true
 *        description: Id del producto a actualizar.
 *        schema:
 *          type: string
 *          example: 4
 *      - in: body
 *        name: producto
 *        description: producto a actualizar
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *            - price
 *          properties:
 *            name:
 *              description: Nombre del producto actualizar
 *              type: string
 *              example: Ensalada mixta
 *            description:
 *              description: Descripcion del producto a actualizar
 *              type: password
 *              example: Ensalada de lechuga y tomate
 *            price:
 *              description: Precio del producto
 *              type: float
 *              example: 50
 *    responses:
 *      201:
 *       description: Producto actualizado
 *      401:
 *       description: Producto no actualizado
 *      
 */
router.put('/:productid/', isLogged, isAdmin, modifyProduct, function(req, res){
  res.json({"Mensaje":"Producto Modificado"})
})
//#endregion

//#region DELETE/products/
/**
 * @swagger
 * /products/{productid}:
 *  delete:
 *    tags: [Products]
 *    summary: Eliminar un producto.
 *    description : Eliminar un producto - Solo un administrador puede actualizar un nuevo producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userid
 *        required: true
 *        description: id del admin logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: productid
 *        required: true
 *        description: Id del producto a eliminar.
 *        schema:
 *          type: string
 *          example: 4
 *    responses:
 *      201:
 *       description: Producto eliminado
 *      401:
 *       description: Producto no eliminado
 *      
 */
router.delete('/:productid/', isLogged,isAdmin, deleteProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})
//#endregion

module.exports = router;