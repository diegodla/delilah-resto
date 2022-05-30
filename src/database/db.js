require('dotenv').config({ path: __dirname + '/./../../.env' });

const { Sequelize, DataTypes } = require('sequelize');
const { createUser } = require('../models/user');
// https://sequelize.org/master/manual/getting-started.html

//const connection = await mysql.createConnection({ host, port, user, password });
//await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// TODO: Externalizar las options
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
    logging: false,
});

async function authenticate_mysql() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a base de datos MySQL.');
        await sequelize.sync({ force: false });
        console.log('Sincronización de base de datos satisfactoria');
    } catch (error) {
        console.error('Error en conexión a base de datos MySQL:', error);
    }
};


const User = sequelize.define('user',{
     name: Sequelize.STRING,
     surname: Sequelize.STRING,
     email: Sequelize.STRING,
     dni: Sequelize.INTEGER,
     /*dni: {
         type: DataTypes.INTEGER,
         allowNull: false,
         unique: true
     },*/
     phone: Sequelize.STRING,
     address: Sequelize.STRING,
     userName: Sequelize.STRING,
     password: Sequelize.STRING 
    }, {
     timestamps: false 
});
async function createUser2() {
    try{
        await User.create({
            name: "damian",
            surname: "Lecuna",
            email: "lecuna.damian@gmail.com",
            dni: 32233333,
            phone: "15555555",
            address: "9 de Agosto",
            userName: "damianl",
            password: "damianpass"
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }

    
}

authenticate_mysql();
createUser2();


module.exports = sequelize; 