import React from 'react';
import './App.css'
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
                            <li className="nav-item">
                               <Link className="nav-link" to='/answer/'>Answer Questions</Link>
                            </li>
                        </ul>
                        
                    </div>
          
                    </nav>
                </header>
                )
            }
          }
     


export default Header