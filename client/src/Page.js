import React from 'react';
import './App.css'
import PropTypes from 'prop-types'; // ES6
import { throws } from 'assert';
import ReactDOM from 'react-dom';

function Page(WrappedComponent) {
  
    return class extends React.Component {
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return (
            
            <div className="container bg-light rounded mt-4 p-5">
                <WrappedComponent {...this.props} />
             </div>
            )
      }
    }
  }


export default Page