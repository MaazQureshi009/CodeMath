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
const workshop_model = require('./models/workshops');

//---------------------------------------------------------------Create_User-----------------------------------------------------------------------

app.post("/addUser" , async (req,res) => {
    const user = new user_model({
        image : req.body.image_url,
        full_name : req.body.name ,
        email : req.body.email ,
        password : req.body.password ,
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
    const Product = new product_model(
        {
            image :req.body.image_url,
            name : req.body.name,
            description : req.body.description,
            newprice : req.body.newprice,
            oldprice : req.body.oldprice,
            category : req.body.category,
            tags : req.body.tags,
            status : req.body.state,
        }
    );
    try{
        await Product.save();
    }catch(err){
        console.log(err);
    }
});

//------------------------------------------------------------Add_Workshop------------------------------------------------------------------------

app.post("/addWorkshop" , async (req , res) => {
    const Workshop = new workshop_model(
        {
            image :req.body.image_url,
            name : req.body.name,
            description : req.body.description,
            newprice : req.body.newprice,
            oldprice : req.body.oldprice,
        }
    );
    try{
        await Workshop.save();
        console.log("Success");
    }catch(err){
        console.log(err);
    }
});

//------------------------------------------------------------All_Featured_Products------------------------------------------------------------------------

app.get("/getAllFeaturedProducts" , ( req , res ) => {
    product_model.find({status: "ON" }, (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//-------------------------------------------------------------All_Products----------------------------------------------------------------------

app.get("/getAllProducts" , ( req , res ) => {
    product_model.find({ name : {$not : null} }, (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//--------------------------------------------------------------All_Users-------------------------------------------------------------------------

app.get("/login" , ( req , res ) => {
    user_model.find({name: {$ne : null} }, (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//-----------------------------------------------------------Select_Products----------------------------------------------------------------------

app.post("/getProducts" , (req , res) => {
    Selected_Product_Data = req.body.id;
} );

app.get("/getProducts" , (req , res) => {
        product_model.findOne({_id : Selected_Product_Data} ,(err , result) =>{
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

app.post("/updateProducts" , async (req , res) => {
    try{
        var newDescription = req.body.description;
        var newNewPrice = req.body.newprice;
        var newOldPrice = req.body.oldprice;
        var newCategory = req.body.category;
        var newTags = req.body.tags;
        var newStatus = req.body.state;
        if(newDescription != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {description : newDescription}});
        }
        if(newNewPrice != 0){
            await product_model.updateOne({_id : req.body.id} , {$set : {newprice : newNewPrice}});
        }
        if(newOldPrice != 0){
            await product_model.updateOne({_id : req.body.id} , {$set : {oldprice : newOldPrice}});
        }
        if(newCategory != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {category : newCategory}});
        }
        if(newTags != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {tags : newTags}});
        }
        if(newStatus != null){await product_model.updateOne({_id : req.body.id} , {$set : {status : newStatus}});}
    }catch(err){
        console.log(err);
    } 
} );

//--------------------------------------------------------------Update_Workshop-------------------------------------------------------------------

app.post("/UpdateWorkshops" , async (req , res) => {
    try{
        var newDescription = req.body.description;
        var newNewPrice = req.body.newprice;
        var newOldPrice = req.body.oldprice;
        if(newDescription != null){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {description : newDescription}});
        }
        if(newNewPrice != 0){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {newprice : newNewPrice}});
        }
        if(newOldPrice != 0){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {oldprice : newOldPrice}});
        }
        if(newStatus != null){await workshop_model.updateOne({_id : req.body.id} , {$set : {status : newStatus}});}
    }catch(err){
        console.log(err);
    } 
} );

//----------------------------------------------------------------------------Delete_Product--------------------------------------------------------------------------

app.post("/DeleteProduct" , async (req , res) => {
    await product_model.deleteOne({_id : req.body.id});
})

//---------------------------------------------------------------------------Delete_Workshop-------------------------------------------------------

app.post("/DeleteWorkshop" , async (req , res) => {
    await workshop_model.deleteOne({_id : req.body.id});
})

app.listen(3001, () => {
    console.log("Server On");
} );