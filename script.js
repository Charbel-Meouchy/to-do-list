/* Here unlike html and css i will comment nearlu everyline since its the first time i use js i am learning it */
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
let editingId = null;

function taskToListItem(task) {                        
  const li = document.createElement('li');             // creating a new link that isnt on the page yet
  li.classList.add('task');                            // giving it class to use it in css
  li.dataset.id = task.id;                             // i saved the task id on it as data-id
  if (task.done) {                                     
    li.classList.add('done');                          // if the task is completed add a class done (this what is remmended strikethrough in the donne of the assignment)
  }                                                    // so just a normal if command like python or any language

  const isEditing = task.id === editingId;

  if (isEditing) {
    const editInput = document.createElement('input');
    editInput.classList.add('edit-input');
    editInput.value = task.title;
    editInput.setAttribute('aria-label', 'Edit task');
    li.append(editInput);
  } else {
    const title = document.createElement('span');        // creating a span for the text like i created the <li>
    title.classList.add('task-title');                   // gave it a class li normal
    title.textContent = task.title;                      // here i am putting the task text inside it
    li.append(title);                                    // putting the text inside the <li> append just like for lists in c++
  }

  const toggleBtn = document.createElement('button');  // creating button same way i did for the li and span
  toggleBtn.classList.add('toggle');                   // also gave it a class
  toggleBtn.textContent = task.done ? 'Undo' : 'Done'; // setting the label to "Undo" if done,and else "Done" (thats what the ? syntaxe means)
                                                       // so this button will be the do/undo button

  const editBtn = document.createElement('button');
  editBtn.classList.add(isEditing ? 'save' : 'edit');
  editBtn.textContent = isEditing ? 'Save' : 'Edit';

  const deleteBtn = document.createElement('button');  // now creating the delete button
  deleteBtn.classList.add('delete');                   // gave it a class
  deleteBtn.textContent = 'Delete';                    // and here setting the label to Delete since its the delete button

  li.append(toggleBtn);                                
  li.append(editBtn);
  li.append(deleteBtn);                                // puting the Delete and Done button inside the <li>
  return li;                                           // gives the finished <li> back
}                                                      // and thas closing tag puts an end to taskToListItem

function updateCounter() {                              // this updates the -of- done text
  const doneCount = tasks.reduce(                       // this walk through the task to keep count
    (count, t) => t.done ? count + 1 : count,           // so  if the task is done we add 1 to the number of done tasks
    0                                                   // ofcourse the count will start at 0
  );                                                    
  counter.textContent = `${doneCount} of ${tasks.length} done`; // this is the format that write x of y done (exemple x and y are numbers)
}                                                       

function renderTasks() {                              
  list.innerHTML = '';                                 // emptiying the <ul> so nothing duplicate by accident
  tasks                                                // start from the tasks array
    .map(taskToListItem)                               // turns each task into an <li>
    .forEach(li => list.append(li));                   // adds each <li> to the <ul>
  emptyState.textContent = tasks.length === 0          // checks if there are zero tasks to show the message i mentioned before that is underneath this line
    ? 'No tasks yet , add your first one above.'       
    : '';   
    updateCounter();                                 // i added this at the end of the code which will refresh the timer                                           // and if not empty show nothing since there will be tasks
}                                                      

function addTask(title) {                               // adds a new task with the typed text like added a gym one it shows with the text gym
  const newTask = {                                     // creating the new task object
    id: `${Date.now()}`,                                // give id from the current time as a string
    title: title,                                       // here is the text the user typed
    done: false,                                        // here the goal is for tasks to start uncompleted wich will change the label of button above also
  };                                                    
  updateTasks([...tasks, newTask]);                     // here we are making a new array that has old and new tasks so for adding a task
}                                                       

function clearFeedback() {                              
  feedback.textContent = '';                            // this clear the error message so the goal of the func is to remove the error states
  input.classList.remove('invalid');                    // the will remove the red border set in css in case of errors
}                                                     

function handleSubmit(e) {                              // this function will run after the form is submitted
  e.preventDefault();                                   // this prevent the page form reloading again
  const title = input.value.trim();                     // what this does is that it will get the typed text without spaces
  if (!title) {                                         
    feedback.textContent = 'Please type a task first.'; // here if the text is empty it will show the error message
    input.classList.add('invalid');                     // incase of invalid input this will ad the red border
    return;                                             // end it here with an empty return since nothing should be added
  }                                                     
  clearFeedback();                                      // removes the old errors that were there
  addTask(title);                                       // adds the task
  input.value = '';                                     // clears the text box from the text
}                                                       

form.addEventListener('submit', handleSubmit);          // this will run handleSubmit when clicking Add or Enter(as requested in assignment)
input.addEventListener('input', clearFeedback);         // clears the error as soon as the person type

function toggleTask(id) {                               // changes the task from done to undone
  updateTasks(tasks.map(t =>                            // this will build a new array from every task
    t.id === id                                         // this checks if it has been clicked yet or not
      ? { ...t, done: !t.done }                         // if yes copy it with the done switched
      : t                                               // if no keep it as it is
  ));                                                   
}                                                       

function deleteTask(id) {                               
  updateTasks(tasks.filter(t => t.id !== id));          // this will keep everytask except the one the person clicked since it a delete function
}                                                       

function startEdit(id) {
  clearFeedback();
  editingId = id;
  renderTasks();
}

function cancelEdit() {
  clearFeedback();
  editingId = null;
  renderTasks();
}

function saveEdit(li) {
  const newTitle = li.querySelector('.edit-input').value.trim();
  if (!newTitle) {
    feedback.textContent = 'Task text cannot be empty.';
    return;
  }
  clearFeedback();
  updateTasks(tasks.map(t =>
    t.id === li.dataset.id
      ? { ...t, title: newTitle }
      : t
  ));
}

function handleListClick(e) {                           // this func will run on any click inside the unoardered list
  const li = e.target.closest('li');                    // find the <li> that was clicked 
  if (!li) return;                                      // if the person clicked on an empty space do nothing (empty return like before)
  if (e.target.closest('.delete')) {                    // if the delete button was clicked delete the task that has that id
    deleteTask(li.dataset.id);                          
    return;                                             // like before an empty return to stop
  }                                                     
  if (e.target.closest('.edit')) {
    startEdit(li.dataset.id);
    return;
  }
  if (e.target.closest('.save')) {
    saveEdit(li);
    return;
  }
  if (e.target.closest('.toggle')) {                    // here if the done or undo button was clicked it will flip the task with that id
    toggleTask(li.dataset.id);                          
  }                                                     
}                                                       // every closing tag ends its function same for all other funcs

list.addEventListener('click', handleListClick);        // this is one listener for all task buttons

function handleListKeydown(e) {
  if (!e.target.closest('.edit-input')) return;
  const li = e.target.closest('li');
  if (e.key === 'Enter') {
    saveEdit(li);
  }
  if (e.key === 'Escape') {
    cancelEdit();
  }
}

list.addEventListener('keydown', handleListKeydown);

const STORAGE_KEY = 'tasks';                            // that is the name the data is saved under

function saveTasks() {                                  // that saves the tasks to the browser
  const json = JSON.stringify(tasks);                   // transform the array we filled into text
  localStorage.setItem(STORAGE_KEY, json);              // and now stores the text under (tasks)
}                                                       

function loadTasks() {                                  // the goal of this function will be to read saved tasks back
  const raw = localStorage.getItem(STORAGE_KEY);        // gets the saved text and null if there is none
  try {                                                 
    return JSON.parse(raw) || [];                       // transform the text into and array or if there is nothing to []
  } catch (err) {                                       
    console.warn('Bad saved data, starting fresh', err); //if the saved text is broken it will log the problem in the console
    return [];                                          // and it will start with an empty list instead of crashing
  }                                                     
}                                                       

function updateTasks(nextTasks) {                       // every change to the list goes through this function
  tasks = nextTasks;                                    // here we are replacing th old array with a new one
  editingId = null;
  saveTasks();                                          // it is saved to localstorage handled above
  renderTasks();                                        // redraws the page
}                                                       

tasks = loadTasks();                                    // here it loads saved tasks first
renderTasks();                                          // and that draws the list when the page opens