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

function taskToListItem(task) {                        
  const li = document.createElement('li');             // creating a new link that isnt on the page yet
  li.classList.add('task');                            // giving it class to use it in css
  li.dataset.id = task.id;                             // i saved the task id on it as data-id
  if (task.done) {                                     
    li.classList.add('done');                          // if the task is completed add a class done (this what is remmended strikethrough in the donne of the assignment)
  }                                                    // so just a normal if command like python or any language

  const title = document.createElement('span');        // creating a span for the text like i created the <li>
  title.classList.add('task-title');                   // gave it a class li normal
  title.textContent = task.title;                      // here i am putting the task text inside it

  const toggleBtn = document.createElement('button');  // creating button same way i did for the li and span
  toggleBtn.classList.add('toggle');                   // also gave it a class
  toggleBtn.textContent = task.done ? 'Undo' : 'Done'; // setting the label to "Undo" if done,and else "Done" (thats what the ? syntaxe means)
                                                       // so this button will be the do/undo button

  const deleteBtn = document.createElement('button');  // now creating the delete button
  deleteBtn.classList.add('delete');                   // gave it a class
  deleteBtn.textContent = 'Delete';                    // and here setting the label to Delete since its the delete button

  li.append(title);                                    // putting the text inside the <li> append just like for lists in c++
  li.append(toggleBtn);                                
  li.append(deleteBtn);                                // puting the Delete and Done button inside the <li>
  return li;                                           // gives the finished <li> back
}                                                      // and thas closing tag puts an end to taskToListItem

function renderTasks() {                              
  list.innerHTML = '';                                 // emptiying the <ul> so nothing duplicate by accident
  tasks                                                // start from the tasks array
    .map(taskToListItem)                               // turns each task into an <li>
    .forEach(li => list.append(li));                   // adds each <li> to the <ul>
  emptyState.textContent = tasks.length === 0          // checks if there are zero tasks to show the message i mentioned before that is underneath this line
    ? 'No tasks yet — add your first one above.'       
    : '';                                              // and if not empty show nothing since there will be tasks
}                                                      

renderTasks();                                         // and finally this draws the list when the page open