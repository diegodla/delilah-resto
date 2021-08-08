class Producto{
    constructor(name, description, price, isDeleted){
        this.name = name;
        this.description = description;
        this.price = price;
        this.isDeleted=isDeleted;
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
//algunos productos de prueba

createProduct("Lomito Completo", "Sanguche de Lomo, tomate, lechuga, cebolla caramelizada, queso y mayonesa", 750,50);
createProduct("Hambuguesa Completa", "Sanguche de hamburguesa, tomate, lechuga, cebolla caramelizada, queso y mayonesa",  520,75);
createProduct("Pizza Napolitana", "Salsa, Muzzarella, Ajo, Tomate, Perejil", 600,00);
createProduct("Empanada de Carne Frita / Unidad", "Relleno de Carne, huevo, cebolla y morrones", 90,00);
createProduct("Empanada de Pollo al Horno/ Unidad", "Relleno de pollo, huevo", 90,00);

function createProduct(name, description, price){
    //compruebo que los campos obligatorios esten con valores
    let camposObligatorios = true;
    if(!name || !description || !price ){
        camposObligatorios=false;
        console.log("Hay algun campo vacio");
    }

    //verifico que no exista el mismo nombre del producto antes de crearlo y que el precio sea numerico
    if(!findProductName(name) && !isNaN(price))
    {
        let newProduct = new Producto(name, description, price, false);
        products.push(newProduct);
        console.log("//////////////PRODUCTO CREADO////////////////");
    }
    else{
        console.log("//////////////EL PRODUCTO NO FUE CREADO////////////////");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("El precio es un numero:"+!isNaN(price));
        console.log("El nombre es unico:"+!findProductName(name));
        console.log("Campos obligatorios llenos:"+camposObligatorios);
    }
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
}

function deleteProduct(productId, isDeleted){
    product[productId].setIsDeleted(isDeleted);
}
