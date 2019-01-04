var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const _ = require('lodash');

var validator = function(email) {
   return email.indexOf('@') !== -1;
};


var UserSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true,
       trim: true,
       minlength: 1,
       unique: true,
       validate: {validator: (value) => {
           return (value.indexOf('@') !== -1 && value.match(/@/g).length === 1);
         },
         message: '{value} is not a valid email'
        }
   },
   password: {
       type: String,
       required: true,
       minlength: 6
   },
   tokens: [{
       access: {
           type: String,
           required: true
       },
       token: {
           type: String,
           required: true
       }
   }]
});

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    return _.pick(obj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    return new Promise((resolve, reject)=> {
        var user = this;
        var access = 'auth';
        var token = jwt.sign({_id : user._id, access}, 'abc123').toString();
        
        resolve({access, token});
    });
};



var User = mongoose.model('User', UserSchema);



module.exports = {User};