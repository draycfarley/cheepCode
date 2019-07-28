import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';
import axios from 'axios';


import { Link } from 'react-router-dom';



class Login extends React.Component{

 
  constructor(props) {
    super(props);
    this.state = {username: '', password:"", loggedIn:false, attempted:false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSession = this.checkSession.bind(this);
  }

  componentWillMount(){
    var token = localStorage.getItem("token");
    this.checkSession(token);
  }

  checkSession(token){
    axios.get('api/users/auth', {headers:{'x-auth-token': token}})
    .then(user => this.setState({loggedIn:true}))
    .catch(err => this.setState({loggedIn:false}));
    }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    axios.post('api/users/login', 
    {
      "username":this.state.username,
      "password":this.state.password
    })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          this.checkSession(res.data.token);
        }).catch(err =>
            this.setState({attempted:true}));
    event.preventDefault();
  }

  render() {
    if(this.state.loggedIn===false) return (
      <div>
        <h1>Login</h1>
        <FailMessage {...this.state}/>
      <form className="form-group" onSubmit={this.handleSubmit}>
        <div>
        <label>
          Username:
          <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Password:
          <input type="text" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
        </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <Link to='/createaccount' className="">Don't have an account? Sign up today!</Link>
      </div>
    );
    else return (
      <div>
        <p className="text-success">Logged in!</p>
        <button className="btn btn-info" onClick={()=>{
          this.setState({loggedIn:false, attempted:false})
          localStorage.setItem("token", null)
        }}>
          Log out
        </button>
      </div>
    )
  }

}


class FailMessage extends React.Component{

  render(){
    if(this.props.attempted===true) return (
      <div className="text-danger">Invalid crendentials!</div>
    );
    else return <div></div>;
  }

}


export default Login