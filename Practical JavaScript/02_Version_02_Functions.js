// V2: Functions
var todos = ["item 1, item 2, item 3"]

// function to display todos
function displayTodos() {
  console.log("My todos:", todos);
}

// function to add todos
function addTodo(item) {
  todos.push(item);
  displayTodos();
}
// function to change todos

function changeTodo(index, updatedItem) {
  todos[index] = updatedItem;
  displayTodos();
}

// function to delete todos
function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos();
}