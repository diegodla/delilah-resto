const express = require('express');
const router = express.Router();
const userModule = require('../models/user')
const orderModule = require ('../models/order');
//const {isExists, login, isLogged, logout, deleteUser,modifyUser, modifyUserA, createUser, isAdmin} = require('../middlewares/users')
const {checkFields, checkExists,createUser,autenticarUsuario} = require ('../middlewares/users')
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
//////////////////////////////
/*router.get('/', isLogged, isAdmin, function (req, res){
  res.status(200).json(userModule.listActiveUsers());
})*/
//#endregion

//#region POST/users/signup
/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags: [Users]
 *    summary: Registro de usuarios.
 *    description : Registro de usuarios - La persona debe completar los campos requeridos correctamente para lograr registar un nuevo usuario.
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
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      404:
 *       description: Usuario no registrado
 *      
 */
///////////////////////

router.post('/signup', checkFields, checkExists, createUser, function (req, res){
  res.status(201).json({"Mensaje":"Usuario Creado"})
  console.log("usuario creado")
})

/*VIEJO BORRAR AL FINALIZAR
router.post('/signup', isExists, createUser, function (req, res){
  res.status(201).json({"Mensaje":"Usuario Creado"})
})
*/

//#endregion

//#region POST/users/login
/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: [Users]
 *    summary: Login de usuario.
 *    description : Login de usuario - El usuario debe ingresar nombre de usuario o email registrado, acompañado de la contraseña para poder ingresar al sistema.
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
 *      401:
 *       description: Usuario no encontrado (email/usuario y/o contraseña incorrecta)
 */
///////////
router.post('/login', autenticarUsuario, (req, res)=>{
  console.log(`Usuarios Logueados actualmente: ${userModule.logedUsers}`)
  //res.status(200).json({"Mensaje": `Usuario id: ${req.userid}, logueado satisfactoriamente`});
})
/*
VIEJO BORRAR AL FINALIZAR
router.post('/login', login, function (req, res){
  console.log(`Usuarios Logueados actualmente: ${userModule.logedUsers}`)
  res.status(200).json({"Mensaje": `Usuario id: ${req.userid}, logueado satisfactoriamente`});
})*/
//#endregion

//#region POST/users/logout
/**
 * @swagger
 * /users/logout:
 *  post:
 *    tags: [Users]
 *    summary: Logout
 *    description: Desloguea el usuario
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
//////////////
/*router.post('/logout', logout, function (req, res){
  console.log(`Usuarios Logueados actualmente ${userModule.logedUsers}`)
  res.status(200).json({"Mensaje":"Logout realizado"})
})
*/
//#endregion

//#region PUT /users/
/**
 * @swagger
 * /users/:
 *  put:
 *    tags: [Users]
 *    summary: Modificar Usuario.
 *    description : Actualización de datos del usuario. Solo un usuario logueado puede modificar su informacion propia.
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
 *        name: usuario
 *        description: datos a modificar
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - password2
 *            - phone
 *            - name
 *            - surname
 *            - email
 *            - address
 *          properties:
 *            password:
 *              description: Contraseña del usuario
 *              type: string
 *              example: escaliburM
 *            password2:
 *              description: Contraseña redundante para comprobar que no hay error 
 *              type: string
 *              example: escaliburM
 *            phone:
 *              description: Telefono del usuario 
 *              type: string
 *              example: 7276262176
 *            name:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Alfredo
 *            surname:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Barria
 *            email:
 *              description: Email del usuario 
 *              type: email
 *              example: emiliano@ntvg.com
 *            address:
 *              description: Direccion del usuario 
 *              type: string
 *              example: Aeroposta Arg 561
 *    responses:
 *      202:
 *       description: Usuario actualizado
 *      401:
 *       description: Usuario no actualizado
 *      
 */
/*
/////////////////////
router.put('/', isLogged, modifyUser, function (req, res){
  res.status(200).json({"Mensaje":"Usuario Modificado"});
})
*/
//#endregion

//#region PUT /users/{id}
/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags: [Users]
 *    summary: Modificar Usuario.
 *    description : Actualización de datos del usuario. Solo un administrador puede modificar a cualquier usuario.
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
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id del usuario a actualizar.
 *        schema:
 *          type: integer
 *          example: 4
 *      - in: body
 *        name: usuario
 *        description: datos a modificar
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - password2
 *            - phone
 *            - name
 *            - surname
 *            - email
 *            - address
 *          properties:
 *            password:
 *              description: Contraseña del usuario
 *              type: string
 *              example: escaliburM
 *            password2:
 *              description: Contraseña redundante para comprobar que no hay error 
 *              type: string
 *              example: escaliburM
 *            phone:
 *              description: Telefono del usuario 
 *              type: string
 *              example: 7276262176
 *            name:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Diego
 *            surname:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Lecuna
 *            email:
 *              description: Email del usuario 
 *              type: email
 *              example: diego@ntvg.com
 *            address:
 *              description: Direccion del usuario 
 *              type: string
 *              example: Aeroposta Arg 561
 *    responses:
 *      200:
 *       description: Usuario actualizado
 *      401:
 *       description: Usuario no actualizado
 *      
 */
///////////////
/*router.put('/:id', isLogged, isAdmin, modifyUserA, function (req, res){
  res.status(200).json({"Mensaje":"Usuario Modificado"});
})*/
//#endregion

//#region DELETE /users/{id}
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags: [Users]
 *    summary: Eliminar un usuario  según su ID
 *    description: Elimina el usuario segun su Id. Solo el administrador puede realizar esta tarea.
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
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: 4
 *    responses:
 *       200:
 *        description: usuario  eliminado correctamente.
 *       404:
 *        description: usuario  no encontrado.  
 */
///////////////////
/*
router.delete('/:id', isLogged, isAdmin, deleteUser, function (req, res){
  res.status(200).json({"Mensaje":"Usuario Eliminado"})
})
*/
//#endregion

//#region GET/users/orders
/**
 * @swagger
 * /users/orders:
 *  get:
 *    tags: [Users]
 *    summary: Recupera pedidos por del usuario logueado
 *    description: Recupera el historial de pedidos realizados por el usuario logueado
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
///////////////////
/*router.get('/orders/',isLogged, function (req, res){
  let userOrders = orderModule.listUserOrders(req.query.userid);
  if(userOrders.length > 0)
  {
    res.status(200).json(userOrders);

  }
  else{
    res.status(404).json({"Mensaje":"No hay ordenes para mostrar"})
  }
  
})*/
//#endregion






module.exports = router;