const express = require('express');

const router = express.Router();

const Question = require('../models/Question');
const auth= require('../middleware/auth');

function evaluateUserInput(answer, functionName, testCases, userInput){
    for(var i=0; i<testCases.length; i++){
        var testCase=testCases[i];
        var eval1=eval((answer+" "+functionName+"("+testCase+");"));
        var eval2=eval((userInput+" "+functionName+"("+testCase+");"));
        if(eval1!= eval2)
         return false;
        }
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

//@route GET api/questions
//@desc get all questions
//@access Public
router.get('/', (req, res) =>{
    console.log("get");
    Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({success:err}))
});


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
    console.log("submit");
    Question.findById(req.body.question_id)
    .then(question => {
        var sub=createSubmission(question, req.body.user_id, req.body.answer);
        question.submissions=question.submissions.concat(sub);
        question.save().then(question => res.json({correct:sub.correctness}));
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

