//panggil library express
var express=require('express');
//panggil lirary router
var router=express.Router();
//panggil model
const models=require('../models/index')

//GET user listing
//http://localhost:3000/todo/
router.get('/',function(req,res,next){
    res.send('hello todo');
});

//create
router.post('/create',async(req,res)=>{
    //do something here
    console.log(req.body)
    try{
        const todo=await models.todos.create(req.body)
        const response={
            statusCode:200,
            error:"",
            message:"create todo",
            content:req.body //lihat request yang dikirim
        }
        res.json(response);
    }catch(e){
        const response={
            statusCode:400,
            message:e.message,
            error:e
        }
        res.status(404).json(response);
    }
})

router.get('.list',async (req,res)=>{
    const todos=await models.todos.findAll({})
    const response={
        statusCode:200,
        error:"",
        message:"list todo",
        content:todos
    }
    res.json(response);
})
module.exports=router;

router.get('/detail/(:id)',async(req,res)=>{
    try{
        const todoId =req.params.id;
        const checkDataTodos=await models.todos.findAll({where:{id:todoId}})
        statusCode=200
        messageRes="detail todo";
        const response={
            statusCode:statusCode,
            message:messageRes,
            content:checkDataTodos
        }
        res.status(statusCode).json(response);
    }catch(e){
        console.log("error");

    }
})

router.put('/update/(:id)',async(req,res)=>{
    const todoId=req.params.id;
    let statusCode=200;
    let messageRes="todo has been updated";
    
    await models.todos.update(req.body,{
        where:{
            id:todoId
        }
    })

    const response={
        statusCode:statusCode,
        error:messageRes,
        content:req.body
    }
    req.status(statusCode).json(response);
})

router.get('/delete/(:id)',async (req,res)=>{
    const todoId=req.params.id
    let statusCode=200
    let messageRes="delete todo"
    await models.todos.destroy({
        where:{
            id:todoId
        }
    })

    const response={
        statusCode:statusCode,
        error:messageRes,
        message:messageRes,
        content:req.params.id
    }
    res.status(statusCode).json(response);
})