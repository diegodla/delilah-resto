class PaymentMethod {
    constructor(name, code){
        this.name = name;
        this.code=code;
        this.isDeleted = false;
    }
    getName(){return this.name;}
    setName(name){this.name=name;}

    getCode(){return this.code}
    setCode(){return this.code}
    
    getIsDeleted(){return this.isDeleted;}
    setUsDeleted(isDeleted){this.isDeleted=isDeleted;}
}
let paymentMethods = [];

function createPaymentM(name, code){
    let camposObligatorios = true;
    if(!name || !code){
        camposObligatorios=false;
        console.log("Hay algun campo vacio");
    }

    if(!findPaymentCode(code))
    {
        let newPaymentM = new PaymentMethod(name, code);
        paymentMethods.push(newPaymentM);
        console.log("//////////////METODO DE PAGO CREADO////////////////");
    }
    else{
        console.log("//////////////EL METOOD DE PAGO NO FUE CREADO////////////////");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("FindPaymentCode:"+findPaymentCode(code));
    }
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
    if(!findPaymentCode(code)){
        paymentMethods[paymentMId].setName(name);
        paymentMethods[paymentMId].setCode(code);
    }
    else{
        console.log("//////////////EL METOOD DE PAGO NO FUE CREADO////////////////");
        console.log("Alguno de los campos esta vacio o es erroneo");
        console.log("FindPaymentCode:"+findPaymentCode(code));
    } 
}

function deletePaymentM(productId, isDeleted){
    product[productId].setIsDeleted(isDeleted);
}

module.exports={PaymentMethod,paymentMethods,createPaymentM,modifyPaymentM,findPaymentCode,deletePaymentM}