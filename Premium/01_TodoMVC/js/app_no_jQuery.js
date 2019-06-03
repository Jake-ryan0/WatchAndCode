'use strict';

Handlebars.registerHelper('eq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var util = {
  uuid: function() {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  },
  pluralize: function(count, word) {
    return count === 1 ? word : word + 's';
  },
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    }
  }
};

var App = {
  init: function() {
    this.todos = util.store('todos-jquery');
    var todoTemplate = document.getElementById('todo-template');
    this.todoTemplate = Handlebars.compile(todoTemplate.innerHTML);
    
    var footerTemplate = document.getElementById('footer-template');
    this.footerTemplate = Handlebars.compile(footerTemplate.innerHTML);
    this.initializeAllEventListeners();

    new Router({
      '/:filter': function(filter) {
        this.filter = filter;
        this.render();
      }.bind(this)
    }).init('/all');
  },

  
  
  initializeAllEventListeners: function() {
    eventListeners.createTodoEventListener();
    eventListeners.toggleAllEventListener();
    eventListeners.footerDestroyCompletedEventListener();  
    eventListeners.todoListEventListener();  
  },
  
  render: function() {
    var todos = this.getFilteredTodos();
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = this.todoTemplate(todos);
    
    var main = document.querySelector('#main');
    if (todos.length > 0) main.style.display = 'block'; 
    else main.style.display = 'none'; 
    
    var toggleAllButton = document.getElementById('toggle-all');
    toggleAllButton.checked = (this.getActiveTodos().length === 0);
    
    this.renderFooter();
    
    var newTodoInput = document.querySelector('#new-todo');
    newTodoInput.focus();
    util.store('todos-jquery', this.todos);
  },
  
  
  renderFooter: function() {
    var todoCount = this.todos.length;
    var activeTodoCount = this.getActiveTodos().length;
    var template = this.footerTemplate({
      activeTodoCount: activeTodoCount,
      activeTodoWord: util.pluralize(activeTodoCount, 'item'),
      completedTodos: todoCount - activeTodoCount,
      filter: this.filter
    });
    
    var footer = document.querySelector('#footer');
    if (todoCount > 0) footer.style.display = 'block'; 
    else footer.style.display = 'none'; 
    footer.innerHTML = template; 
  },

  toggleAll: function(e) {
    var toggleAllButtonElement = e.target;
    var isChecked = toggleAllButtonElement.checked;

    this.todos.forEach(function(todo) {
      todo.completed = isChecked;
    });

    this.render();
  },
  getActiveTodos: function() {
    return this.todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  getCompletedTodos: function() {
    return this.todos.filter(function(todo) {
      return todo.completed;
    });
  },
  getFilteredTodos: function() {
    if (this.filter === 'active') {
      return this.getActiveTodos();
    }

    if (this.filter === 'completed') {
      return this.getCompletedTodos();
    }

    return this.todos;
  },
  destroyCompleted: function() {
    this.todos = this.getActiveTodos();
    this.filter = 'all';
    this.render();
  },

  // accepts an element from inside the `.item` div and
  // returns the corresponding index in the `todos` array
  indexFromEl: function(el) {
    var id = el.closest('li').getAttribute('data-id');
    var todos = this.todos;
    var i = todos.length;

    while (i--) {
      if (todos[i].id === id) {
        return i;
      }
    }
  },
  create: function(e) {
    var input = (e.target);
    var val = input.value.trim();

    if (e.which !== ENTER_KEY || !val) {
      return;
    }

    this.todos.push({
      id: util.uuid(),
      title: val,
      completed: false
    });

    input.value = '';

    this.render();
  },
  
  toggle: function(e) {
    var i = this.indexFromEl(e.target);
    this.todos[i].completed = !this.todos[i].completed;
    this.render();
  },
  
  edit: function(e) {
    var liElement = (e.target).closest('li');
    liElement.classList.add('editing');
    var input = liElement.querySelector('.edit');
    input.focus();
  },
  
  editKeyup: function(e) {
    if (e.which === ENTER_KEY) {
      e.target.blur();
    }

    if (e.which === ESCAPE_KEY) {
      var targetElement = e.target;
      targetElement.setAttribute('data-abort', true);
      targetElement.blur();
    }
  },
  
  update: function(e) {
    var el = e.target;
    var val = el.value.trim();

    if (!val) {
      this.destroy(e);
      return;
    }

    if (el.getAttribute("data-abort")) {
      el.setAttributedata('data-abort', false);
    } else {
      this.todos[this.indexFromEl(el)].title = val;
    }

    this.render();
  },

  destroy: function(e) {
    this.todos.splice(this.indexFromEl(e.target), 1);
    this.render();
  }
};


var eventListeners = {
  createTodoEventListener: function() {
    var newTodoInputElement = document.querySelector('#new-todo');
    newTodoInputElement.addEventListener('keyup', App.create.bind(App));
  },

  toggleAllEventListener: function() {
    var toggleAllButton = document.querySelector('#toggle-all');
    toggleAllButton.addEventListener('change', App.toggleAll.bind(App));
  },

  footerDestroyCompletedEventListener: function() {
    var footer = document.querySelector('#footer');

    footer.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.id === 'clear-completed') App.destroyCompleted.call(App);
    });
  },


  todoListEventListener: function() {
    var ulTodoList = document.querySelector('#todo-list');

    ulTodoList.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'destroy') App.destroy.call(App, event);
    });

    
    ulTodoList.addEventListener('change', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'toggle') App.toggle.call(App, event);
    });
    
    ulTodoList.addEventListener('dblclick', function(event) {
      var elementClicked = event.target;
      if (elementClicked.tagName === 'LABEL') App.edit.call(App, event);
    });
    
    ulTodoList.addEventListener('keyup', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'edit') App.editKeyup.call(App, event);
    });
    
     ulTodoList.addEventListener('focusout', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'edit') App.update.call(App, event);
    }); 
  }
}


App.init();
