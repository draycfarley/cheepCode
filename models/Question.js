const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const QuestionSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    testCases:[{
        type: String,
        required: true
    }],
    submissions:[{
        type: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        correct: Boolean
    }],
    comments: [{
        text: String,
        postedBy: User.schema
    }]

});

module.exports = Question = mongoose.model('Question', QuestionSchema);