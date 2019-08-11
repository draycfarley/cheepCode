import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';
import QuestionCard from './QuestionCard';
import axios from 'axios';

class AllQuestions extends React.Component{
 
    constructor(props){
        super(props);
        this.state={questions:[]};
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount() {
      
        axios.get('http://localhost:3000/api/questions/')
        .then(res => {
          this.setState({ questions: res.data});
        }).catch(err =>
            console.log(err));
      }
      
      

  render(){
      var questions= this.state.questions.sort(compare);
    return (
        <div>
            <h3 className="text-center d-block">Most Popular Questions</h3>
            <ul>
            {
        questions.map(function(question) {
          return <QuestionCard key={question._id} id={question._id} title={question.title} submissions={question.submissions.length}/>
        })
       }
            </ul>
        </div>
      )
  }
}

function compare(q1, q2){
    return q2.submissions.length - q1.submissions.length;
  }




export default AllQuestions