const mongodb = require('mongodb');
const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/ToDoWebAPI/data/database.js');

class Todo{
    constructor(text,id){
        this.text = text;
        this.id = id;
    }

    static async fetch(){
        const todo = await db.getDb().collection('todo').find().toArray();
        return todo;
    }

    async save(){
        const todoId = mongodb.ObjectId(this.id)
        if(this.id){
            await db.getDb().collection('todo').updateOne({_id:todoId},{$set :{text:this.text}})
        }
        else{
            await db.getDb().collection('todo').insertOne({text:this.text})
        }
    }

    async delete(){
        const todoId = mongodb.ObjectId(this.id)
        if(!this.id){
            throw new Error ("Couldn't Delete : ID not provided")
        }
        await db.getDb().collection('todo').deleteOne({_id:todoId})
    }
}

module.exports = Todo