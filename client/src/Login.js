import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

class Login extends React.Component{
 
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
      <form className="form-group" onSubmit={this.handleSubmit}>
        <div>
        <label>
          Username:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Password:
          <input type="text" className="form-control" value={this.state.password} onChange={this.handleChange} />
        </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <Link to='/createaccount' className="">Don't have an account? Sign up today!</Link>
      </div>
    );
  }

}





export default Login