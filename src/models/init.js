const userModule = require('./user');
const productModule = require('./product');
const paymentMModule = require('./paymentmethod')
const orderModule = require('./order')

/* ********************************* USUARIOS ********************************* */

let admin = new userModule.User("admin", "delicontrol", "admin", null, "admin@delilah-resto.com", null, "444000", "Perito Moreno 247", "Argentina");
admin.setIsAdmin(true);
userModule.users.push(admin);
userModule.createUser("adrielb", "adrielpass", "adrielpass", "154698987" ,"Adriel","Baez", "adriel@baez.com", "41234567", "Piedras 141","Argentina");
userModule.createUser("derlism", "derlispass", "derlispass", "151233279" ,"Derlis","Martinez", "derlis@martinez.com","92014976", "Paso 551","Colombia");
userModule.createUser("juliom", "juliopass", "juliopass", "158732487" ,"Julio Cesar","Marquez", "julio@marquez", "358569741", "Av. Cabildo 65","Argentina");
userModule.createUser("diegol", "diegopass", "diegopass", "153278461" ,"Diego","Lecuna", "lecuna.diego@mail.com", "32473500", "9 de julio 1050","Argentina");

/* ********************************* PRODUCTOS ********************************* */

productModule.createProduct("Lomito Completo", "Sanguche de Lomo, tomate, lechuga, cebolla caramelizada, queso y mayonesa", 750,50);
productModule.createProduct("Hambuguesa Completa", "Sanguche de hamburguesa, tomate, lechuga, cebolla caramelizada, queso y mayonesa",  520,75);
productModule.createProduct("Pizza Napolitana", "Salsa, Muzzarella, Ajo, Tomate, Perejil", 600,00);
productModule.createProduct("Empanada de Carne Frita / Unidad", "Relleno de Carne, huevo, cebolla y morrones", 90,00);
productModule.createProduct("Empanada de Pollo al Horno/ Unidad", "Relleno de pollo, huevo", 90,00);

/* ****************************** METODOS DE PAGO ****************************** */

paymentMModule.createPaymentM("Efectivo", "EF");
paymentMModule.createPaymentM("Tarjeta de Credito", "TC");
paymentMModule.createPaymentM("Tarjeta de Debito", "TD");
paymentMModule.createPaymentM("Mercado Pago", "MP");
paymentMModule.createPaymentM("Transferencia Bancaria", "TRB");

/* ****************************** ORDENES ****************************** */

orderModule.createOrder(2, "TC", true, "");
orderModule.orders[0].getProductList().push(0,0);

orderModule.createOrder(3, "MP", true, "Calle diferente a la del usuario 123");
orderModule.orders[1].getProductList().push(1,0,2);
orderModule.orders[1].setStatus(1);

orderModule.createOrder(1, "TC",true);
orderModule.orders[2].getProductList().push(2);
orderModule.orders[2].setStatus(2);
