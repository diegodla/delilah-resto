const express = require('express')
const router = express.Router()
const paymentMModule = require ('../models/paymentmethod')
const {createPaymentM, modifyPaymentM, deletePaymentM} = require('../middlewares/paymetmethod')
router.use(express.json())




/**
 * @swagger
 * /paymentmethods:
 *  get:
 *    tags: [metodosdepago]
 *    summary: paymentmethod
 *    description: Listado de metodos de pago
 *    tag: metodosdepago
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
router.get('/', function(req, res){
  res.json(paymentMModule.listActivePaymentM())
})

/**
 * @swagger
 * /paymentmethods:
 *  post:
 *    tags: [metodosdepago]
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
 *              example: Mercado Pago
 *            code:
 *              description: Codigo corto de referencia del metodo de pago
 *              type: string
 *              example: MP
 *    responses:
 *      200:
 *       description: Metodo de pago Agregado 
 *      404:
 *       description: el metodo de pago no fue creado
 */
router.post('/', createPaymentM, function(req, res){
    res.send('metodo de pago creado')
})

router.put('/:id', modifyPaymentM, function(req, res){
    res.send('metodo de pago modificado')
})

router.delete('/:id', deletePaymentM, function(req, res){
    res.send('Metodo de pago eliminado')
})

module.exports = router;