var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

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
        var user = this; /*instance*/
        var access = 'auth';
        var token = jwt.sign({_id : user._id, access}, 'abc123').toString();
        
        resolve({access, token});
    });
};


UserSchema.statics.findByToken = function (token) {
    
    var User = this; /*model*/
    var decoded;
    
    try {
       decoded = jwt.verify(token, 'abc123'); 
    } catch (e) {
        
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    
};

UserSchema.pre('save', function (next) {
    var user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
               if (err) {
                   return err;
               }
                user.password = hash;
                next();
            });
        });
        
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);



module.exports = {User};