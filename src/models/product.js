class Product{
    constructor(name, description, price){
        this.name = name;
        this.description = description;
        this.price = price;
        this.isDeleted=false;
    }

    getName(){return this.name;}
    setName(name){this.name=name;}

    getDescription(){return this.description;}
    setDescription(description){this.description=description;}

    getPrice(){return this.price;}
    setPrice(price){this.price=price;}

    getIsDeleted(){return this.isDeleted;}
    setUsDeleted(isDeleted){this.isDeleted=isDeleted;}
}

let products=[];


function createProduct(name, description, price){
    //compruebo que los campos obligatorios esten con valores
    let camposObligatorios = true;
    let createConfirm = false;
    if(!name || !description || !price ){
        camposObligatorios=false;
        console.log("Hay algun campo vacio");
    }

    //verifico que no exista el mismo nombre del producto antes de crearlo y que el precio sea numerico
    if(!findProductName(name) && !isNaN(price))
    {
        let newProduct = new Product(name, description, price, false);
        products.push(newProduct);
        createConfirm = true;
        console.log("//////////////PRODUCTO CREADO////////////////");
    }
    else{
        console.log("//////////////EL PRODUCTO NO FUE CREADO////////////////");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("El precio es un numero:"+!isNaN(price));
        console.log("El nombre es unico:"+!findProductName(name));
        console.log("Campos obligatorios llenos:"+camposObligatorios);
    }
    return createConfirm;
}

function findProductName(name){
    let productExist = false;
    products.forEach(function(product){
        if (product.getName==name){
            productExist = true;
        }
    })
    return productExist;
}

function modifyProduct(productId, name, description, price){
    if (!findProductName(name) && !isNaN(price)){
        product[productId].setName(name);
        product[productId].setDescription(description);
        product[productId].setPrice(price);
    }
    else{
        console.log("//////////////EL PRODUCTO NO FUE MODIFICADO////////////////");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("El precio es un numero:"+!isNaN(price));
        console.log("El nombre es unico:"+!findProductName(name));
        console.log("Campos obligatorios llenos:"+camposObligatorios);
    }      
}

function deleteProduct(productId){
    if(productId > -1 && productId<products.length && !products[productId].getIsDeleted) 
    {
        products[productId].setIsDeleted(true);
    }
    else{
        console.log("El indice no existe, no puede ser eliminado");
    }
    
}

module.exports={Product, products, createProduct,findProductName,modifyProduct,deleteProduct}