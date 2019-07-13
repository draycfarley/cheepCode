import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

class QuestionCard extends React.Component{
 
  render(){
    return (
        <li className="list-group-item">{this.props.title} - Submissions: {this.props.submissions} </li>
      )
  }
}



export default QuestionCard