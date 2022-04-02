require('dotenv').config({ path: __dirname + '/./../../.env' });

const { Sequelize } = require('sequelize');
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

authenticate_mysql();




module.exports = sequelize; 