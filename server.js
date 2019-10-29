const express = require('express')
const app = express()
const port= 3000
//config body-parser
const bodyParser= require("body-parser")
app.use(bodyParser.urlencoded({extended:true})); //menangkap tipe request dalam bentu from encoded
app.use(bodyParser.json()); //mengkap url dalam bentuk json
//commit lagi dengan nama config body-parser

const mongooseServer =require('./mongomodel/mongoConfig')
const personModel=mongooseServer.model("person",{
    firstName:String,
    lastName:String
});

//commit -m "Memanggil mongoconfig dan membuat model person model sebagai penamping collection person"

//membuat request post
//nama request first name,lastname
app.post('/profile/create', async(req,res) => {
    // do something here
    console.log(req.body)
    //validasi pada create
    if(!req.body.firstName){
        res.status(400).json({
            statusCode:400,
            error:"firstName parameter is required",
            message:"firstName parameter is required"
        });
    }
    else if(!req.body.lastName){
        res.status(400).json({
            statusCode:400,
            error:"lasttName parameter is required",
            message:"lasttName parameter is required"
        });
    }
    else{
        const insert={
            firstName:req.body.firstName,
            lastName:req.body.lastName
    
        }
        var person = new personModel(insert);
        var result= await person.save();
        const response={
            statusCode:200,
            error:"",
            message:"create person",
            content:result
        }
        res.json(response)
    }
});          

app.post('/hello', function(req,res){
    const response={
        statusCode:200,
        error:"",
        message: "hello json",
        conntent:req.body

    }
    res.json(response);
}
);

//menampilkan semua data
//url http://localhost:3000/profile/list
app.get('/profile/list',async(req,res)=>{
    //something here
    var person = await personModel.find().exec();
    const response={
        statusCode:200,
        error:"",
        message:"list person",
        content:person
    }
    res.json(response);
})

app.get('/profile/detail/(:id)', async(req,res)=>{
    let statusCode=200
    let message=""
    let person= await personModel.findById(req.params.id).exec();
    const response={
        statusCode:200,
        error:"",
        message:message,
        content:person
    }
    res.status(statusCode).json(response);
})

//update data profile menggunakan metode put
//url :http://localhost:3000/profile/update/idmongo
app.put('/profile/update/(:id)',async(req,res) =>{
    let statusCode=200
    let message="update person"
    let person = await personModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const response={
        statusCode:200,
        error:message,
        message:message,
        content:person,
        body:req.body
    }
    res.status(statusCode).json(response);
})

//delete data method get
//url :http://localhost:3000/profile/delete/id
app.get('/profile/delete/(:id)',async(req,res) =>{
    //check data objek id valid; jika valid lakukan eksekusi delete
    const checkId=mongooseServer.Types.ObjectId.isValid(req.params.id);
    let statusCode=200
    let message="delete person"
    if(checkId){
        var person=await personModel.findByIdAndDelete(req.params.id).exec();
    }else{
        statusCode=404;
        message="object id invalid";
        var person=null;
    }
    
    const response={
        statusCode:200,
        error:message,
        message:message,
        content:person
    }
    res.status(statusCode).json(response);
})


//commit lagi dengan nama membuat request post
app.get('/',(req,res)=> res.send("hello dunia"))
//config body-parser


app.listen(port, ()=> console.log('example app listening on port ${port}!'))