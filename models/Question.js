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
    functionName: {
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
        text:{
            type: String,
            required:true
        },
        postedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        correct:{
            type: String,
            required:true
        }
    }],
    comments: [{
        text: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]

});

module.exports = Question = mongoose.model('Question', QuestionSchema);