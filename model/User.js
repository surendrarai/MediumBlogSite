const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        token: String,
        image: String,
        hash_password: {
            type: String
          },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)
UserSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)        
    }
    return this.save()
}
UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)        
}

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
module.exports = mongoose.model('User', UserSchema)