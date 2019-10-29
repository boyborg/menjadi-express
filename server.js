const express = require('express')
const app = express()
const port= 3000

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

app.listen(port, ()=> console.log('example app listening on port ${port}!'))