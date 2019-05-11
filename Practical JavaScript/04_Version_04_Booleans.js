// V4: addTodo should add todo object

var todoList = {

  // todos array
  todos: [],

  // displayTodos method
  displayTodos: function () {
    console.log("These are my todos:");
    for (var i = 0; i < todos.length; i++) {
      console.log(todos[i].todoText);
    }
  },

  // addTodos method
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },

  // changeTodo changes the text property of the object
  changeTodo: function (index, updatedText) {
    this.todos[index].todoText = updatedText;
    this.displayTodos();
  },

  // deleteTodos method
  deleteTodo: function (index) {
    this.todos.splice(index, 1);
    this.displayTodos();
  },

  // toggleCompleted toggles the the todo object's "completed" property
  toggleCompleted: function (index) {
    var todoObj = todos[index];
    todoObj.completed = !todoObj.completed;
    this.displayTodos();
  }
}


