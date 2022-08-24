const { parseTwoDigitYear } = require('moment');
const { Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../database/db');

class OrderProduct extends Model {}

OrderProduct.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    //other model options go here
    timestamps: false ,
    sequelize,
    modelName: 'OrderProduct'
});

console.log("OrderProduct = sequelize.model.Product: ",OrderProduct === sequelize.models.OrderProduct); // true
module.exports = {OrderProduct} 