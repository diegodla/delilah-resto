const userModule = require('./user');
const paymentMModule = require ('./paymentmethod');
const productModule = require ('./product');
const { json } = require('express');


class Order {
    constructor(number, userId, paymethod,  address, delivery, id){
        this.id = id;
        this.number = number;
        this.userId = userId;
        this.productList = [];
        this.status = statusList[0];
        this.paymethod=paymethod;
        this.address=address;
        this.delivery=delivery;
        this.date = new Date();
        this.isDeleted = false;
        
    }
    getId(){return this.id;}

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

function asignId(list){
    id = list.length
    return id;
}

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
        let newOrder = new Order(orders.length, userId, paymentCode, deliveryAddress, delivery, asignId(orders));
        orders.push(newOrder);
        created = true;
        console.log("Orden Cargada");
    }
    else{
        console.log("La orden no fue cargada");
    }
    return created;
}

function calcPrice(productList){
    let totalPrice = 0;
    productList.forEach( function (product){
        price = price + product.getPrice();
    });
    return totalPrice;
}

 
function listActiveOrders(){
    let activeOrders = orders.filter(order => order.getIsDeleted() == false)
    let activeordersFormated = [];
    let totalPrice = 0;
    activeOrders.forEach(function(order){
        let p = []
        order.getProductList().forEach(function(productid){
            totalPrice += productModule.products[productid].getPrice();
            np = {
                "name": productModule.products[productid].getName(),
                "description": productModule.products[productid].getDescription(),
                "price":productModule.products[productid].getPrice(),
                "isDeleted":productModule.products[productid].getIsDeleted()}
            p.push(np);
        })
        
        let o = {
            "number":order.getNumber(),
            "userId":order.getUserId(),
            "status":order.getStatus(),
            "paymethod":paymentMModule.getPaymentName(order.getPayMethod()),
            "address":order.getAddress(),
            "delivery":order.getDelivery(),
            "date":order.getDate(),
            "totalPrice":totalPrice,
            "productList": p
        }
        activeordersFormated.push(o);
    })
    return activeordersFormated;
}

function listUserOrders(userid){
    let userOrders= orders.filter(order => order.getUserId() == userid)
    let userOrdersFormated = [];
    let totalPrice = 0;
    userOrders.forEach(function(order){
        let p = []
        order.getProductList().forEach(function(productid){
            totalPrice += productModule.products[productid].getPrice();
            np = {
                "name": productModule.products[productid].getName(),
                "description": productModule.products[productid].getDescription(),
                "price":productModule.products[productid].getPrice(),
                "isDeleted":productModule.products[productid].getIsDeleted()}
            p.push(np);
        })
        
        let o = {
            "number":order.getNumber(),
            "userId":order.getUserId(),
            "status":order.getStatus(),
            "paymethod":paymentMModule.getPaymentName(order.getPayMethod()),
            "address":order.getAddress(),
            "delivery":order.getDelivery(),
            "date":order.getDate(),
            "totalPrice":totalPrice,
            "productList": p
        }
        userOrdersFormated.push(o);
    })
    return userOrdersFormated;
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

function addProductToOrder(orderNumber, idProductToAdd, amount){
    let added = false;
    let orderIndex = findIdOrderByNumber(orderNumber);
    if(orderIndex >-1){
        for (let i = 0; i < amount; i++) {
            orders[orderIndex].getProductList().push(idProductToAdd);
        }
        added = true;
    }    
    return added;
}
function remProductToOrder(orderNumber, productid, amount){
    let removed = false;
    let orderIndex = findIdOrderByNumber(orderNumber);
    let countProduct = 0;
    let indexToRemove = [];
    
    if(orderIndex >-1)
    {
        orders[orderIndex].getProductList().forEach(function(product, index){
            if (product == productid){
                indexToRemove.push(index);
                countProduct++;
            }
        })
        for (let i = 0; i < amount; i++) {
            orders[orderIndex].getProductList().splice(indexToRemove[i],1);
        }
        removed = true;
    }
    
    return removed;
}

function modifyOrder(userId, paymentCode, delivery, address){
    let modified = false;
    let userExist = userModule.findUser(userId);
    let deliveryAddress = "";
    let openOrder = getOpenOrder(userId)[0];
    if (address==="" || address === null || address === undefined)
    {
      deliveryAddress = userModule.findAddress(userId);
    }
    else{
      deliveryAddress = address;
    }
    if(userExist && paymentMModule.findPaymentCode(paymentCode) && openOrder)
    {
        let orderid = findIdOrderByNumber(getOpenOrder(userId)[0].getNumber());
        console.log(paymentCode);
        orders[orderid].setPayMethod(paymentCode);
        orders[orderid].setDelivery(delivery);
        orders[orderid].setAddress(address);
        modified = true;
        console.log("Datos de la orden modificados");
    }
    else{
        console.log("La orden indicada no se puede modificar");
    }
    return modified;

}
function closeOrder(userId){
    let closed = false;
    let userExist = userModule.findUser(userId);
    let openOrder = getOpenOrder(userId)[0];
    if(userExist && openOrder)
    {
        let orderid = findIdOrderByNumber(getOpenOrder(userId)[0].getNumber());
        let productCount = -1;
        productCount = orders[orderid].getProductList().length
        if(productCount>0)
        {
            orders[orderid].setStatus(statusList[1]);
            orders[orderid].setDate(new Date());
            closed = true;
            console.log("Orden cerrada");
        }
        else{
            console.log("La orden no tiene productos cargados, no se puede cerrar");
        }
        
    }
    else{
        console.log("La orden indicada no se pudo cerrar");
    }
    return closed;

}

function changeState(orderNumber, state){
    let changed = false;
    if(state < statusList.length && state > -1 && findIdOrderByNumber(orderNumber) > -1 && findIdOrderByNumber(orderNumber) < orders.length){
        orders[findIdOrderByNumber(orderNumber)].setStatus(statusList[state]);
        changed = true;
    }
    else{
        console.log("El estado de orden no existe, por favor veririfique la lista de estados y selecciones uno cocrecto")
    }
    return changed;
}

module.exports={Order, orders, statusList, createOrder, calcPrice,listActiveOrders, deleteOrder, getOpenOrder, findIdOrderByNumber, addProductToOrder, modifyOrder,listUserOrders, changeState,closeOrder, remProductToOrder}
