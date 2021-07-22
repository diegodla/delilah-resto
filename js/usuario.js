class Usuario extends Persona {
    constructor(nombreUsuario, contrasenia, nombre, apellido, email, dni, pais){
        super (nombre, apellido, email, dni, pais);
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
    }

    getNombreUsuario(){return this.nombreUsuario;}
    setNombreUsuario(nombreUsuario){this.nombreUsuario=nombreUsuario;}

    getContrasenia(){return this.contrasenia;}
    setContrasenia(contrasenia){this.contrasenia=contrasenia;}
}

