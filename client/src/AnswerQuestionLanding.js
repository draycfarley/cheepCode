import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

// Need to create a component for actually answering a question

class AnswerQuestionLanding extends React.Component {


    render() {
        return (
            
                <div>
                    <h1>Answer A question</h1>
                    <button>Choose a random question</button>
                </div>
                )
            }
          }
     


export default AnswerQuestionLanding