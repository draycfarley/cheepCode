const express = require('express');

const router = express.Router();

const Question = require('../models/Question');

// TODO
function createSubmission(question, user, answer){
    submission=null;
    question.submissions = quest.submissions.push(submission);
    question.save().catch( err => res.status(404).json({success:false}));
    return submission;
}

//@route POST api/questions
//@desc create a question
//@access Public
router.post('/', (req, res) =>{
    const newQuestion = new Question({
        title : req.body.title,
        description : req.body.description,
        answer : req.body.answer,
        author : req.body.author,
        testCases : req.body.testCases,
        submissions : [],
        comments : []
    });

    newQuestion.save().then(question => res.json(question));
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
    Question.findById(req.body.id)
    .then(question =>
        createSubmission(question, req.body.answer, req.body.user))
    .catch(err => res.status(404).json({success:false}))
});

module.exports = router;