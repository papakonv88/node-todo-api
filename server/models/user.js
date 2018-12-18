var mongoose = require('mongoose');

var validator = function(email) {
   return email.indexOf('@') !== -1;
};


var User = mongoose.model('User', {
   email: {
       type: String,
       required: true,
       trim: true,
       minlength: 1,
       validate: validator
   } 
});


module.exports = {User};