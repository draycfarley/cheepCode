const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('../Question');

const UserSchema = new Schema ({
    username:{
        type: String,
        required:true
    },
    password:{},
    questions:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

module.exports = User= mongoose.model('user', UserSchema);