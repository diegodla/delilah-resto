const express = require('express');
const router = express.Router();
const userModule = require('../models/user')
const orderModule = require ('../models/order');
const {isExists, login, isLogged, logout, deleteUser,modifyUser, createUser, isAdmin, addProduct,  remProduct} = require('../middlewares/users')
const {modifyOrder,createOrder, closeOrder} = require('../middlewares/orders')
router.use(express.json())




//#region GET/users/
/**
 * @swagger
 * /users/:
 *  get:
 *    tags: [Users]
 *    summary: Listado de todos los usuarios
 *    description: Recupera el listado completo de usuarios activos.
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID del usuario que desea ver la lista. Debe ser administrador.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: El usuario no esta logueado o no tiene permiso.  
*/
router.get('/', isLogged, isAdmin, function (req, res){
  res.json(userModule.listActiveUsers());
})
//#endregion

//#region POST/users/signup
/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags: [Users]
 *    summary: usuarios.
 *    description : Registro de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - password
 *            - password2
 *            - phone
 *            - name
 *            - surname
 *            - email
 *            - dni
 *            - address
 *            - country
 *          properties:
 *            userName:
 *              description: Nombre de usuario a registrar
 *              type: string
 *              example: emilianoB
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: ntvg12
 *            password2:
 *              description: constraseña ingresada nuevamente
 *              type: password
 *              example: ntvg12
 *            phone:
 *              description: Numero de telefono
 *              type: string
 *              example: 15512345
 *            name:
 *              description: Nombre del usuario 
 *              type: string
 *              example: Emiliano
 *            surname:
 *              description: Nombre del usuario 
 *              type: string
 *              example: Brancciari
 *            email:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: emilianob@ntvg.com
 *            dni:
 *              description: Numero de Documento del usuario
 *              type: integer
 *              example: 335489765
 *            address:
 *              description: Direccion del usuario
 *              type: string
 *              example: 742 Evergreen Terrace
 *            country:
 *              description: Pais del usuario
 *              type: string
 *              example: Argentina
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *      
 */
router.post('/signup', isExists, createUser, function (req, res){
  res.json({"Mensaje":"Usuario Creado"})
})
//#endregion

//#region POST/users/login
/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: [Users]
 *    summary: Login de usuario.
 *    description : Login de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Email/Usuario y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            userName:
 *              description: Email/usuario del usuario a loguearse.
 *              type: email
 *              example: diegol
 *            password:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: diegopass
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      404:
 *       description: Usuario no encontrado (email/usuario y/o contraseña incorrecta)
 */
router.post('/login', login, function (req, res){
  console.log(`Usuarios Logueados actualmente: ${userModule.logedUsers}`)
  res.json({"Mensaje": `Usuario id: ${req.userid}, logueado satisfactoriamente`});
})
//#endregion

//#region POST/users/logout
/**
 * @swagger
 * /users/logout:
 *  post:
 *    tags: [Users]
 *    summary: Logout
 *    description: Desloguea el id indicado
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID de usuario 
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *        description: Logout Confirmado.
 *       404:
 *        description: No se pudo realizar el Logout.  
*/
router.post('/logout', logout, function (req, res){
  console.log(`Usuarios Logueados actualmente ${userModule.logedUsers}`)
  res.json({"Mensaje":"Logout realizado"})
})
//#endregion


router.post('/order/prodcut/', isLogged, addProduct, function(req, res){
  res.json({"Mensaje":"Producto añadido"})
})

router.delete('/order/prodcut/', isLogged,  remProduct, function(req, res){
  res.json({"Mensaje":"Producto eliminado"})
})

router.post('/order/', isLogged, createOrder, function(req, res){
  res.json({"Mensaje":"Nueva orden creada, estado actual: Pendiente"})
})

router.put('/order/', isLogged, modifyOrder, function(req, res){
  
  res.json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Pendiente"})
})

router.put('/closeorder/', isLogged, closeOrder, function(req, res){
  
  res.json({"Mensaje":"los datos de la orden se actualizaron, estado actual: Confirmada"})
})

router.put('/:id', isLogged, modifyUser, function (req, res){
  res.json(userModule.listActiveUsers());
})
router.delete('/:id', deleteUser, function (req, res){
  res.json({"Mensaje":"Usuario Eliminado"})
})

//#region /users/orders
/**
 * @swagger
 * /users/orders:
 *  get:
 *    tags: [Users]
 *    summary: Recupera pedidos por id usuario
 *    description: Recupera el historial de pedidos realizados por el usuario
 *    parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         description: ID del usuario que desea ver la lista.
 *         schema:
 *           type: integer
 *           example: 4
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: El usuario no esta logueado. 
*/
router.get('/orders/',isLogged, function (req, res){
  let userOrders = orderModule.listUserOrders(req.query.userid);
  if(userOrders.length > 0)
  {
    res.json(userOrders);

  }
  else{
    res.json({"Mensaje":"No hay ordenes para mostrar"})
  }
  
})
//#endregion

router.get('/allorders/',isLogged, isAdmin, function (req, res){
  let userOrders = orderModule.listActiveOrders();
  if(userOrders.length > 0)
  {
    res.json(userOrders);

  }
  else{
    res.json({"Mensaje":"No hay ordenes para mostrar"})
  }
  
})





module.exports = router;