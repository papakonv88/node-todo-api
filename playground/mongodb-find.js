const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to conncet to Mongodb Server');
    }
    
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp')
 
    
 
   /* 
    
    db.collection("Todos").find().toArray().then(function (doc) {
        console.log(JSON.stringify(doc, null, 2));
    }, function (err) {
        console.log('failed!');
    });
        */
    
    
    db.collection('Users').find({name:'Vasilis'}).toArray().then((doc)=> {
       console.log(JSON.stringify(doc, null, 2)); 
    }, (err)=> {
        throw new Error('failed!')
    });
        
       /* db.close();*/
});