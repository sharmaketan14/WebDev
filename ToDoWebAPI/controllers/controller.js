const res = require('express/lib/response');
const mongodb = require('mongodb');
const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/ToDoWebAPI/data/database.js');
const Todo = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/ToDoWebAPI/models/models.js');

async function getAllTodo(req, res, next) {
    const listtodo = await Todo.fetch();

    res.render('form',{list : listtodo})
}

async function insertTodo(req, res, next) {
    const text1 = req.body.text;
    //let insertedID;
    console.log(text1)
    const todo = new Todo(text1,null);
    const result = await todo.save();
    //insertedID = result.insertedID;
    //insertedID.toStringify()
    //todo.id = insertedID

    res.json({
        message: "Task Added",
        text : text1
    })

}

async function updateTodo(req, res, next){
    const text = req.body.text
    const todoId = req.params.id;
    const todo = new Todo(text,todoId)
    await todo.save();

    res.json({
        message : 'Updation Done!'
    })
}

async function deleteTodo(req, res, next){
    const todoId = req.params.id;
    const todo = new Todo(null,todoId)
    await todo.delete();

    res.json({
        message : 'Deletion Done!'
    })
}

module.exports = {
    getAllTodo: getAllTodo,
    insertTodo: insertTodo,
    updateTodo : updateTodo,
    deleteTodo : deleteTodo
}