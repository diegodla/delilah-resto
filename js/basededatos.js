///////////////////////////////////////////////////////////////////////////////////BORRAR ACA ABAJO
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

/////////////////////////////////////// BORRAR HASTA ACA /////////////////////////////


let fs = require('fs');

let usuarios=[];
let paises = [
	["ar", "Argentina"],
    ["br", "Brasil"],
	["cl", "Chile"],
    ["co", "Colombia"],
	["uy", "Uruguay"],
];



//un par de usuarios de prueba
let nuevoUsuario = new Usuario("adrielb", "adrielpass", "Adriel", "Baez", "adriel@baez.com", "41234567", "Argentina");
usuarios.push(nuevoUsuario);
nuevoUsuario = new Usuario("agustinar", "agustinapass", "Agustina", "Rios Velazquez", "agustina@rios.com", "40234069", "Argentina");
usuarios.push(nuevoUsuario);
nuevoUsuario = new Usuario("derlism", "derlispass", "Derlis", "Martinez", "derlis@martinez.com", "92014976", "Colombia");
usuarios.push(nuevoUsuario);
nuevoUsuario = new Usuario("juliom", "juliopass", "Julio Cesar", "Marquez", "julio@marquez", "358569741", "Argentina");
usuarios.push(nuevoUsuario);
nuevoUsuario = new Usuario("diegol", "diegopass", "Diego", "Lecuna", "lecuna.diego@mail.com", "32473500", "Argentina");
usuarios.push(nuevoUsuario);

guardarListaUsuarios(usuarios,"");

function guardarListaUsuarios(lista, ubicacion){
    let txtFuncion = `function cargarUsuarios(){\n`;
    let objetoaGuardar ="";
    lista.forEach(usuario => {
        objetoaGuardar = objetoaGuardar+ `let nuevoUsuario = new Usuario("${usuario. getNombreUsuario()}","${usuario.getContrasenia()}", "${usuario.getNombre()}", "${usuario.getApellido()}", "${usuario.getEmail()}", "${usuario.getDni()}", "${usuario.getPais()}");\nusuarios.push(nuevoUsuario);\n`
    });
    txtFuncion = txtFuncion + objetoaGuardar +`\n}`;
    fs.appendFileSync('baseUsuarios.js', txtFuncion);
}




