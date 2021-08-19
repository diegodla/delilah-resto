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
 * /users/{id}/list:
 *  get:
 *    tags: [users]
 *    summary: Recupera la información de un usuario  según su ID
 *    description: Listado de todos lo susuarios.
 *    parameters:
 *       - in: query
 *         name: index
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
router.get('/:id/list', isLogged, isAdmin, function (req, res){
  res.json(userModule.listActiveUsers());
})


router.post('/', isExists, createUser, function (req, res){
  res.json({"Mensaje":"Usuario Creado"})
})

router.delete('/:id', deleteUser, function (req, res){
  res.json({"Mensaje":"Usuario Eliminado"})
})

router.post('/login', login, function (req, res){
  console.log("USUARIOS LOGUEADOS");
  console.log(userModule.logedUsers)
  res.json(req.user);
})
router.post('/logout', logout, function (req, res){
  console.log("USUARIOS LOGUEADOS");
  console.log(userModule.logedUsers)
  res.send('Logout exitoso')
})
router.put('/:id', isLogged, modifyUser, function (req, res){
  res.json(userModule.listActiveUsers());
})

router.put('/:idUser/order', modifyOrder, function(req, res){
  res.json({"Mensaje":"Orden Actual Modificada"})
})

module.exports = router;