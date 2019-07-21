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
import LeaderBoard from "./LeaderBoard";

class Main extends React.Component{
 

  render(){
    return (
        <Switch>
        <Route exact path='/' component={Page(Home)}/>
        <Route exact path='/login' component={Page(Login)}/>
        <Route exact path='/createaccount' component={Page(NewAccount)}/>
        <Route exact path='/postquestion' component={Page(PostQuestion)}/>
        <Route path='/answer' component={Page(AnswerQuestionLanding)}/>
        <Route exact path ='/leaderboard' component={Page(LeaderBoard)}/>
      </Switch>
      
      )
  }
}





export default Main