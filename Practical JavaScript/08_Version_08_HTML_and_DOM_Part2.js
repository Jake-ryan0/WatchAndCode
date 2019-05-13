// V7: HTML and DOM Part 2

var todoList = {
  // todos array
  todos: [],

  // displayTodos method
  displayTodos: function () {
    if (this.todos.length === 0) {
      console.log("Todo list is empty!")
    } else {
      console.log("These are my todos:");
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed) console.log("(x)", this.todos[i].todoText);
        else console.log("( )", this.todos[i].todoText);
      }
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
    var todoObj = this.todos[index];
    todoObj.completed = !todoObj.completed;
    this.displayTodos();
  },

  toggleAll: function() {
    var allTasksCompleted; 
    var numCompleted = 0; 

    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed) {
          numCompleted++; 
      }
    }

    // checking if all completed
    if (numCompleted === this.todos.length) allTasksCompleted = true; 
    else allTasksCompleted = false; 

    // if all completed, set all to uncompleted
    // else set all to completed
    if (allTasksCompleted) {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = true;
      }
    }
    
    this.displayTodos();
  }
};

var displayTodosButton = document.getElementById("displayTodosButton"); 
var toggleAllButton = document.getElementById("toggleAllButton");

displayTodosButton.addEventListener("click", function() {
  todoList.displayTodos();
});

toggleAllButton.addEventListener("click", function() {
  todoList.toggleAll(); 
});