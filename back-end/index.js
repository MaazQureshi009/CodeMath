const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Rishichaary:password%4012345@codemath.lfw6dor.mongodb.net/main_data?retryWrites=true&w=majority" , 
{
    useNewUrlParser:true,
});

const user_model = require('./models/data');
const product_model = require('./models/data1');

//---------------------------------------------------------------Create_User-----------------------------------------------------------------------

app.post("/addUser" , async (req,res) => {
    const user = new user_model({
        image : req.body.image_url,
        full_name : req.body.name ,
        email : req.body.email ,
        usd_code : req.body.usd ,
        mobile_no : req.body.mobile ,
        gender : req.body.gender ,
        age : req.body.age ,
        dob : req.body.dob ,
        "address.house_no" : req.body.house ,
        "address.street" : req.body.street ,
        "address.area" : req.body.area ,
        "address.city" : req.body.city ,
        "address.state" : req.body.state ,
        "address.pin_code" : req.body.pincode ,
    });
    try{
        await user.save();
        console.log("Success");
    }catch(err){
        console.log(err);
    }
});

//---------------------------------------------------------------Create_Product--------------------------------------------------------------------

app.post("/addProduct" , async (req , res) => {
    var Status = null;
    (req.body.state == "True" )? Status = true : Status = false;
    console.log(req.body);
    console.log(Status);
    const Product = new product_model(
        {
            image :req.body.image_url,
            name : req.body.name,
            description : req.body.description,
            type : req.body.type,
            price : req.body.price,
            discount : req.body.discount,
            course : req.body.course,
            age : req.body.age,
            duration : req.body.duration,
            status : Status,
        }
    );
    try{
        await Product.save();
        console.log("Success");
    }catch(err){
        console.log(err);
    }
});

//-----------------------------------------------------------Select_Products----------------------------------------------------------------------

app.post("/getProducts" , (req , res) => {
    Selected_Product_Data = req.body.name;
} )

app.get("/getProducts" , (req , res) => {
        product_model.findOne({name : Selected_Product_Data} ,(err , result) =>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        });
    }
);

//---------------------------------------------------------------Select_Users----------------------------------------------------------------------

app.post("/getUsers" , (req , res) => {
    const Selected_User_Data = req.body.name;
} );

app.get("/getUsers" , (req , res) => {
    user_model.findOne({full_name : Selected_User_Data} , (err , result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } );
});

//--------------------------------------------------------------Update_Product-------------------------------------------------------------------

app.put("/UpdateProducts" , async (req , res) => {
    try{
        var newDescription = req.body.description;
        var newPrice = req.body.price;
        var newDiscount = req.body.discount;
        var newStatus = null;
        (req.body.status == "True" && req.body.status != null)? newStatus = true: newStatus = false;
        if(newDescription != null){
            await product_model.updateOne({name : req.body.name} , {$set : {description : newDescription}});
        }
        if(newPrice != 0){
            await product_model.updateOne({name : req.body.name} , {$set : {price : newPrice}});
        }
        if(newDiscount != null){
            await product_model.updateOne({name : req.body.name} , {$set : {discount : parseInt(newDiscount)}});
        }
        if(newStatus != null){await product_model.updateOne({name : req.body.name} , {$set : {status : newStatus}});}
    }catch(err){
        console.log(err);
    } 
} );

//----------------------------------------------------------------------------Delete_Product--------------------------------------------------------------------------

app.delete("/DeleteProduct/:id" , async (req , res) => {
    const id  = req.params.id;

    await product_model.deleteOne({_id : id});

    res.send("Deleted");
})

app.listen(3001, () => {
    console.log("Server On");
} );