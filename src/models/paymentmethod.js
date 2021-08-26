class PaymentMethod {
    constructor(name, code, id){
        this.id = id;
        this.name = name;
        this.code=code;
        this.isDeleted = false;
    }

    getId(){return this.id;}
    
    getName(){return this.name;}
    setName(name){this.name=name;}

    getCode(){return this.code}
    setCode(code){this.code = code}
    
    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted=isDeleted;}
}
let paymentMethods = [];

function asignId(list){
    id = list.length
    return id;
}

function createPaymentM(name, code){
    let camposObligatorios = true;
    let created = false;
    if(!name || !code){
        camposObligatorios=false;
        console.log("Hay algun campo vacio");
    }

    if(!findPaymentCode(code))
    {
        let newPaymentM = new PaymentMethod(name, code, asignId(paymentMethods));
        paymentMethods.push(newPaymentM);
        created = true;
        console.log("Metodo de pago creado");
    }
    else{
        console.log("Tuvimos un problema al crear el nuevo metodo de pago");
    }
    return created;
}

function findPaymentCode(code){
    let paymentMExist = false;
    paymentMethods.forEach(function(paymentM){
        if (paymentM.getCode()==code){
            paymentMExist = true;
        }
    })
    return paymentMExist;
}

function getPaymentName(code){
    let paymentName = "";
    paymentMethods.forEach(function(paymentM){
        if (paymentM.getCode()==code){
            paymentName = paymentM.getName();
        }
    })
    return paymentName;
}

function modifyPaymentM(paymentMId,name, code){
    let modified = false;
    let verif = false;
    if(findPaymentCode(code) && code == paymentMethods[paymentMId].getCode()){
        verif = true;
    }
    else if(!findPaymentCode(code)){
        verif = true;
    }
    if(verif && paymentMId>-1 && paymentMId< paymentMethods.length){
        paymentMethods[paymentMId].setName(name);
        paymentMethods[paymentMId].setCode(code);
        modified = true;
    }
    else{
        console.log("El metodo de pago no fue modificado");
    } 
    return modified;
}

function deletePaymentM(id){
    let deleted = false;
    paymentMethods.forEach(function (pm){
    if (pm.getId() == id && pm.getIsDeleted() == false)
    {
        pm.setIsDeleted(true);
        deleted = true;
    }
    });
    
    return deleted;
}

function listActivePaymentM(){
    let activePaymentM= paymentMethods.filter(paymentM => paymentM.getIsDeleted() == false)
    return activePaymentM;
}
module.exports={PaymentMethod,paymentMethods,createPaymentM,modifyPaymentM,findPaymentCode,deletePaymentM, listActivePaymentM,getPaymentName}