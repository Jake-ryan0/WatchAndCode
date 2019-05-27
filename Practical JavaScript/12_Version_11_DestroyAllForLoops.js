// V10 Destroy all for loops

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

  toggleAll: function () {
    var allTasksCompleted;
    var numCompleted = 0;


    this.todos.forEach(function(item) {
      if (item.completed) {
        numCompleted++;
      }
    });

    // checking if all completed
    if (numCompleted === this.todos.length) allTasksCompleted = true;
    else allTasksCompleted = false;

    // if all completed, set all to uncompleted
    // else set all to completed
    this.todos.forEach(function(item) {
      if (allTasksCompleted) {
        item.completed = false;  
      } else {
        item.completed = true; 
      }
    });
    view.displayTodos();
  }
};



var handlers = {
  addTodo: function () {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },

  changeTodo: function () {
    var indexObj = document.getElementById("changeTodoIndexInput");
    var textObj = document.getElementById("changeTodoTextInput");

    todoList.changeTodo(indexObj.valueAsNumber, textObj.value);

    indexObj.value = "";
    textObj.value = "";
    view.displayTodos();
  },

  deleteTodo: function (index) {
    todoList.deleteTodo(index);
    view.displayTodos();
  },

  toggleCompleted: function () {
    var indexObj = document.getElementById("toggleCompletedIndexInput");

    todoList.toggleCompleted(indexObj.valueAsNumber);
    indexObj.value = "";
    view.displayTodos();
  },

  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }

};

// whenever a new li element is added to the DOM, add a delete button beside the text and inside the li as well
// think about having a eventListener on items you need to be clicakable.
var view = {
  displayTodos: function () {
    var todosUlElement = document.querySelector("ul");
    todosUlElement.innerHTML = "";
    
    todoList.todos.forEach(this.printOne);

    todoList.todos.forEach(function(currentTodo, i) {
      var newLiElement = document.createElement("li");
      var todoTextWithCompletion = "";
    
      if (currentTodo.completed) {
        todoTextWithCompletion = "(x) " + currentTodo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + currentTodo.todoText;
      }

      // set every id of new li to be equal to the index of the item
      newLiElement.id = i;
      newLiElement.textContent = todoTextWithCompletion;
      // create a delete button in the li
      newLiElement.appendChild(this.createDeleteButton());
      todosUlElement.appendChild(newLiElement);
    }, view);
  },

  printOne: function() {
    console.log("1"); 
  }, 

  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    return deleteButton;
  },

  setUpEventListeners: function () {
    // use the entire ul as clickable, then only process clicks to the delete buttons
    // use button.parentNode.id (li.id)
    var todosUlElement = document.querySelector("ul");

    todosUlElement.addEventListener("click", function (event) {
      var elementClicked = event.target;
      // process only if the element clicked is a delete button.
      if (elementClicked.className === "delete-button") {
        var index = (elementClicked.parentNode.id);
        handlers.deleteTodo(index);
      }
    });
  }
};

view.setUpEventListeners();

