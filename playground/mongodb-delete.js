const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to conncet to Mongodb Server');
    }
    
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp')
 
    
/* db.collection('Users').deleteMany({name:"Vasilis"}).then((res)=> {
     console.log(res);
 });*/
        
    
    db.collection('Users').deleteOne({name:"Giannis"}).then((res)=> {
    console.log(res);
});
    
    
       /* db.close();*/
});


