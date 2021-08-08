class Person {
    constructor(name, surname, email, dni, phone, address, country){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dni = dni;
        this.phone = phone;
        this.address=address;
        this.country =country;  
    }
    getName(){return this.name;}
    setName(name){this.name=name;}

    getSurname(){return this.surname;}
    setSurname(surname){this.surname=surname;}

    getEmail(){return this.email;}
    setEmail(email){this.email=email;}

    getDni(){return this.dni;}
    setDni(dni){this.dni=dni;}

    getPhone(){return this.phone;}
    setPhone(phone){this.phone=phone;}

    getAddress(){return this.address;}
    setAddress(address){this.address=address;}

    getCountry(){return this.country;}
    setCountry(country){this.country = country;}
}


class User extends Person {
    constructor(user, password, isAdmin, name, surname, email, dni, phone, address,country, isDeleted){
        super (name, surname, email, dni, phone, address,country);
        this.user = user;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isDeleted = isDeleted;
    }

    getUser(){return this.user;}
    setUser(user){this.user=user;}

    getPassword(){return this.password;}
    setPassword(password){this.password=password;}

    getIsAdmin(){return this.isAdmin;}
    setSetIsAdmin(isAdmin){this.isAdmin=isAdmin;}

    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted = isDeleted;}
}

let users = [];


let admin = new User("admin", "delicontrol", true, "admin", null, "admin@delilah-resto.com", null, "444000", "Perito Moreno 247", "Argentina", false);
users.push(admin);
createUser("adrielb", "adrielpass", "adrielpass", "154698987" ,"Adriel","Baez", "adriel@baez.com", "41234567", "Piedras 141","Argentina");
createUser("derlism", "derlispass", "derlispass", "151233279" ,"Derlis","Martinez", "derlis@martinez.com","92014976", "Paso 551","Colombia");
createUser("juliom", "juliopass", "juliopass", "158732487" ,"Julio Cesar","Marquez", "julio@marquez", "358569741", "Av. Cabildo 65","Argentina");
createUser("diegol", "diegopass", "diegopass", "153278461" ,"Diego","Lecuna", "lecuna.diego@mail.com", "32473500", "9 de julio 1050","Argentina");
console.log(users);

function textCompare(texto1, texto2){
    let iguales = false;
    if (texto1 == texto2){
        iguales = true;
    }
    return iguales;
}

function login(user, pass){
    let id = getUserId(user, user);
    let autenticado = false;

    if(id >-1 && users[id].getPassword() == pass)
    {
        //la variable autenticado la voy a utilizar para saber si los datos coincidieron con los previamente guardados
        autenticado = true;
    }
    if(autenticado){
        console.log("Sesion iniciada correctamente");
    } 
    else{
        console.log("Los datos ingreados no coinciden con nuestros");
    }
    return autenticado;
}

function createUser(user, pass, pass2, phone, name, surname, email, dni,  address, country){
    //compruebo que los campos obligatorios esten con valores
    let camposObligatorios = true;
    if(user==null || pass==null || pass2==null || name==null || surname==null || email==null || dni==null  || phone==null || address==null || country==null){
    //if(!user || !pass || !pass2 || !name || !surname || !email || !dni  || !phone || !address || !country){
        camposObligatorios=false;
        console.log("Hay algun campo vacio, fijate");
    }
    let id = getUserId(user, email);

    //si id es -1 no existe ni el usuario ni el email
    //ademas si textCompare retorna true entonces las contraseñas coinciden
    //Ademas compruebo que los campos no esten vacios
    if(id == -1 && textCompare(pass,pass2) && camposObligatorios)
    {  
        let newUser = new User(user, pass, false, name, surname, email, dni, phone, address, country, false);
        users.push(newUser);
        console.log("//////////////USUARIO CREADO////////////////");
    }
    else{
        console.log("NO CUMPLISTE ALGUNA CONDICION");
        console.log("ID:"+id);
        console.log("Conincidencia en password:"+textCompare(pass,pass2));
        console.log("Campos obligatorios llenos:"+camposObligatorios);
    }
}

//para comprobar users al momento de login este metodo se puede usaro ingresando user, user. entonces no importa si el usuario ingreso usuario o email. si exsite lo va a encontrar.
function getUserId(user, email){
    //suponemos que el id del usuario es el indice del array
    let id = -1
    users.forEach(function(thisuser, idArray){   
        //Obtengo un usuario del array Y..
        //Primero compruebo si el usuario es igual al dato que me pasaron. de ser asi retorno el id ya que el usuario existe
        if (user == thisuser.getUser() && user.getIsDeleted() == false){
            id = idArray;
            return id;
        }
        //si lo que escribio la persona no conicide con el usuario pruebo con el email, asi no recorro el array 2 veces.
        // Si el email es igual al dato que me pasaron. de ser asi retorno el id ya que el usuario existe
        else if(email == thisuser.getEmail() && user.getIsDeleted() == false){
            id = idArray;
            return id;
        }
    })
    //Si no existe usuario y tampoco email retorno -1 
    return id;
}

function deleteUser(userId){
    users[userId].setIsDeleted(true);
}

function modifyUser(userId, pass, pass2, phone,name, surname, email, dni, country){
    if (textCompare(pass, pass2)){
        users[userId].setPassword(pass);
        users[userId].setPhone(phone);
        users[userId].setName(name);
        users[userId].setSurname(surname);
        users[userId].setEmail(email);
        users[userId].setDni(dni);
        users[userId].setCountry(country);
    }      
}

function modifyIsAdmin(userId, isAdmin){
    users[userId].setSetIsAdmin(isAdmin);
}

//verificar para BORRAR////////////////////////////////////////
function findUser(userId){
    let exist = false;
    users.forEach(function(user, index){
        if (index == userId)
        {
            exist = true;
        }
    })
    return exist;
}

module.exports={Persona, Usuario, users, textCompare, login, createUser, getUserId, deleteUser, modifyUser, modifyIsAdmin, findUser};