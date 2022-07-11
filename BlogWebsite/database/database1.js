const mongodb = require('mongodb');
const f = mongodb.MongoClient;
let database;

async function connect(){
    const client = await f.connect("mongodb://localhost:27017")
    database = client.db("blog");
};

function getdb(){
    if(!database){
        throw {message: "Database Empty!"}
    }
    return database;
};

module.exports = {
    connectToDatabase : connect,
    getdb : getdb
};
