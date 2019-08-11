import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Page from './Page';
import NewAccount from './NewAccount';
import PostQuestion from "./PostQuestion";
import AnswerQuestionLanding from "./AnswerQuestionLanding";
import AnswerQuestion from "./AnswerQuestion";

class Main extends React.Component{
 

  render(){
    return (
        <Switch>
        <Route exact path='/' component={Page(Home)}/>
        <Route exact path='/login' component={Page(Login)}/>
        <Route exact path='/createaccount' component={Page(NewAccount)}/>
        <Route exact path='/postquestion' component={Page(PostQuestion)}/>
        <Route exact path='/answer' component={Page(AnswerQuestionLanding)}/>
        <Route path='/answer/:id' component={Page(AnswerQuestion)}/>
      </Switch>
      
      )
  }
}





export default Main