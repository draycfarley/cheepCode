import React from 'react';
import './App.css'
import axios from "axios";
import { Link } from 'react-router-dom';

class PostQuestion extends React.Component{

  testCaseFields = () =>{
    var cases=[];
    for(var i = 0; i < this.state.numCases ; i++){
      cases.push (<input key={i} type="text" index={i} name="testCases" className="form-control" value={this.state.testCases[i]} onChange={this.handleChange} />)
    }
    return cases;
  }

  addTestCase (e){
    var cases=this.state.testCases;
    this.setState({numCases:this.state.numCases+1, testCases:cases.concat([""])});
    e.preventDefault();
  }

  removeTestCase(e){
    this.setState({numCases:this.state.numCases-1, testCases:this.state.testCases.slice(0, this.state.testCases.length-1)});
    e.preventDefault();
  }

  checkSession(token){
    axios.get('api/users/auth', {headers:{'x-auth-token': token}})
    .then(user => this.setState({loggedIn:true}))
    .catch(err => this.setState({loggedIn:false}));
    }

    clear(){
      this.setState({title: '', functionName:'', description:'', answer:'', testCases:[],
      posted:false, attempted:false, numCases:1})
    }
 
    constructor(props) {
        super(props);
        this.state = {title: '', functionName:'', description:'', answer:'', testCases:[], loggedIn:false,
         posted:false, attempted:false, numCases:1};
        this.checkSession=this.checkSession.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clear=this.clear.bind(this);
        this.testCaseFields = this.testCaseFields.bind(this);
        this.addTestCase= this.addTestCase.bind(this);
        this.removeTestCase= this.removeTestCase.bind(this);
      }

      componentWillMount(){
        var token = localStorage.getItem("token");
        this.checkSession(token);
      }
    
    handleChange(event) {
      if(this.state.loggedIn){
      const target = event.target;
      const value = target.value;
      const name = target.name;
      if(name!=="testCases")
      this.setState({
        [name]: value
      });
      else{
        var index=target.getAttribute("index");
        var cases=this.state.testCases;
        
         cases[index]=value;
        this.setState(
          {[name]: cases}
        );
        }
      }
  }
      
    
      handleSubmit(event) {
        axios.get('api/users/auth', {headers:{'x-auth-token': localStorage.getItem("token")}})
        .then(user => {
          var question = {
            title:this.state.title,
            description:this.state.description,
            functionName:this.state.functionName,
            answer:this.state.answer,
            testCases:this.state.testCases,
            author:user._id
          };
          axios.post('api/questions', question)
          .then(res => {
            this.setState({posted:true, attempted:true});
            }
            )
          .catch(err => this.setState({posted:false, attempted:true}))
        })
        .catch(err => this.setState({posted:false, attempted:true}));
        event.preventDefault();
      }

  render(){
    if(this.state.loggedIn && !this.state.posted)
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
          Function Name:
          <textarea name="functionName" className="form-control" value={this.state.functionName} onChange={this.handleChange} />
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
          <div>
          {this.testCaseFields()}</div>
          <button onClick={this.addTestCase} className="btn btn-success my-2">Add another</button>
          {this.state.numCases>1 && <button onClick={this.removeTestCase}className="btn btn-danger my-2">Remove</button>}
        </label>
        </div>
        {this.state.attempted && <div className="text-warning"> Question did not post </div>}
        <input type="submit" value="Submit" className="btn btn-dark" />
      </form>
      </div>
      )
      else if(this.state.loggedIn && this.state.posted) return(
        <div className="text-success"> Question posted!
        <div>
          <button onClick={this.clear} className="btn btn-dark">
            Post another
          </button>
          </div>
        </div>
      )
      else return(
        <div>
          <p className="text-danger"> You are not logged in</p>
          <Link to='/login' className="">Log in to get coding!</Link>
        </div>
      )
  }
}



export default PostQuestion