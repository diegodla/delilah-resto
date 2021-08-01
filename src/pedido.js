class Pedido {
    constructor(numero, idusuario, listaProductos, estado, precioTotal, isDeleted){
        this.nuermo = numero;
        this.idusuario = idusuario;
        this.listaProductos = listaProductos;
        this.estado = estado;
        this.precioTotal =precioTotal;
        this.isDeleted = isDeleted;
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

    getIsDeleted(){return this.isDeleted;}
    setprecioTotal(isDeleted){this.isDeleted = isDeleted;}
}

let pedidos=[];