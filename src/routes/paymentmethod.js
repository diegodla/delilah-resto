const express = require('express')
const router = express.Router()
const paymentMModule = require ('../models/paymentmethod')
const {isLogged, isAdmin} = require('../middlewares/users')
const {createPaymentM, modifyPaymentM, deletePaymentM} = require('../middlewares/paymetmethod')
router.use(express.json())



//#region GET/paymentmethods
/**
 * @swagger
 * /paymentmethods:
 *  get:
 *    tags: [Payment Methods]
 *    summary: Lista los metodos de pago
 *    description: Listado de metodos de pago
 *    tag: metodosdepago
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
router.get('/', isLogged, isAdmin, function(req, res){
  res.json(paymentMModule.listActivePaymentM())
})
//#endregion 

//#region POST/paymentmethods
/**
 * @swagger
 * /paymentmethods:
 *  post:
 *    tags: [Payment Methods]
 *    summary: Agregar metodo de pago.
 *    description : Se crea nuevo metodo de pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: paymentmethod
 *        description: nombre y codigo del metodo de pago
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - code
 *          properties:
 *            name:
 *              description: nombre del metodo de pago
 *              type: string
 *              example: Uala
 *            code:
 *              description: Codigo corto de referencia del metodo de pago
 *              type: string
 *              example: UL
 *    responses:
 *      200:
 *       description: Metodo de pago Agregado 
 *      404:
 *       description: el metodo de pago no fue creado
 */
router.post('/', isLogged, isAdmin, createPaymentM, function(req, res){
    res.json({"Mensaje":"metodo de pago creado"})
})
//#endregion

router.put('/:id',isLogged, isAdmin, modifyPaymentM, function(req, res){
    res.json({"Mensaje":"metodo de pago modificado"})
})

//#region DELETE/products/
/**
 * @swagger
 * /paymentmethods/{id}:
 *  delete:
 *    tags: [Payment Methods]
 *    summary: Eliminar un metodo de pago.
 *    description : Eliminar un metodo de pago - Solo un administrador puede eliminar un metodo de pago.
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
 *        description: Id del metodo de pago a eliminar.
 *        schema:
 *          type: integer
 *          example: 2
 *    responses:
 *      201:
 *       description: Metodo de pago eliminado
 *      401:
 *       description: Metodo de pago no eliminado
 *      
 */
router.delete('/:id/', deletePaymentM, function(req, res){
    res.json({"Mensaje":"Metodo de pago eliminado"})
})

module.exports = router;