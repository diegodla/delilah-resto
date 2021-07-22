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
