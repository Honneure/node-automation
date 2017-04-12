'use strict'

var state = {
      heading: 'cool',
      task: 'ok',
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


  const isThereTitle = () => {
  	let title = state.heading.toLowerCase();
  	let arr = state.goals;
  	let count = 0;
  	arr.forEach((el) => {
  		let heading = el.heading.toLowerCase();
  		console.log(heading);
  		if(heading === title) {
  			count++ ;
  		} 
  	});
  	let res = count === 0 ? false : true; 
  	return res;
  }

  test('isThereTitle', () => {
  	expect(isThereTitle()).toBe(true)
  })

