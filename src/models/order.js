const userModule = require('./user');
const paymentMModule = require ('./paymentmethod');
const productModule = require ('./product');
const { json } = require('express');


class Order {
    constructor(number, userId, paymethod,  address, delivery){
        this.nuermo = number;
        this.userId = userId;
        this.productList = [];
        this.status = statusList[0];
        this.paymethod=paymethod;
        this.address=address;
        this.delivery=delivery;
        this.date = new Date();
        this.isDeleted = false;
        
    }

    getNumber(){return this.number;}
    setNumber(number){this.number=number;}

    getUserId(){return this.userId;}
    setUserId(userId){this.userId=userId;}

    getProductList(){return this.productList;}
    setProductList(productList){this.productList=productList;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getPayMethod(){return this.paymethod;}
    setPayMethod(paymethod){this.paymethod=paymethod;}

    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted = isDeleted;}

    getAddress(){return this.address;}
    setAddress(address){this.address=address;}

    getDate(){return this.date;}
    setDate(date){this.date=date;}

    getDelivery(){return this.delivery;}
    setDelivery(delivery){this.delivery=delivery;}
}

let orders = [];
let statusList = ["Pendiente","Confirmado","En preparacion", "Enviado", "Entregado", "Cancelado"];

function createOrder(userId, paymentCode, delivery, address){
    let created = false;
    let userExist = userModule.findUser(userId);
    let deliveryAddress = "";
     if (address==="" || address === null || address === undefined)
     {
       deliveryAddress = userModule.findAddress(userId);
     }
     else{
       deliveryAddress = address;
     }
    if(userExist && paymentMModule.findPaymentCode(paymentCode))
    {
        let newOrder = new Order(orders.length, userId, paymentCode, deliveryAddress, delivery);
        orders.push(newOrder);
        created = true;
        console.log("//////////////Orden Cargada////////////////");
    }
    else{
        console.log("//////////////La orden No fue cargada////////////////");
    }
    return created;
}

/*PROXIMO A BORRAR
function findMaxNumber(orders){
    let maxNumber = -1;
    orders.forEach( function (order){
        if(maxNumber<order.getNumber()){
            maxNumber = order.getNumber();
        }
    });
    return maxNumber+1;
}*/

function calcPrice(productList){
    let totalPrice = 0;
    productList.forEach( function (product){
        price = price + product.getPrice();
    });
    return totalPrice;
}

function listActiveOrders(){
    let activeOrders= orders.filter(order => order.getIsDeleted() == false)
    return activeOrders;
}

function deleteOrder(orderId){
    let deleted = false;
    if(orderId > -1 && orderId<orders.length && !orders[orderId].getIsDeleted()) 
    {
        orders[orderId].setIsDeleted(true);
        deleted = true;
    }
    else{
        console.log("El indice no existe, no puede ser eliminado");
    }
    return deleted;  
}

function getOpenOrder(userId){
    let openOrderList = orders.filter(ordr => ordr.getUserId() == userId && ordr.getIsDeleted() == false && ordr.getStatus() == statusList[0]);
    return openOrderList;
}

function findIdOrderByNumber(orderNumber)
{
    let orderId = -1; 
    orders.forEach(function(thisorder, idArray){  
        if (thisorder.getNumber() == orderNumber){
            orderId = idArray;
        }
    }) 
    return orderId;
}

function addProductToOrder(orderNumber, productToAdd){
    let added = false;
    let orderIndex = findIdOrderByNumber(orderNumber);
    orders[orderIndex].getProductList().push(productToAdd);
    return added;
}


module.exports={Order, orders, statusList, createOrder, calcPrice,listActiveOrders, deleteOrder, getOpenOrder, findIdOrderByNumber, addProductToOrder}
