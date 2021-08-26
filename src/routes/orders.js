const express = require('express')
const router = express.Router()
const orderModule = require ('../models/order')
const {createOrder,deleteOrder, changeState, modifyOrder,closeOrder} = require('../middlewares/orders')
const {isLogged, isAdmin, addProduct,  remProduct} = require('../middlewares/users')
router.use(express.json())

//#region GET/orders/
/**
 * @swagger
 * /orders/:
 *  get:
 *    tags: [Orders]
 *    summary: Recupera todos los pedidos realizados.
 *    description: Recupera todos los pedidos realizados por todos los usuarios. Se requiere permisos de amdinistrador.
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID del usuario que desea ver la lista.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: El usuario no esta logueado o no tiene permisos. 
*/
router.get('/',isLogged, isAdmin, function (req, res){
    let userOrders = orderModule.listActiveOrders();
    if(userOrders.length > 0)
    {
      res.status(200).json(userOrders);
  
    }
    else{
      res.json({"Mensaje":"No hay ordenes para mostrar"})
    }
    
  })
  //#endregion

//#region POST/order/
/**
 * @swagger
 * /orders/:
 *  post:
 *    tags: [Orders]
 *    summary: Cargar nueva orden.
 *    description : Crea una nueva orden en estado "Pendiente". Solo puede existir una orden pendiente.
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
 *            - paymentCode
 *            - delivery
 *            - address
 *          properties:
 *            paymentCode:
 *              description: codigo del tipo de pago a utilizarse en esta orden
 *              type: string
 *              example: EF
 *            delivery:
 *              description: Indica si la orden es para delivery o no. true para indicar que si, false para indicar que no.
 *              type: boolean
 *              example: true
 *            address:
 *              description: Direccion de envio. Si no se especifica ninguna direccion, se adjuntara la direccion registrada en los datos del usuario.
 *              type: string
 *              example: Avenida Siempre Viva 742
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *      
 */
 router.post('/', isLogged, createOrder, function(req, res){
    res.status(201).json({"Mensaje":"Nueva orden creada, estado actual: Pendiente"})
  })
  //#endregion

//#region PUT /order/
/**
 * @swagger
 * /orders/:
 *  put:
 *    tags: [Orders]
 *    summary: Ordenes.
 *    description : Actualización de datos de la orden. Solo se puede modificar datos en una orden pendiente.
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
 *        description: datos a modificar
 *        schema:
 *          type: object
 *          required:
 *            - paymentCode
 *            - delivery
 *            - address
 *          properties:
 *            paymentCode:
 *              description: Codigo del metodo de pago
 *              type: string
 *              example: TC
 *            delivery:
 *              description: indica si la orden es para delivery o no. Si es para delivery = true / Si no es para delivery = false 
 *              type: boolean
 *              example: true
 *            address:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Baker Street 221b
 *    responses:
 *      201:
 *       description: Producto actualizado
 *      401:
 *       description: Producto no actualizado
 *      
 */
 router.put('/', isLogged, modifyOrder, function(req, res){
  
    res.status(201).json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Pendiente"})
  })
//#endregion

//#region PUT /users/closeorder/
/**
 * @swagger
 * /orders/closeorder/:
 *  put:
 *    tags: [Orders]
 *    summary: productos.
 *    description : Confirmacion de la orden. El usuario cierra la orden que tenia en estado pendiente.
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
 *    responses:
 *      201:
 *       description: Orden Confirmada
 *      401:
 *       description: No se puede confirmar la orden, asegurese tener una orden abierta y contar con productos en la lista
 *      
 */
 router.put('/closeorder/', isLogged, closeOrder, function(req, res){
  
    res.status(201).json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Confirmada"})
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
 *            - amount
 *          properties:
 *            productid:
 *              description: id del producto
 *              type: integer
 *              example: 1
 *            amount:
 *              description: cantidad del producto a agregar
 *              type: integer
 *              example: 2
 *    responses:
 *      201:
 *       description: Producto Agragado
 *      401:
 *       description: Producto no Agregado
 *      
 */
 router.post('/product/', isLogged, addProduct, function(req, res){
  res.status(201).json({"Mensaje":"Productos añadidos"})
})
//#endregion 

//#region PUT/orders/{id}
/**
 * @swagger
 * /orders/changeState/{id}:
 *  put:
 *    tags: [Orders]
 *    summary: Actualiza el estado de una orden segun su id
 *    description : Actualiza el estado de una orden segun su Id. Solo el administrador puede realizar esta tarea. 0-Pendiente, 1-Confirmado, 2-En preparacion, 3-Enviado, 4-Entregado, 5-Cancelado.
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
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id de la orden a actualizar.
 *        schema:
 *          type: integer
 *          example: 2
 *      - in: body
 *        name: state
 *        description: nuevo estado de orden
 *        schema:
 *          type: object
 *          required:
 *            - state
 *          properties:
 *            state:
 *              description: estado de orden
 *              type: integer
 *              example: 3
 *    responses:
 *      200:
 *       description: estado de orden actualizado correctamente. 
 *      404:
 *       description: estado de orden no actualizado. 
 */
router.put('/changeState/:id/', isLogged, isAdmin, changeState, function(req, res){
    res.status(201).json({"Mensaje":"Orden Modificada"})
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
 *        description: datos del producto a quitar
 *        schema:
 *          type: object
 *          required:
 *            - productid
 *            - amount
 *          properties:
 *            productid:
 *              description: id del producto
 *              type: integer
 *              example: 1
 *            amount:
 *              description: cantidad del producto a quitar
 *              type: integer
 *              example: 1
 *    responses:
 *      200:
 *       description: Producto fue removido de la lista
 *      401:
 *       description: Producto no removido
 *      
 */
 router.delete('/product/', isLogged,  remProduct, function(req, res){
  res.status(200).json({"Mensaje":"Producto eliminado"})
})
//#endregion

//#region DELETE /orders/{id}
/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *    tags: [Orders]
 *    summary: Eliminar una orden según su ID
 *    description: Elimina una orden segun su Id. Solo el administrador puede realizar esta tarea.
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID del admin logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden a eliminar.
 *         schema:
 *           type: integer
 *           example: 2
 *    responses:
 *       200:
 *        description: orden eliminada correctamente.
 *       404:
 *        description: orden no eliminada.  
 */
router.delete('/:id', deleteOrder, function(req, res){
  res.status(200).json({"Mensaje":"Orden eliminada"})
})
//#endregion

module.exports = router;