const express = require('express');
const router = express.Router();
const userModule = require('../models/user')
const {isExists, login} = require('../middlewares/users')





router.get('/', function (req, res){
  res.send('datos de usuario')
})

router.post('/', function (req, res){
  res.send('Usuario creado')
})

router.post('/login', login, function (req, res){
  res.json(req.user);
  res.send('id de usuario:' + req.id);
})

router.post('/signup', isExists, function (req, res){
  let b = req.body;
  userModule.createUser(b.userName, b.password, b.paswword2, b.phone, b.name, b.surname, b.email, b.dni, b.address, b.country);
  res.send('Usuario creado');
})


router.delete('/', function (req, res){
  res.send('Usuario eliminado')
})

module.exports = router;