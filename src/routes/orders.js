const express = require('express')
const router = express.Router()
const orderModule = require ('../models/order')
const {createOrder,deleteOrder, changeState, modifyOrder,closeOrder} = require('../middlewares/orders')
const {isLogged, isAdmin} = require('../middlewares/users')
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
      res.json(userOrders);
  
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
    res.json({"Mensaje":"Nueva orden creada, estado actual: Pendiente"})
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
  
    res.json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Pendiente"})
  })
//#endregion

//#region PUT /users/closeorder/
/**
 * @swagger
 * /orders/closeorder/:
 *  put:
 *    tags: [Orders]
 *    summary: productos.
 *    description : Actualización de datos de la orden. Solo se pueden actualizar datos en una orden pendiente.
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
  
    res.json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Confirmada"})
  })
//#endregion

router.post('/', isLogged, createOrder, function(req, res){
    res.json({"Mensaje":"Orden Creada"})
})

router.delete('/:id', deleteOrder, function(req, res){
    res.json({"Mensaje":"Orden eliminada"})
})

router.put('/changeState/:ordernumber/', isLogged, isAdmin, changeState, function(req, res){
    res.json({"Mensaje":"Orden Modificada"})
})

module.exports = router;