const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp',{useNewUrlParser: true});

module.export = {mongoose};


/*process.ENV.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'*/