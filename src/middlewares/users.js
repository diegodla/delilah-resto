const userModule = require('../models/user')

function isExists(req, res, next) {
    let id = usuarioModule.getUserId(req.body.userName, req.body.email);
    console.log(req.body,index);
    if (id !== -1) {
        res.status(404).send({ resultado: false, mensaje: `Usuario ya registrado con ese email y/o username` });
    } else {
        next();
    }
}
function login(req, res, next) {
    let logedin = usuarioModule.login(req.body.userName, req.body.password);
    console.log(req.body,index);
    if (!logedin) {
        res.status(404).send({ resultado: false, mensaje: `el usuario o la contraseña son incorrectos` });
    } else {
        req.id;
        req.user = userModule.users[id];
        next();
    }
}

module.exports = {isExists, login}