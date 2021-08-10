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
    constructor(userName, password, name, surname, email, dni, phone, address,country){
        super (name, surname, email, dni, phone, address,country);
        this.userName = userName;
        this.password = password;
        this.isAdmin = false;
        this.isDeleted = false;
    }

    getUserName(){return this.userName;}
    setUserName(userName){this.userName=userName;}

    getPassword(){return this.password;}
    setPassword(password){this.password=password;}

    getIsAdmin(){return this.isAdmin;}
    setIsAdmin(isAdmin){this.isAdmin=isAdmin;}

    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted = isDeleted;}
}

let users = [];
let logedUsers=[];

function textCompare(texto1, texto2){
    let iguales = false;
    if (texto1 == texto2){
        iguales = true;
    }
    return iguales;
}

function login(user, pass){
    //En este caso los parametros son user, user ya que puede llegar directamente el usuario, pero tambien puede loguear por email.
    let id = -1;
    tempid = getUserId(user, user);
    if(tempid >-1 && users[tempid].getPassword() == pass)
    {
        id = tempid;
    }
    return id;
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
        let newUser = new User(user, pass, name, surname, email, dni, phone, address, country);
        users.push(newUser);
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
        if (user == thisuser.getUserName() && thisuser.getIsDeleted() == false){
            id = idArray;
            return id;
        }
        //si lo que escribio la persona no conicide con el usuario pruebo con el email, asi no recorro el array 2 veces.
        // Si el email es igual al dato que me pasaron. de ser asi retorno el id ya que el usuario existe
        else if(email == thisuser.getEmail() && thisuser.getIsDeleted() == false){
            id = idArray;
            return id;
        }
    })
    //Si no existe usuario y tampoco email retorno -1 
    return id;
}

function deleteUser(userId){
    let deleted = false;
    if(userId >-1 && userId< users.length && !users[userId].isDeleted){
        users[userId].setIsDeleted(true);
        deleted = true;
    }
    return deleted;
}

function modifyUser(userId, pass, pass2, phone,name, surname, email, address, country){
    let isModified = false;
    if (textCompare(pass, pass2) && userId>-1 && userId < users.length){
        users[userId].setPassword(pass);
        users[userId].setPhone(phone);
        users[userId].setName(name);
        users[userId].setSurname(surname);
        users[userId].setEmail(email);
        users[userId].setAddress(address);
        users[userId].setCountry(country);
        isModified=true;
    }      
    return isModified;
}

function modifyIsAdmin(userId, isAdmin){
    users[userId].setSetIsAdmin(isAdmin);
}

//verificar pra BORRAR////////////////////////////////////////
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
function isLogged(id){
    let islogged = false;
    logedUsers.forEach(userId => {
        if (userId == id)
        {
            isLogged = true;
        }
    });
    return islogged;
}


function listActiveUsers(){
    let activeUsers= users.filter(user => user.getIsDeleted() == false)
    return activeUsers;
}

module.exports={User, users, textCompare, login, createUser, getUserId, deleteUser, modifyUser, modifyIsAdmin, findUser, isLogged, logedUsers,listActiveUsers};