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
})

app.post('/hello', function(req,res){
    const response={
        statusCode:200,
        error:"",
        message: "hello json",
        conntent:req.body

    }
    res.json(response);
})

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

//commit lagi dengan nama membuat request post
app.get('/',(req,res)=> res.send("hello dunia"))
//config body-parser


app.listen(port, ()=> console.log('example app listening on port ${port}!'))