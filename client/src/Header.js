import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

class Header extends React.Component {


    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to='/' className='"navbar-brand"'>CheepCode</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/login' className='nav-link'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/postquestion' className='nav-link'>Submit A Question</Link>
                            </li>
                            {/* <li className="nav-item">
                               <Link to='/answer/:question_id'>Answer Questions</Link>
                            </li>
                            <li className="nav-item">
                            <Link to='/leaderboard'>Leaderboard</Link>
                            </li> */}
                        </ul>
                        
                    </div>
          
                    </nav>
                </header>
                )
            }
          }
     


export default Header