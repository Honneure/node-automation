import React, { PropTypes, Component } from 'react';

class ActDo extends Component {
	constructor(props) {
		super(props);

	}

	actPop = (actdoes) => {
		return actdoes.map((el, id) => {
				return <li id={id}>GET {el} DONE </li>
		});
	}

	render() {
		return (
				<div>
					<ul>{this.actPop(this.props.actdoes)}</ul>
				</div>
			);
	}

}

module.exports = ActDo;