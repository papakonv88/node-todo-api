const {objectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js'); 
const {User} =require('./../server/models/user.js');

User.findById('5c16656d3b55c1106cea264c').then((res)=> {
    if (res) {
        console.log('User: ', res.email);
    } else {
        console.log('User not found');
    }
}).catch(()=> {
    throw new Error('This is a not valid username!')
});

