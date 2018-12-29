const mongoose = require('mongoose');
 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, {useNewUrlParser: true});

module.export = {mongoose};

