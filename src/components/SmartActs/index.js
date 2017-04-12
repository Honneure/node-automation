import React, { PropTypes, Component } from 'react';
import './style.css';
import ActDo from './comps/todo.js';
import GoalHeader from './comps/goalheader.js';
// import Square from './comps/newgoal.js'; svg

class ToDoux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      actdoes: [],
      majuscule: false
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleClick = () => {
    if (this.state.input !== '') {
    this.setState({
      actdoes: [...this.state.actdoes, this.state.input]
    })
   }
  }

  allUp = (arr) => {
      return arr.map((el) => {
        return el.toUpperCase();
      });
    }

  allDown = (arr) => {
      return arr.map((el) => {
        return el.toLowerCase();
      });
    }

  changeSize = () => {

    this.setState({
      majuscule: !this.state.majuscule,
      actdoes: !this.state.majuscule ? this.allUp(this.state.actdoes) : this.allDown(this.state.actdoes)
    })
  }

  render() {
    return (
      <div className="row">
        <div className="container text-center">
          <GoalHeader />
          <input onChange={this.handleChange} value={this.state.input} className="form-control" type="text" placeholder="Next Dream" />
          <button onClick={this.handleClick} className="btn btn-primary">NEXT GOAL</button>  
          <h2>You're gonna to kill it ***** !<button onClick={this.changeSize} className="btn btn-secondary">Sizing</button></h2>
          <ActDo actdoes={this.state.actdoes}/> 
        </div>
      </div>
      );
  }

}
module.exports = ToDoux;
