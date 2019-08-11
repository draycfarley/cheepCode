import React from 'react';
import './App.css'
import axios from 'axios';


class AnswerQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: "", description: '', answer: '', loggedIn: false, submitted: false, correct: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkSession = this.checkSession.bind(this);

    }

    checkSession(token) {
        axios.get('http://localhost:3000/api/users/auth', { headers: { 'x-auth-token': token } })
            .then(user => {
                this.setState(
                    { loggedIn: true })
            }
            )
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.checkSession(localStorage.getItem("token"));
        axios.get(`http://localhost:3000/api/questions/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description
                })
            })
            .catch(err => console.log(err))
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
        axios.get('http://localhost:3000/api/users/auth', { headers: { 'x-auth-token': localStorage.getItem("token") } })
            .then(user => {
                axios.post('http://localhost:3000/api/questions/submit', {user_id:user.data._id, answer:this.state.answer, question_id:this.props.match.params.id})
                .then(res=>this.setState({correct:res.data.correct, submitted: true}))
                .catch(err => this.setState({submitted:true, correct:false}))
            .catch(err => console.log(err));
        
            });
            event.preventDefault();
        }



    render() {
        if (this.state.loggedIn)
            return (

                <div>
                    <h1>{this.state.title}</h1>
                    <p>
                        {this.state.description}
                    </p>
                    <SubmissionResult {...this.state}/>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div>
                            <label>
                                Answer:
                    <textarea type="text" name="answer" className="form-control" value={this.state.answer} onChange={this.handleChange} />
                            </label>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        else return (
            <div> Please log in to answer questions!</div>
        )

    }
}

class SubmissionResult extends React.Component {
    render(){
        if(this.props.submitted){
            if(this.props.correct) return <div className="text-success" >Correct!</div>;
            else return <div className="text-danger" >Wrong!</div>
        }

        return <div></div>;
    }
}


export default AnswerQuestion