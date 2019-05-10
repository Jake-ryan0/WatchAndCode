// store todos in an object
var todoList = {
  todos: ["item 1", "item 2", "item3"],
  
  // displayTodos method
  displayTodos: function() {
    console.log("These are my todos:", this.todos);
  },

  // addTodos method
  addTodo: function(item) {
    this.todos.push(item);
    this.displayTodos(); 
  },

  // changeTodos method
  changeTodo: function(index, updatedItem) {
    this.todos[index] = updatedItem; 
    this.displayTodos(); 
  }, 
  
  // deleteTodos method
  deleteTodo: function(index) {
    this.todos.splice(index, 1);
    this.displayTodos();
  }

};





