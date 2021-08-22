const express = require('express');
const router = express.Router();
const userModule = require('../models/user')
const {isExists, login, isLogged, logout, deleteUser,modifyUser, createUser, isAdmin} = require('../middlewares/users')
const {modifyOrder} = require('../middlewares/orders')
router.use(express.json())



router.get('/', function (req, res){
  res.json(userModule.listActiveUsers());
})

/**
 * @swagger
 * /users/list:
 *  get:
 *    tags: [users]
 *    summary: Recupera la información de un usuario  según su ID
 *    description: Listado de todos lo susuarios.
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
router.get('/list', isLogged, isAdmin, function (req, res){
  res.json(userModule.listActiveUsers());
})


/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags: [users]
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

router.delete('/:id', deleteUser, function (req, res){
  res.json({"Mensaje":"Usuario Eliminado"})
})

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: [users]
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
  console.log("USUARIOS LOGUEADOS");
  console.log(userModule.logedUsers)
  res.json({"Mensaje": `Usuario id: ${req.userid}, logueado satisfactoriamente`});
})


/**
 * @swagger
 * /users/logout:
 *  post:
 *    tags: [users]
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
  //borrar Console Log
  console.log("USUARIOS LOGUEADOS");
  console.log(userModule.logedUsers)
  //Borrar Console Log
  res.json({"Mensaje":"Logout realizado"})
})

router.put('/:id', isLogged, modifyUser, function (req, res){
  res.json(userModule.listActiveUsers());
})

router.put('/:idUser/order', modifyOrder, function(req, res){
  res.json({"Mensaje":"Orden Actual Modificada"})
})

module.exports = router;