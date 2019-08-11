import React from 'react';
import './App.css'
import {Link} from 'react-router-dom';

class QuestionCard extends React.Component{
 
  render(){
    return (
        <li className="list-group-item"><Link to={"/answer/"+this.props.id}>{this.props.title} - Submissions: {this.props.submissions}</Link> </li>
      )
  }
}



export default QuestionCard