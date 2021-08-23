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
    setIsDeleted(isDeleted){this.isDeleted=isDeleted;}
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
        console.log("Producto Creado");
    }
    else{
        console.log("Tuvimos un problema al cread el producto");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("El precio es un numero:"+!isNaN(price));
        console.log("El nombre es unico:"+!findProductName(name));
        console.log("Campos obligatorios llenos:"+camposObligatorios);
    }
    return createConfirm;
}

function findProductName(name){
    let productExist = false;
    console.log(name);
    products.forEach(function(product){
        if (product.getName()==name){
            productExist = true;
        }
    })
    return productExist;
}

function modifyProduct(productId, name, description, price){
    let modified = false;
    if (!findProductName(name) && !isNaN(price) && productId >-1 && productId< products.length){
        products[productId].setName(name);
        products[productId].setDescription(description);
        products[productId].setPrice(price);
        modified=true;
    }
    else{
        console.log("El producto no fue modificado");
    }
    console.log("modified: "+modified);
    return modified; 

}

function deleteProduct(productId){
    let deleted = false;
    if(productId > -1 && productId<products.length && !products[productId].getIsDeleted()) 
    {
        products[productId].setIsDeleted(true);
        deleted = true;
    }
    else{
        console.log("El indice no existe, no puede ser eliminado");
    }
    return deleted;
}
function listActiveProducts(){
    let activeProducts= products.filter(product => product.getIsDeleted() == false)
    return activeProducts;
}

module.exports={Product, products, createProduct,findProductName,modifyProduct,deleteProduct, listActiveProducts}