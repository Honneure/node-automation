import React, { PropTypes, Component } from 'react';
import logo from './logo.svg';
import './style.css';
import { Link } from 'react-router';

class App extends Component {
  
  
  
  
  render() {
    const { className, ...props } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Hello theeeeeree! 
        </p>
        <Link to="/landing">Go there</Link>
        <br /><br />
        <a href="/about">About us ?</a>
        <br /><br />
        <a href="/smartActs">Where your Life shines</a>
        <br /><br />
        <a href="/ocr">OCR bith</a>
      </div>
    );
  }
}

export default App;
