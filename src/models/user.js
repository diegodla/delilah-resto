class Person {
    constructor(name, surname, email, dni, phone, address, id){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dni = dni;
        this.phone = phone;
        this.address=address; 
    }
    getId(){return this.id;}
    
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
}
class User extends Person {
    constructor(userName, password, name, surname, email, dni, phone, address, id){
        super (name, surname, email, dni, phone, address, id);
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
function asignId(list){
    id = list.length
    return id;
}
function textCompare(texto1, texto2){
    let iguales = false;
    if (texto1 == texto2){
        iguales = true;
    }
    return iguales;
}

function login(user, pass){
    let id = -1;
    tempid = getUserId(user, user);
    if(tempid >-1 && users[tempid].getPassword() == pass)
    {
        id = tempid;
    }
    return id;
}

function createUser(user, pass, pass2, phone, name, surname, email, dni,  address){
    //compruebo que los campos obligatorios esten con valores
    
    let controls = {
        "created":false,
        "exist":true,
        "passCompare":false,
        "fullFields":true
    }
    let camposObligatorios = true;
    console.log(user);
    if(user=="" || pass=="" || pass2=="" || name==undefined || surname==undefined || email==undefined || dni==undefined  || phone==undefined || address==undefined || user==undefined || pass==undefined || pass2==undefined || name==undefined || surname==undefined || email==undefined || dni==undefined  || phone==undefined || address==undefined){
        console.log("Hay algun campo vacio");
        controls.fullFields = false;
    }
    let id = getUserId(user, email);
    if(id == -1){
        controls.exist=false;
    }
    if(textCompare(pass,pass2)){
        controls.passCompare = true;
    }

    //si id es -1 no existe ni el usuario ni el email
    //ademas si textCompare retorna true entonces las contraseñas coinciden
    //Ademas compruebo que los campos no esten vacios
    if(!controls.exist && controls.passCompare && controls.fullFields)
    {  
        let newUser = new User(user, pass, name, surname, email, dni, phone, address, asignId(users));
        users.push(newUser);
        controls.created = true;
    }
    else{
        console.log("usuario no creado");
    }
    return controls;
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

function modifyUser(userId, pass, pass2, phone,name, surname, email, address){
    let isModified = false;
    if (textCompare(pass, pass2) && userId>-1 && userId < users.length){
        users[userId].setPassword(pass);
        users[userId].setPhone(phone);
        users[userId].setName(name);
        users[userId].setSurname(surname);
        users[userId].setEmail(email);
        users[userId].setAddress(address);
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
            islogged = true;
        }
    });
    return islogged;
}

function isAdmin(id){
    let isAdmin = false; 
    if (id > -1 && id < users.length){
        isAdmin = users[id].getIsAdmin();
    }
    return isAdmin;
}

function findAddress(userId){
    userExist = findUser(userId);
    let address = "";
    if (userExist){
        users.forEach(function(user, index){
            if (index == userId)
            {
                address = user.getAddress();
            }
        })
    }
    return address;
}

function listActiveUsers(){
    let activeUsers= users.filter(user => user.getIsDeleted() == false)
    return activeUsers;
}

module.exports={User, users, textCompare, login, createUser, getUserId, deleteUser, modifyUser, modifyIsAdmin, findUser, isLogged, logedUsers,listActiveUsers,findAddress, isAdmin, textCompare};