const sequelize = require ('../database/db');
const users = require ( '../models/user');
const bcrypt = require('bcryptjs');
const { use } = require('../routes/users');
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
exports.signup = async function signup(req, res, next){
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
}
exports.signup = async function signup(){
    try{
        if(await users.findOne({where:{userName:"diegol2"}}))
        {
            console.log("El usuario ya existe")
        }
        else if (await users.findOne({where:{email:"diego_dla@hotmail.com"}}))
        {
            console.log("El correo ya se encuenta registrado")
        }
        else{
            await users.create({
                name: "Diego",
                surname: "Lecuna",
                email: "diego_dla@hotmail.com",
                dni: 31233,
                phone: "8378373737",
                address: "9 de Agosto",
                userName: "diegol",
                password: "kjdkjdjkd"
            });
        }
        
        
    }
    catch(error){
        console.log("Estoy en catch?")
        console.error('Error al crear el usuario:', error);
        //res.status(201).send({ status: "error al crear el usuario"})
    }
}