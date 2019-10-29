const express = require('express')
const app = express()
const port= 3000
//config body-parser
const bodyParser= require("body-parser")
app.use(bodyParser.urlencoded({extended:true})); //menangkap tipe request dalam bentu from encoded
app.use(bodyParser.json()); //mengkap url dalam bentuk json
//commit lagi dengan nama config body-parser

//membuat request post
//nama request first name,lastname
app.post('/hello', function(req,res){
    const response={
        statusCode:200,
        error:"",
        message: "hello jsonf",
        conntent:req.body

    }
    res.json(response);
})

//commit lagi dengan nama membuat request post
app.get('/',(req,res)=> res.send("hello dunia"))
//config body-parser


app.listen(port, ()=> console.log('example app listening on port ${port}!'))