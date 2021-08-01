class Pedido {
    constructor(number, userId, productList, status, totalPrice, paymethod, isDeleted, address, date){
        this.nuermo = number;
        this.userId = userId;
        this.productList = productList;
        this.status = status;
        this.totalPrice =totalPrice;
        this.paymethod=paymethod;
        this.isDeleted = isDeleted;
        this.address=address;
        this.date = date;
    }

    getNumber(){return this.number;}
    setNumber(number){this.number=number;}

    getUser(){return this.user;}
    setUser(user){this.user=user;}

    getProductList(){return this.productList;}
    setProductList(productList){this.productList=productList;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getTotalPrice(){return this.totalPrice;}
    setTotalPrice(totalPrice){this.totalPrice = totalPrice;}

    getPayMethod(){return this.paymethod;}
    setPayMethod(paymethod){this.paymethod=paymethod;}

    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted = isDeleted;}

    getAddress(){return this.address;}
    setAddress(address){this.address=address;}

    getDate(){return this.date;}
    setDate(date){this.date=date;}
}

let orders = [];

function createOrder(number, userId, productList, status, totalPrice, address, date){
  //verifico que no exista el mismo nombre del producto antes de crearlo y que el precio sea numerico
    if(findUser(userId) && productList.length>0)
    {
        let newOrder = new Pedido(number, userId, productList, status, totalPrice, false, address, date);
        users.push(newOrder);
        console.log("//////////////Orden Cargada////////////////");
    }
    else{
        console.log("//////////////La orden No fue cargada////////////////");
        console.log("Revise los siguientes valores");
        console.log("Existencia del usuario: "+findUser(userId));
        console.log("Cantidad de productos en la lista:"+productList.length);
    }
}

function findMaxNumber(orders){
    let maxNumber = -1;
    orders.forEach( function (order){
        if(maxNumber<order.getNumber()){
            maxNumber = order.getNumber();
        }
    });
    return maxNumber+1;
}

function calcPrice(productList){
    let price = 0;
    productList.forEach( function (product){
        price = price + product.getPrice();
    });
    return price;
}
