const express = require('express');
const router = express.Router();
const userModule = require('../models/user')
const {isExists, login, isloged, logout, deleteUser,modifyUser} = require('../middlewares/users')

router.use(express.json())





router.get('/', function (req, res){
  res.json(userModule.listActiveUsers());
})

router.post('/', isExists, function (req, res){
  let b = req.body;
  userModule.createUser(b.userName, b.password, b.password2, b.phone, b.name, b.surname, b.email, b.dni, b.address, b.country);
  res.send('Usuario creado');
})

router.delete('/:id', deleteUser, function (req, res){
  res.send('Usuario eliminado')
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
router.put('/:id', modifyUser, function (req, res){
  res.json(userModule.listActiveUsers());
})




module.exports = router;