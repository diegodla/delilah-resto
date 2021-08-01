class Pedido {
    constructor(numero, usuario, listaProductos, estado, precioTotal){
        this.nuermo = numero;
        this.usuario = usuario;
        this.listaProductos = listaProductos;
        this.estado = estado;
        this.precioTotal =precioTotal;
    }

    getNumero(){return this.numero;}
    setNumero(numero){this.numero=numero;}

    getUsuario(){return this.usuario;}
    setUsuario(usuario){this.usuario=usuario;}

    getListaProductos(){return this.listaProductos;}
    setListaProductos(listaProductos){this.listaProductos=listaProductos;}

    getEstado(){return this.estado;}
    setEstado(estado){this.estado=estado;}

    getprecioTotal(){return this.precioTotal;}
    setprecioTotal(precioTotal){this.precioTotal = precioTotal;}
}