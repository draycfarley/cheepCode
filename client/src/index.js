import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Route} from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
), document.getElementById('root'))


