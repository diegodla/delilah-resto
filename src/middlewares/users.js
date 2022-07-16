//const userModule = require('../models/user');

const userModule = require('../controllers/user');
const orderModule = require('../models/order');
const {signup, isExists, fullFields,login} = require ('../controllers/user')

function checkFields(req, res, next) {
    let b = req.body;
    let controls = fullFields(b.userName, b.password, b.password2, b.phone, b.name, b.surname, b.email, b.dni, b.address, b.country); //aca esta lo que esta imprimiendo
    if (!controls.fullFields) {
        res.status(401).send({ resultado: false, mensaje: `Todos los campos son obligatorios` });
    } 
    else if (!controls.passCompare){
        res.status(401).send({ resultado: false, mensaje: `las contraseñas deben coincidir` });
    }
    else{
        next();
    }
}
async function checkExists(req, res, next) {
    let controls = await isExists(req.body.userName, req.body.email);
    if (controls.userExist) {
        res.status(401).send({ resultado: false, mensaje: `Nombre de usuario ya registrado` });
    } 
    else if (controls.emailExist){
        res.status(401).send({ resultado: false, mensaje: `Correo electronico ya registrado` });
    }
    else{
        next();
    }
}
async function createUser(req, res, next){
    let b = req.body;
    //ESTE CREATEUSER AHORA ES CONTROLLER.USER.SIGNUP
    let controls = await signup(b.userName, b.password, b.phone, b.name, b.surname, b.email, b.dni, b.address, b.country);
    if(controls.created){
        next();
    }
    else{
        res.status(401).send({ resultado: false, mensaje: `No se pudo crear el usuario` });
    }
}


async function autenticarUsuario(req, res, next) {
    await login(req.body.userName, req.body.password, res);
    next();
}

module.exports = {createUser,checkExists,checkFields,autenticarUsuario}

/*
function isExists(req, res, next) {
    let id = userModule.getUserId(req.body.userName, req.body.email);
    if (id !== -1) {
        res.status(401).send({ resultado: false, mensaje: `Usuario ya registrado con ese email y/o username` });
    } else {
        next();
    }
}
function login(req, res, next) {
    let logedin = userModule.login(req.body.userName, req.body.password);
    if (logedin>-1 && (userModule.logedUsers.filter(userid => userid == logedin).length==0)) {
        userModule.logedUsers.push(logedin);
        req.userid = logedin
        next();
    } 
    else if (logedin>-1 && (userModule.logedUsers.filter(userid => userid == logedin).length>0))
    {
        res.status(200).send({ resultado: true, mensaje: `el usuario id: ${logedin} ya se encuentra logueado` });
    }
    else {
        res.status(401).send({ resultado: false, mensaje: `el usuario o la contraseña son incorrectos` });  
    }
}

function logout(req, res, next) {
    let id = req.query.userid;
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

function isLogged(req, res, next){
    if (userModule.isLogged(req.query.userid))
    {
        next();
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `debes estar logueado para poder ver la informacion que deseas` });
    }
}

function isAdmin(req,res,next){
    if (userModule.isAdmin(req.query.userid))
    {
        next();
    }
    else{
        res.status(401).send({ resultado: false, mensaje: `el usuario no es administrador` });
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
    let userId = req.query.userid;
    let {password, password2, phone,name, surname, email, address} = req.body;
    if (userModule.modifyUser(userId, password,password2,phone,name,surname,email,address))
    {
        next();
    }
    else{
        res.status(401).send({ resultado: false, mensaje: `No se pudo modificar el usuario` });
    }
}
function modifyUserA(req, res, next){
    let userId = req.query.userid;
    let {password, password2, phone,name, surname, email, address,country} = req.body;
    if (userModule.modifyUser(userId, password,password2,phone,name,surname,email,address,country))
    {
        next();
    }
    else{
        res.status(401).send({ resultado: false, mensaje: `No se pudo modificar el usuario` });
    }
}

function addProduct(req, res, next){
    let userId = req.query.userid;
    if(orderModule.getOpenOrder(userId).length > 0)
    {
        orderNumber = orderModule.getOpenOrder(userId)[0].getNumber();
        if(orderModule.addProductToOrder(orderNumber, req.body.productid, req.body.amount)){
            next();
        }
        else{
            res.status(404).send({ resultado: false, mensaje: `el numero de orden no existe` });
        }
        
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo agregar el producto a la orden, debe existir una orden en estado pendiente` });
    }
}

function remProduct(req, res, next){
    let userId = req.query.userid;
    if(orderModule.getOpenOrder(userId).length > 0)
    {
        orderNumber = orderModule.getOpenOrder(userId)[0].getNumber();
        if(orderModule.remProductToOrder(orderNumber, req.body.productid, req.body.amount)){
            next();
        }
        else{
            res.status(404).send({ resultado: false, mensaje: `no existe el producto que desea remover de la lista o el numero de orden no existe` });
        }
        
    }
    else{
        res.status(404).send({ resultado: false, mensaje: `No se pudo agregar el producto a la orden, debe existir una orden en estado pendiente` });
    }
}

module.exports = {isExists, login, isLogged, logout, deleteUser, modifyUser, modifyUserA, createUser, isAdmin, addProduct, remProduct}*/
