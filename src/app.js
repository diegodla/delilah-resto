const express = require('express');
const app = express();
require('dotenv').config();
const config = require('./config');
//const database = require('./database/db');
///////////
//const sequelize = require('../src/connection/sequelize');
///////////
const database = require('./database/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Resto',
      description: 'API para gestionar las ordenes de productos realizadas por los usuarios registrados',
      version: '1.0.0'
    }
  },
  apis: ['./src/app.js', 
    
    './src/routes/users.js', 
    './src/routes/products.js',
    './src/routes/orders.js',
    './src/routes/paymentmethod.js',],
  tags: [
    {
        name: 'users',
        description: 'Operaciones sobre usuarios'
    },
    {
        name: 'orders',
        description: 'Operaciones sobre pedidos'
    },
    {
        name: 'products',
        description: 'Operaciones sobre productos'
    },
    {
        name: 'payment method',
        description: 'Operaciones sobre metodos de pago'
    },
]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//const initModule = require('./models/init');
const routerUsers = require('./routes/users');
const routerProducts = require('./routes/products');
const routerPaymentM = require('./routes/paymentmethod');
const routerOrders = require('./routes/orders')

app.listen(config.port, () => console.log("listening on "+config.port));

app.use('/users',routerUsers);
app.use('/products',routerProducts);
app.use('/paymentmethods', routerPaymentM);
app.use('/orders', routerOrders)
app.use(express.json())
app.use('/delilah-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));