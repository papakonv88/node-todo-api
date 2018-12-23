var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req, res)=> {
   Todo.find({}).then((todos)=> {
       res.send({todos});
   }, (e)=> {
       res.status(400).send(e);
   });
});

app.get('/todos/:id', (req, res)=> {
    let id = req.params.id;
    
    if (ObjectID.isValid(id) === false) {
        res.status(404).end();
    }
    
    User.findById(id).then((doc)=> {
        res.send(`The user with username ${doc.email} found`)
    }, ()=> {
        res.status(404).send();
    }).catch(()=> {
        res.status(400).send();
    });
    
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
