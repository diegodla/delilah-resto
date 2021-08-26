const express = require('express')
const router = express.Router()
const productModule = require ('../models/product')
const {createProduct, modifyProduct, deleteProduct} = require('../middlewares/products')
const {isLogged, isAdmin} = require('../middlewares/users')
router.use(express.json())

//#region GET/products/
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
  res.status(200).json(productModule.listActiveProducts())
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
 *      - in: query
 *        name: userid
 *        required: true
 *        description: id del administrador logueado.
 *        schema:
 *          type: integer
 *          example: 0 
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
  res.status(201).json({"Mensaje":"Producto Creado"})
})
//#endregion

//#region PUT/products/
/**
 * @swagger
 * /products/{id}:
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
 *        name: id
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
router.put('/:id/', isLogged, isAdmin, modifyProduct, function(req, res){
  res.status(201).json({"Mensaje":"Producto Modificado"})
})
//#endregion

//#region DELETE/products/
/**
 * @swagger
 * /products/{id}/:
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
 *        name: id
 *        required: true
 *        description: Id del producto a eliminar.
 *        schema:
 *          type: string
 *          example: 4
 *    responses:
 *      200:
 *       description: Producto eliminado
 *      401:
 *       description: Producto no eliminado
 *      
 */
router.delete('/:id/', isLogged,isAdmin, deleteProduct, function(req, res){
  res.status(200).json({"Mensaje":"Producto eliminado"})
})
//#endregion




module.exports = router;