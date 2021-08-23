class PaymentMethod {
    constructor(name, code){
        this.name = name;
        this.code=code;
        this.isDeleted = false;
    }
    getName(){return this.name;}
    setName(name){this.name=name;}

    getCode(){return this.code}
    setCode(code){this.code = code}
    
    getIsDeleted(){return this.isDeleted;}
    setIsDeleted(isDeleted){this.isDeleted=isDeleted;}
}
let paymentMethods = [];

function createPaymentM(name, code){
    let camposObligatorios = true;
    let created = false;
    if(!name || !code){
        camposObligatorios=false;
        console.log("Hay algun campo vacio");
    }

    if(!findPaymentCode(code))
    {
        let newPaymentM = new PaymentMethod(name, code);
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

function modifyPaymentM(paymentMId,name, code){
    let modified = false;
    if(!findPaymentCode(code)&& paymentMId>-1 && paymentMId< paymentMethods.length){
        paymentMethods[paymentMId].setName(name);
        paymentMethods[paymentMId].setCode(code);
        modified = true;
    }
    else{
        console.log("//////////////EL METOOD DE PAGO NO FUE Modificado////////////////");
    } 
    return modified;
}

function deletePaymentM(paymentId){
    let deleted = false;
    if (paymentId>-1 && paymentId < paymentMethods.length && paymentMethods[paymentId].getIsDeleted() == false)
    {
        paymentMethods[paymentId].setIsDeleted(true);
        deleted = true;
    }
    return deleted;
}

function listActivePaymentM(){
    let activePaymentM= paymentMethods.filter(paymentM => paymentM.getIsDeleted() == false)
    return activePaymentM;
}
module.exports={PaymentMethod,paymentMethods,createPaymentM,modifyPaymentM,findPaymentCode,deletePaymentM, listActivePaymentM}