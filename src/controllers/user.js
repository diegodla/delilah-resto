const sequelize = require ('../database/db');
const {User, textCompare} = require('../models/user')
const bcrypt = require('bcryptjs');
require('dotenv').config();

/*exports.login = async function login(req, res, next){
    try {
        const {userName, password, isAdmin} = req.body
        if(!isAdmin||isAdmin==undefined){
            isAdmin==false;
        }
        console.log("Login exitoso", useName, password);
        const user = await users.findOne({ where: {userName: userName} }).then((user) => {
            if (!user) return donde(null, false, { message: `No se encuentra el usuario ${userName}`});
            return user.
        });

        if(!user){
            console.log("Usuario no registrado");
            res.status(400).send({status:"Usuario no registrado"});
        }
        else{

        }
    }
    catch{

    }
}*/
/*exports.signup = async function signup(req, res, next){
    console.log("Estoy en try?")
    try{
        await users.create({
            name: "Diego",
            surname: "Lecuna",
            email: "lecuna.damian@gmail.com",
            dni: 31233,
            phone: "8378373737",
            address: "9 de Agosto",
            userName: "jdhd",
            password: "kjdkjdjkd"
        });
        res.status()
    }
    catch{
        console.error('Error al crear el usuario:', error);
        res.status(201).send({ status: "error al crear el usuario"})
    }
}*/
exports.fullFields = function fullFields(user, pass, pass2, phone, name, surname, email, dni,  address){
    console.log("Chequeando campos para crear al usuario: "+user);
    let controls = {
        "passCompare":false,
        "fullFields":true
    }
    //Compruebo que los campos no esten vacios
    if(user=="" || pass=="" || pass2=="" || name==undefined || surname==undefined || email==undefined || dni==undefined  || phone==undefined || address==undefined || user==undefined || pass==undefined || pass2==undefined || name==undefined || surname==undefined || email==undefined || dni==undefined  || phone==undefined || address==undefined){
        console.log("Todos los capmos son obligatorios, verifique que todos los datos estan correctamente completados");
        controls.fullFields = false;
    }

     //Si textCompare retorna true entonces las contraseñas coinciden

    if(textCompare(pass,pass2)){
        controls.passCompare = true;
    }
    return controls;
}

exports.isExists = async function isExists (user, email){
    let controls = {
        "userExist":false,
        "emailExist":false
    }
    try{
        //Compruebo que el usuario no exista
        if(await User.findOne({where:{userName:user}}))
        {
            console.log("El usuario ya existe")
            controls.userExist=true;
        }
        //compruebo que el correo no exista
        if(await User.findOne({where:{email:email}}))
        {
            console.log("El correo ya se encuenta registrado")
            controls.emailExist=true;
        }
    }
    catch(error){
        console.error('Error al buscar los campos solicitados:', error);
        //res.status(201).send({ status: "error al crear el usuario"})
    }
    return controls;
}

exports.signup = async function signup(user, pass, phone, name, surname, email, dni,  address){
    
    let controls = {
        "created":false
    }
    
    try{
        //Creo el usuario en BD
        await User.create({
                name: name,
                surname: surname,
                email: email,
                dni: dni,
                phone: phone,
                address: address,
                userName: user,
                password: pass
            });
            controls.created = true;
    }
    catch(error){
        console.error('Error al crear el usuario:', error);
        //res.status(201).send({ status: "error al crear el usuario"})
    }
    return controls;
}