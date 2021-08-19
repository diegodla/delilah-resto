const express = require('express');
const app = express();
const config = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Resto',
      version: '1.0.0'
    }
  },
  apis: ['./src/app.js', './src/routes/paymentmethod.js','./src/routes/users.js', './src/routes/orders.js'],
  tags: [
    {
        name: 'general',
        description: 'Operaciones generales'
    },
    {
        name: 'auth',
        description: 'Operaciones sobre autorización'
    },
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

const initModule = require('./models/init');
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


//////////////////////////////////////////////////// ACA PARA ABAJO BORRAR/////////////////////////////
// Middlewa que verifica si el usuario es un administrador.
function isAdmin(req, res, next) {
    if (req.body.isAdmin) {
      next();
    } else {
      res.status(403).send(`El usuario actual no es administrador, no tiene acceso a la ruta ${req.url}`);
    }
}
// Permite recibir parámetros en formato JSON.

// Se agrega el middleware en la aplicación.
//app.use(isAdmin);



/**
 * @swagger
 * /dashboard:
 *  post:
 *    description: Crea un nuevo estudiante
 *    parameters:
 *    - name: nombre
 *      description: Nombre del estudiante
 *      in: formData
 *      required: true
 *      type: string
  *    - name: edad
 *      description: Edad del estudiante
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 * 
 */
app.get('/dashboard', (req, res) => {
    res.send('You are an admin');
  });


  /*app.post("/order/:id", isLogged, (req,res)=>{
    let userId= req.body.id;
    let products=[];
    let payment= req.body.payment;
    let status = "pendiente";
    let date = new date();
    let enabled=true;
    let amount=0;

    let order01 = new orderModule.Order (userId, products, payment,status, enabled, amount,);
    orderModule.products.push(order01);

    res.json(order01);
  });*/