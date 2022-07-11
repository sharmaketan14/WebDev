const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
    let client = await MongoClient.connect(
        'mongodb://localhost:27017'
    );
    database = client.db('todo')
}

function getDb(){
    if(!database){
        throw {message: 'Could not connect to database'}
    }
    return database;
}

module.exports = {
    connectToDatabase : connectToDatabase,
    getDb : getDb
};
