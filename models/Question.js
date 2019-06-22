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
    testCases:[{
        type: String,
        required: true
    }],
    submission:[{
        type: String,
        postedBy: User.schema,
        correct: Boolean
    }],
    comments: [{
        text: String,
        postedBy: User.schema
    }]

});

module.exports = Question = mongoose.model('Question', QuestionSchema);