// V9: Escape from console
// Ul, Li, dynamically adding li and text to the webpage

var todoList = {
  // todos array
  todos: [],

  // addTodos method
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },

  // changeTodo changes the text property of the object
  changeTodo: function (index, updatedText) {
    this.todos[index].todoText = updatedText;
  },

  // deleteTodos method
  deleteTodo: function (index) {
    this.todos.splice(index, 1);
  },

  // toggleCompleted toggles the the todo object's "completed" property
  toggleCompleted: function (index) {
    var todoObj = this.todos[index];
    todoObj.completed = !todoObj.completed;
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
  view.displayTodos();
  }
};



var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ""; 
    view.displayTodos();
  },

  changeTodo: function() {
    var indexObj = document.getElementById("changeTodoIndexInput");
    var textObj = document.getElementById("changeTodoTextInput"); 

    todoList.changeTodo(indexObj.valueAsNumber, textObj.value);
    
    indexObj.value = "";
    textObj.value = "";
    view.displayTodos();
  }, 

  deleteTodo: function() {
    var indexObj = document.getElementById("deleteTodoIndexInput"); 

    todoList.deleteTodo(indexObj.valueAsNumber); 
    indexObj.value = "";
    view.displayTodos();
  }, 

  toggleCompleted: function() {
    var indexObj = document.getElementById("toggleCompletedIndexInput"); 

    todoList.toggleCompleted(indexObj.valueAsNumber); 
    indexObj.value = ""; 
    view.displayTodos();
  },

  toggleAll: function() {
    todoList.toggleAll(); 
    view.displayTodos();
  }

};

// when introducing a new feature, make it work without modifying old code
// think of the functionality that this method in the new version is supposed to introduce / replace
// replaces todoList.displayTodos();
// when it is activated it should display all the todos in the array. 
// it is activated when youu click the button which calls the methods on the handler object.
var view = {
  displayTodos: function() {
    var todosUlElement = document.querySelector("ul");
    todosUlElement.innerHTML = "";
    for (var i = 0; i < todoList.todos.length; i++) {
      var newLiElement = document.createElement("li"); 
      var todoTextWithCompletetion = ""; 
      var currentTodo = todoList.todos[i];  
      
      if (currentTodo.completed) {
        todoTextWithCompletetion = "(x) " + currentTodo.todoText; 
      } else {
        todoTextWithCompletetion = "( ) " + currentTodo.todoText; 
      }
      
      newLiElement.id = i; 
      newLiElement.textContent = todoTextWithCompletetion;
      newLiElement.appendChild(this.createDeleteButton());
      todosUlElement.appendChild(newLiElement); 
    }
  },
};

