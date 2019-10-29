const express = require('express')
const app = express()
const port= 3000
//config body-parser
const bodyParser= require("body-parser")

//membuat request post
app.post('/hello', function(req,res){
    const response={
        statusCode:200,
        error:"",
        message: "hello json",

    }
    res.json(response);
})

//commit lagi dengan nama membuat request post
app.get('/',(req,res)=> res.send("hello dunia"))
//config body-parser
app.use(bodyParser.urlencoded({extended:true})); //menangkap tipe request dalam bentu from encoded
app.use(bodyParser.json()); //mengkap url dalam bentuk json

app.listen(port, ()=> console.log('example app listening on port ${port}!'))