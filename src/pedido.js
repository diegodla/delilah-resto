class Pedido {
    constructor(number, usuarioId, productList, status, totalPrice, isDeleted){
        this.nuermo = number;
        this.usuarioId = usuarioId;
        this.productList = productList;
        this.status = status;
        this.totalPrice =totalPrice;
        this.isDeleted = isDeleted;
    }

    getNumber(){return this.number;}
    setNumber(number){this.number=number;}

    getUsuario(){return this.usuario;}
    setUsuario(usuario){this.usuario=usuario;}

    getProductList(){return this.productList;}
    setProductList(productList){this.productList=productList;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getTotalPrice(){return this.totalPrice;}
    setTotalPrice(totalPrice){this.totalPrice = totalPrice;}

    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted = isDeleted;}
}

let pedidos=[];