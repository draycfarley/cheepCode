import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

class PostQuestion extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {title: '', description:'', answer:'', testCases:[]};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        alert('A name was submitted: ' + this.state.description);
        event.preventDefault();
      }

  render(){
    return (
        <div>
        <h1>Post a Question</h1>
      <form className="form-group" onSubmit={this.handleSubmit}>
        <div>
        <label>
          Title:
          <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Description:
          <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange} rows="8" cols="25" />
        </label>
        </div>
        <div>
        <label>
          Answer:
          <textarea name="answer" className="form-control" value={this.state.answer} onChange={this.handleChange} rows="8" cols="25" />
        </label>
        </div>
        <div>
        <label>
          Test Cases:
          <input type="text" name="testCases" className="form-control" value={this.state.testCases} onChange={this.handleChange} />
        </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      </div>
      )
  }
}



export default PostQuestion