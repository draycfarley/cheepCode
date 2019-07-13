import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';
import AllQuestions from './AllQuestions';

class Home extends React.Component{
 

  render(){
    return (
        <div>
            <h1 className='text-center'> Welcome to CheepCode! </h1>
            <h2 className='text-center'><small>
                CheapCode is an open source project by <a href='https://www.linkedin.com/in/dray-c-f-555770125/'>Dray Farley </a>  
                to replicate LeetCode, but for just JavaScript.</small>
             </h2>
             <p className="d-flex justify-content-center">
                 This is a personal project built using React for the front-end and Node.js and Express for the back-end. 
                 The site lets you post and answer questions, as well as see who the best CheepCoders are. This was built for fun as well as to explore 
                 the difficulties and triumphs of building a full-stack app. I hope you enjoy!
             </p>
             <AllQuestions />
        </div>
      )
  }
}





export default Home