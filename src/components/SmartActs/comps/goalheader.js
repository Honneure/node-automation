import React, { PropTypes, Component } from 'react';

class GoalHeader extends Component {
	constructor(props) {
    super(props);
    this.state = {
      heading: '',
      task: '',
      goals: [
      {
      	heading: 'Nice',
      	tasks: ['cool', 'Nice'],
      	completion: 0
      },
      {
      	heading: 'Cool',
      	tasks: ['kooool', 'sport'],
      	completion: 1
      }
      ],
      achievements: []
    }
  }

  handleChange = (event) => {
    this.setState({
      heading: event.target.value
    })
  }

  handleChangeTask = (event) => {
  	this.setState({
  		task: event.target.value
  	})
  }

  isThereTitle = () => {
  	let title = this.state.heading.toLowerCase();
  	let arr = this.state.goals;
  	let count = 0;

  	arr.forEach((el) => {
  		let heading = el.heading.toLowerCase();
  		if(heading === title) {
  			count++ ;
  		} 
  	});

  	let res = count === 0 ? false : true; 
  	return res;
  }

  handleClick = () => {
  	let title = this.state.heading;
  	let task = this.state.task;

  	if (title ==='') {
  		alert('The category is empty -:)');
  	} 
  	else if (!this.isThereTitle()) {
	  this.setState({
	  	goals: [...this.state.goals, {heading: title, tasks: [task]}]
	  })
  	} 
  	else {
  		alert('The category ' + title + ' already exists !');
  	}
  }

  task = (arr) => {
  	return arr.map((element, i) => {
		return <p key={i}>{element}</p>
  	})
  }

  goals = (goals) => {
  	return goals.map((el, i) => {
  		return <div>
  			   <h2 key={i}>{el.heading}</h2>
  			   {this.task(el.tasks)}
  			   </div>
  	})
  }

  render() {
    return (

    			<div>
	    			<h1>What's your goals ?</h1>
	    			<input onChange={this.handleChange} value={this.state.heading} className="form-control" type="text" placeholder="New Goal" />
	    			<input onChange={this.handleChangeTask} value={this.state.task} className="form-control" type="text" placeholder="New Task" />
	    			<button onClick={this.handleClick} className="btn btn-primary">One More!</button>
	    			<div>{this.goals(this.state.goals)}</div>
    			</div>

    	);

	}
}	

module.exports = GoalHeader;

