const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    course : {
        type: String,
        require : true,
    },
    age : {
        type : String,
        required : true,
    },
    duration : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    discount : {
        type : Number,
    },
    status : {
        type : Boolean,
        required : true,
    }
});

const Product  = mongoose.model("Product_data" , product_schema);
module.exports = Product;