//const sequelize = require ('../database/db');
const {User, textCompare} = require('../models/user')
const app = require('../app')
const bcrypt = require('bcryptjs');
const keys = require('../keys')
const jwt = require('jsonwebtoken');
//const { application } = require('express');
//const { resolve } = require('@apidevtools/swagger-parser');
require('dotenv').config();

exports.login = async function login(userName, password, res){
    try {
        const user = await User.findOne({ where: {userName: userName} }).then((user) => {
            if(!user){
                res.status(200).send({
                    message: "El usuario no existe:"
                });
            }
            else{
                bcrypt.compare(password,user.password, (err, coinciden) => {
                    if (err) {
                        res.status(404).send({
                            message: "Error comprobando usuario y contraseña:",
                            error: err
                        });
                        console.log("Error comprobando usuario y contraseña:", err);
                    } 
                    else {
                        if(coinciden){
                            const payload = {
                                check: true
                            };
                            const token = jwt.sign(payload, keys.key,{
                                expiresIn: '2h'
                            });
                            res.status(401).send({
                                message: "Autenticacion exitosa",
                                token: token
                            })
                        }
                        else{
                            res.status(200).send({
                                message: "usuario o password incorrectos"
                            })
                        }
                    }
                });
            } 
        })
    }
    catch(error){
        console.error('Error al buscar los campos solicitados:', error);
    }
}

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
                password: await bcrypt.hash(pass, 10)
            }); 
            controls.created = true;
    }
    
    catch(error){
        console.error('Error al crear el usuario:', error);
        //res.status(201).send({ status: "error al crear el usuario"})
    }
    return controls;
}