class Persona {
    constructor(nombre, apellido, email, dni, pais){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.dni = dni;
        this.pais =pais;
    }

    getNombre(){return this.nombre;}
    setNombre(nombre){this.nombre=nombre;}

    getApellido(){return this.apellido;}
    setApellido(apellido){this.apellido=apellido;}

    getEmail(){return this.email;}
    setEmail(email){this.email=email;}

    getDni(){return this.dni;}
    setDni(dni){this.dni=dni;}

    getPais(){return this.pais;}
    setPais(estado){this.pais = estado;}
}