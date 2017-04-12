import React, { PropTypes, Component } from 'react';

class Majuscule extends Component {
	constructor(props) {
    super(props);
    this.state = {
      input: '',
      goals: [],
      achievements: []
    }
  }

  handleClick = (text) => {
    
  }

  render() {
    return (

          <button onClick={this.handleClick} className="btn btn-primary" /> 
    	);

	}
}	

module.exports = GoalHeader;

