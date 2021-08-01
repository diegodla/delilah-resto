class Producto{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    getNombre(){return this.nombre;}
    setNombre(nombre){this.nombre=nombre;}

    getDescripcion(){return this.descripcion;}
    setDescripcion(descripcion){this.descripcion=descripcion;}

    getPrecio(){return this.precio;}
    setPrecio(precio){this.precio=precio;}
}

let productos=[];
//algunos productos de prueba
let nuevoProducto = new Producto("Pizza Napolitana", "Salsa, Muzzarella, Ajo, Tomate, Perejil", 600,00);
productos.push(nuevoProducto);
nuevoProducto = new Producto("Lomito Completo","Sanguche de Lomo, tomate, lechuga, cebolla caramelizada, queso y mayonesa", 750,50);
productos.push(nuevoProducto);
nuevoProducto = new Producto("Hambuguesa Completa", "Sanguche de Lomo, tomate, lechuga, cebolla caramelizada, queso y mayonesa", 520,75);
productos.push(nuevoProducto);
nuevoProducto = new Producto("Empanada de Carne Frita / Unidad", "Relleno de Carne, huevo, cebolla y morrones", 90,00);
productos.push(nuevoProducto);
nuevoProducto = new Producto("Empanada de Pollo al Horno/ Unidad", "Relleno de pollo, huevo, cebolla y morrones", 90,00);
productos.push(nuevoProducto);