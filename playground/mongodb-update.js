const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to conncet to Mongodb Server');
    }
    
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp')
 
    
    
    db.collection('Users').findOneAndUpdate({
       name:'Myrto' 
    },
                                            {
        $set: {name:'Vasilis'},
        $inc: {age: -12}
    }, {returnNewDocument: true}
       
    ).then((res)=> {
        console.log(JSON.stringify(res, null, 2));
    });

    
       /* db.close();*/
});


