/** */
const User = require('../model/User');
const Story = require('../model/Story');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = {
    addUser: (req, res, next) => {
        var newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        newUser.save(function(err, user) {
            if (err) {
              return res.status(400).send({
                message: err
              });
            } else {
              user.hash_password = undefined;
              return res.json(user);
            }
          });
    },
    getUser: (req, res, next) => {
        User.findById({_id: req.params.id}).then
        /*populate('following').exec*/((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_)
                })
                return Story.find({'author': req.params.id}).then((__stories)=> {
                    return res.json({ user: _user, _stories: __stories })
                })
            })
        }).catch((err)=>console.log(err))
    },
    loginUser: (req, res, next) => {
        User.findOne({
            email: req.body.email
          }, function(err, user) {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.password)) {
              return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            }
            return res.json({ token: jwt.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs') });
          });
}
}