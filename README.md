# To-Do List App

My Assignment 3 for Web Development. It's a to-do list made with only HTML, CSS and plain JavaScript, no frameworks or libraries.

This was my first time writing JavaScript so I commented almost every line in script.js to explain what it does while I was learning.

## How to run

Just open index.html in the browser, no server needed. I kept all the JS in one file on purpose because modules don't work when you open the file directly.

## What it does

- You can add a task with the Add button or by pressing Enter
- The Done button marks a task as finished (it gets crossed out) and it turns into Undo so you can switch it back
- The Edit button lets you change the text of a task, you save with Save or Enter and cancel with Escape
- The Delete button removes the task
- If you try to add an empty task or just spaces it won't add it and shows a red message
- There's a counter at the top that shows how many tasks are done
- When the list is empty it says "No tasks yet"
- Everything is saved in localStorage so the tasks are still there after refreshing

## How I followed the assignment

The list in the HTML is empty, all the tasks are made by JavaScript from the tasks array in renderTasks, nothing is hardcoded.

I used a form so the Add button and the Enter key both work, and e.preventDefault() stops the page from reloading so everything updates without a refresh.

The code is split into named functions like addTask, renderTasks, deleteTask, toggleTask, saveTasks and loadTasks. Every change goes through updateTasks which saves the tasks and redraws the list, so there's only one place that draws the page.

I used map to build the list and to toggle tasks, filter to delete, and reduce for the counter.

For localStorage I save the array with JSON.stringify and read it back with JSON.parse. I put the loading in a try/catch so if the saved data is broken the app just starts empty instead of crashing.

For the edge cases, empty and space only tasks get rejected when adding and when editing, the list gets cleared before redrawing so nothing duplicates, and I used one click listener on the list instead of one on every button so it still works for new tasks. I also used textContent instead of innerHTML for the task text so whatever someone types can't mess with the page.

For the styling I put the colors and spacing in CSS variables, used flexbox for the layout, added hover effects with short transitions, and made it mobile first so it works on phone and desktop.

