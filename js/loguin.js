//TODO interrumpir ciclo forech
let datos = [];
let usuarios=[];
cargarListaPrueba();

function cargarListaPrueba(){
    //Cargo una lista de prueba para no tener que ingresar varios usuarios en cada test
    datos = ["diegodl", "dl123"];
    usuarios.push(datos);
    datos = ["valeriapq", "pval8"]
    usuarios.push(datos);
    datos = ["romanr","rr10"]
    usuarios.push(datos);
}

function nuevoUsuario(){
    //Tomo los datos ingresados por el usuario y los guardo en variables
    let txtUser = document.getElementById("txtUsuario").value;
    let txtPass = document.getElementById("txtPass").value;
    let usuarioExiste = false;

    //recorro los usuarios existentes para comprobar que el usuario que se quiere crear no exista
    usuarios.forEach(function(usuario){   
        if(txtUser == usuario[0]){
            //al tener ambas coincidencias pongo la variable autenticado en true
            usuarioExiste = true;
        }
    })
    //Si el usuario no existe continuo
    if(!usuarioExiste){
        //comparo que ningun gampo este vacio. no esta permitido en este caso
        if (txtUser != "" && txtPass !="" ) {
            //si los campos no estan vacios guardo el usuario en la posicion [0] de la lista datos y la contraseña en posicion [1]
            datos = [txtUser,txtPass];
            //guardo la lista datos dentro de la lista usuarios
            usuarios.push(datos);
            //confirmo al usuario creacion correcta
            document.getElementById("mensaje").innerHTML = "<h2>Usuario creado correctamente</h2>";
        }
        else{
            //si algun campo esta vacio no hago nada, solo muestro el mensaje de aviso
            document.getElementById("mensaje").innerHTML = "<h3>Los Campos Usuario y Contraseña no pueden estar vacios</h3>";
        } 

    }
    //Si el usuario existe envio un aviso
    else{
        document.getElementById("mensaje").innerHTML = "<h3>El usuario que intenta crear ya existe</h3>";
    }
}

function login(){
    //tomo los datos ingresados por el usuario y los guardo en variables
    let txtUser = document.getElementById("txtUsuario").value;
    let txtPass = document.getElementById("txtPass").value;
    //la variable autenticado la voy a utilizar para saber si los datos coincidieron con los previamente guardados
    let autenticado = false;
    
    //recorro el array usuarios
    usuarios.forEach(function(usuario){   
        //si el valor "txtUser" coincide con usuario[0] entonces el usuario existe y debe suceder lo mismo entre "txtPass" y usuario[1]
        if(txtUser == usuario[0] && txtPass == usuario[1]){
            //al tener ambas coincidencias pongo la variable autenticado en true
            autenticado = true;
        }

        //ustilizando la variable autenticado le aviso al usuario si pudo loguearse correctamente o no
        if(autenticado){
            document.getElementById("mensaje").innerHTML = "<h2>Sesion iniciada Correctamente</h2>";
        } 
        else{
            document.getElementById("mensaje").innerHTML = "<h3>El usuario o la contraseña son incorrectos. Vuelva a intentarlo</h3>";
        }
    })    
}

//esta funcion es solo para test. imprimo la lista de los usuarios existentes para poder recordar los usuarios y contraseñas ingresadas
function listarUsuarios() {
    let codigoHtml = "<ul>";
    usuarios.forEach(function(usuario){
        codigoHtml += "<li>"+usuario[0]+" / " + usuario[1] + "</li>";
    })
    codigoHtml += "</ul>";
    document.getElementById("listaUsuarios").innerHTML = codigoHtml;
}
