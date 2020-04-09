// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb+srv://shyam:pTwkDoOWabxLcFRx@cluster0-lptxg.mongodb.net/task-app?retryWrites=true&w=majority'
const database = 'task-app'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect')
    }
     const db =  client.db(database);
     db.collection('users').insertOne({
         name:'shyam',
         age:21
     })
})