/* document.querySelector finds the first element matching a CSS selector and when we say #task-form like in css
we mean the element with id task-form with something new which is const which mean the name will always point
to the same element*/ 
const form = document.querySelector('#task-form');         // finds the <form> by its id (task-form)
const input = document.querySelector('#task-input');       // finds the text box
const feedback = document.querySelector('#feedback');      // finds the <p> that hold the error messages that we made color red
const list = document.querySelector('#task-list');         // finds the empty <ul> which i mentioned that has only 1 <li>
const counter = document.querySelector('#counter');        // finds the <p> that has the counter "0 of 0 done" which i said js will handle it 
const emptyState = document.querySelector('#empty-state'); // finds the <p> that has "No tasks yet" that appears when there is nothing and disappear later 
let tasks = []; // empty array that will hold all task(in the format id title and done) objects and something important that i didnt put const since i will replace it with new one at each change