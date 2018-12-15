const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to conncet to Mongodb Server');
    }
    
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp')
    
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false   
    }, (err, result)=> {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        
        console.log(JSON.stringify(result.ops, null, 2));
    })
    
    db.collection('Users').insertOne({
        name : "Vasilis",
        age : 30,
        location : "Thessaloniki"
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        
        console.log(JSON.stringify(result.ops, null, 2));
    })
    
    
    client.close();
});