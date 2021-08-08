const express = require('express');
const router = express.Router();

router.get('/', function (req, res)){
  res.send('datos de usuario')
}
router.post('/', function (req, res)){
  res.send('Usuario creado')
}
router.update('/', function (req, res)){
  res.send('Usuario actualizado')
}
router.delete('/', function (req, res)){
  res.send('Usuario eliminado')
}

module.exports = router;