let autenticado = false;
//listo los usuarios de prueba
console.log(usuarios);

sessionStorage.setItem('autenticado', autenticado);

function compararTexto(texto1, texto2){
    let iguales = false;
    if (texto1 == texto2){
        iguales = true;
    }
    return iguales;
}

function login(){
    //tomo los datos ingresados por el usuario y los guardo en variables
    let txtUser = document.getElementById("txtUsuario").value;
    let txtPass = document.getElementById("txtPass").value;

    let id = obtenerIdUsuario(txtUser, txtUser);
    usuarios = cargarUsuarios();

    if(id >-1 && usuarios[id].getContrasenia() == txtPass)
    {
        //la variable autenticado la voy a utilizar para saber si los datos coincidieron con los previamente guardados
        autenticado = true;
    }
    if(autenticado){
        document.getElementById("mensaje").innerHTML = "<h2>Sesion iniciada Correctamente</h2>";
    } 
    else{
        document.getElementById("mensaje").innerHTML = "<h3>El usuario o la contraseña son incorrectos. Vuelva a intentarlo</h3>";
    }
    
}

let pagina = 'http://127.0.0.1:5500/Sprint1/MyApp/nuevoUsuario.html';
function redireccion() { document.location.href=pagina;}

function crearUsuario(){
    //Tomo los datos del usuario
    let txtUser = document.getElementById("txtUsuario").value;
    let txtNombre = document.getElementById("txtNombre").value;
    let txtApellido = document.getElementById("txtApellido").value;
    let txtDni = document.getElementById("txtDni").value;
    let txtPais = document.getElementById("txtPais").value;
    let txtEmail = document.getElementById("txtEmail").value;
    let txtPass = document.getElementById("txtPass").value;
    let txtPass2 = document.getElementById("txtPass2").value;
    //compruebo que los campos obligatorios esten con valores
    let camposObligatorios = true;
    if(!txtUser || !txtPass || !txtNombre || !txtApellido || !txtNombre || !txtDni || !txtPass|| !txtPass2){
        camposObligatorios=false;
        console.log("Hay algun campo vacio, fijate");
    }
    let id = obtenerIdUsuario(txtUser, txtEmail);

    //si id es -1 no existe ni el usuario ni el email
    //ademas si comparartexto retorna true entonces las contraseñas coinciden
    //Ademas compruebo que los campos no esten vacios
    if(id == -1 && compararTexto(txtPass,txtPass2) && camposObligatorios)
    {
        let nuevoUsuario = new Usuario(txtUser, txtPass, txtNombre, txtApellido, txtEmail, txtDni, txtPais);
        usuarios.push(nuevoUsuario);
        console.log("//////////////USUARIO CREADO////////////////");
        console.log(usuarios);
    }
    else{
        console.log("NO CUMPLISTE ALGUNA CONDICION, FIJATE");
    }
    
    
}

//para comprobar usuarios al momento de login este metodo se puede usaro ingresando user, user. entonces no importa si el usuario ingreso usuario o email. si exsite lo va a encontrar.
function obtenerIdUsuario(user, email){
    //suponemos que el id del usuario es el indice del array
    let id = -1
    usuarios.forEach(function(usuario, idArray){   
        //Obtengo un usuario del array Y..
        //Primero compruebo si el usuario es igual al dato que me pasaron. de ser asi retorno el id ya que el usuario existe
        if (user == usuario.getNombreUsuario()){
            id = idArray;
            return id;
        }
        //si lo que escribio la persona no conicide con el usuario pruebo con el email, asi no recorro el array 2 veces.
        // Si el email es igual al dato que me pasaron. de ser asi retorno el id ya que el usuario existe
        else if(email == usuario.getEmail()){
            id = idArray;
            return id;
        }
    })
    //Si no existe usuario y tampoco email retorno -1 
    return id;
}



function compararTextos(texto1, texto2){
//TODO realizar una funcion que compare dos textos
//retornar truo o false
}