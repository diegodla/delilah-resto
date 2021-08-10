const userModule = require('../models/user');

function isExists(req, res, next) {
    let id = userModule.getUserId(req.body.userName, req.body.email);
    if (id !== -1) {
        res.status(404).send({ resultado: false, mensaje: `Usuario ya registrado con ese email y/o username` });
    } else {
        next();
    }
}
function login(req, res, next) {
    let logedin = userModule.login(req.body.userName, req.body.password);
    if (logedin>-1) {
        userModule.logedUsers.push(logedin);
        req.user = userModule.users[userModule.getUserId(req.body.userName,req.body.userName)];
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `el usuario o la contraseña son incorrectos` });
        
    }
}
function logout(req, res, next) {
    let id = req.body.userId;
    loguedIndex=-1;
    userModule.logedUsers.forEach(function(userId, index){
        if (userId == id)
        {
            loguedIndex =index;
        }
    })
    
    if (loguedIndex > -1) {
        userModule.logedUsers.pop(loguedIndex);
        next();
    } else {
        res.status(404).send({ resultado: false, mensaje: `el usuario no se encontraba logueado` });
        
    }
}

function isloged(req, res, next){
    if (userModule.isloged(req.params.id))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `el usuariono no esta logueado` });
    }
}

function deleteUser(req, res, next){
    if (userModule.deleteUser(req.params.id))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `el usuario no existe, no se realizo la tarea de eliminar` });
    }
}

function modifyUser(req, res, next){
    let userId = req.params.id;
    let {password, password2, phone,name, surname, email, address,country} = req.body;
    if (userModule.modifyUser(userId, password,password2,phone,name,surname,email, address,country))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo modificar el usuario` });
    }
}

module.exports = {isExists, login, isloged, logout, deleteUser, modifyUser}