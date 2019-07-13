import React from 'react';
import './App.css'
import Main from './Main'
import Header from './Header'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';


class App extends React.Component{
 

  render(){
    return (
      <div>
      <Header />
      <Main />
    </div>
      )
  }
}





export default App