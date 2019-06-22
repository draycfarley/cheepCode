const express = require('express');
const router = express.Router();
const Bcrypt = require("bcrypt");

const User = require('../models/User');

//@route POST api/users
//@desc create a user
//@access Public
router.post('/', (req, res) =>{
    req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        questions: [],
        score: 0
    });

    newUser.save().then(user => res.json(user));
});

//@route GET api/users/users:id
//@desc get a user
//@access Public
router.get('/:id', (req, res) =>{
    User.findById(req.params.id)
    .then(user => res.json(
        {
            _id: user._id,
            username:user.username,
            score: user.score
        }
    ))
    .catch(err => res.status(404).json({success:false}))
});

//@route POST api/users/login
//@desc validate a user's credentials
//@access Public
router.post('/login', (req, res) =>{
    User.findOne({ username: req.body.username }).exec()
    .then(
        user =>{
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({success:false});
        }
        return res.json({success:true});
        }
    )
    .catch(err => res.status(404).json({success:false}))
});

//@route DELETE api/users/users:id
//@desc delete a user
//@access Public
router.delete('/:id', (req, res) =>{
    User.findById(req.params.id)
    .then(user => user.remove()
    .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success:false}))
});

module.exports = router;