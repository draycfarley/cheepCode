const express = require('express');

const router = express.Router();

const Question = require('../models/Question');
const auth= require('../middleware/auth');

function evaluateUserInput(answer, functionName, testCases, userInput){
    testCases.forEach(testCase => {
        if(eval(answer+" "+functionName+"("+testCase+");") !== eval(userInput+" "+functionName+"("+testCase+");")) return false;
    });
    return true;
}

function createSubmission(question, user, userInput){
    correctness=evaluateUserInput(question.answer, question.functionName, question.testCases, userInput);
    const submission= {
        text:userInput,
        postedBy:user,
        correct:correctness
    };
    console.log(submission);
    return submission;
}

//@route POST api/questions
//@desc create a question
//@access Public
router.post('/', (req, res) =>{
    const newQuestion = new Question({
        title : req.body.title,
        description : req.body.description,
        functionName:req.body.functionName,
        answer : req.body.answer,
        author : req.body.author,
        testCases : req.body.testCases,
        submissions : [],
        comments : []
    });

    newQuestion.save().then(question => res.json(question)).catch(err => console.log(err));
});

//@route GET api/questions
//@desc get all questions
//@access Public
router.get('/', (req, res) =>{
    Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({success:false}))
});

//@route GET api/questions/questions:id
//@desc get a question
//@access Public
router.get('/:id', (req, res) =>{
    Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(404).json({success:false}))
});

//@route DELETE api/questions/questions:id
//@desc delete a question
//@access Public
router.delete('/:id', (req, res) =>{
    Question.findById(req.params.id)
    .then(question => question.remove()
    .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success:false}))
});

//@route POST api/questions/submit
//@desc submit an answer to a question
//@access Public
router.post('/submit', (req, res) =>{
    Question.findById(req.body.question_id)
    .then(question => {
        question.submissions=question.submissions.concat(createSubmission(question, req.body.user_id, req.body.answer));
        question.save().then(question => res.json(question));
    })
    .catch(err => res.status(404).json({success:false}));
});

//@route POST api/questions/comments
//@desc create a comment for a question
//@access Public
router.post('/comments', (req, res) =>{
    Question.findById(req.body.question_id)
    .then(question => {
        question.comments=question.comments.concat({
            text:req.body.text,
            postedBy:req.body.user_id
        });
        question.save().then(question => res.json(question));
    })
    .catch(err => res.status(404).json({success:false}));    
});

//@route DELETE api/questions/comments
//@desc delete a comment for a question
//@access Public
router.post('/comment', (req, res) =>{
    Question.findById(req.body.question_id)
    .then(question => {
        console.log("ye");
        question.comments=question.comments.filter(comment => comment.text!==req.body.text && comment.postedBy!==req.body.user_id);
        question.save().then(question => res.json(question));
    })
    .catch(err => res.status(404).json({success:false}));    
});




module.exports = router;

